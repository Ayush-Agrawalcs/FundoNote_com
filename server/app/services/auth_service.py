from app.models.user import User
from app.schemas.user_schema import UserCreate, UserLogin
from app.utils.logger import logger_instance
from fastapi import HTTPException
import bcrypt
import hashlib
import traceback

from datetime import datetime, timedelta
from fastapi_mail import FastMail, MessageSchema
from app.config.email_config import conf
from app.utils.otp import generate_otp


class AuthService:

    def get_password_hash(self, password):
        sha256_pw = hashlib.sha256(password.encode('utf-8')).hexdigest().encode('utf-8')
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(sha256_pw, salt).decode('utf-8')

    def verify_password(self, plain_password, hashed_password):
        sha256_pw = hashlib.sha256(plain_password.encode('utf-8')).hexdigest().encode('utf-8')
        return bcrypt.checkpw(sha256_pw, hashed_password.encode('utf-8'))

    # ✅ CREATE USER
    async def create_user(self, user_data: UserCreate, db):
        try:
            existing_user = db.query(User).filter(User.email == user_data.email).first()
            if existing_user:
                raise HTTPException(status_code=400, detail="EMAIL_EXISTS")

            hashed_pw = self.get_password_hash(user_data.password)

            new_user = User(
                firstName=user_data.firstName,
                lastName=user_data.lastName,
                email=user_data.email,
                password=hashed_pw,
                service=user_data.service,
                is_verified=False
            )

            db.add(new_user)
            db.commit()
            db.refresh(new_user)

            logger_instance.info(f"User created with ID: {new_user.id}")

            # 🔥 AUTO SEND OTP
            try:
                await self.send_otp(new_user.email, db)
            except Exception as e:
                logger_instance.error(f"OTP sending failed: {str(e)}")

            return new_user

        except HTTPException as e:
            raise e
        except Exception as e:
            db.rollback()
            tb = traceback.format_exc()
            logger_instance.error(f"Error creating user: {str(e)}\n{tb}")
            raise HTTPException(status_code=500, detail=str(e))

    # ✅ LOGIN
    def authenticate_user(self, user_data: UserLogin, db):
        user = db.query(User).filter(User.email == user_data.email).first()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid Credentials")

        if not self.verify_password(user_data.password, user.password):
            raise HTTPException(status_code=401, detail="Invalid Credentials")

        if not user.is_verified:
            raise HTTPException(status_code=400, detail="Please verify your email first")

        logger_instance.info(f"User authenticated: {user.id}")
        return user

    # ✅ SEND OTP
    async def send_otp(self, email, db):
        print("=== SEND OTP CALLED ===")
        print("EMAIL:", email)

        user = db.query(User).filter(User.email == email).first()

        if not user:
            print("USER NOT FOUND")
            raise HTTPException(status_code=404, detail="User not found")

        otp = generate_otp()
        print("OTP GENERATED:", otp)

        user.otp = otp
        user.otp_expiry = datetime.utcnow() + timedelta(minutes=5)
        db.commit()

        try:
            message = MessageSchema(
                subject="Fundoo Notes OTP",
                recipients=[email],
                body=f"Your OTP is {otp}",
                subtype="plain"
            )

            fm = FastMail(conf)

            print("SENDING EMAIL...")
            await fm.send_message(message)
            print("EMAIL SENT SUCCESSFULLY ✅")

        except Exception as e:
            print("EMAIL ERROR ❌:", str(e))

        return {"message": "OTP sent successfully"}

    # ✅ VERIFY OTP
    def verify_otp(self, email, otp, db):
        user = db.query(User).filter(User.email == email).first()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        if user.otp != otp:
            raise HTTPException(status_code=400, detail="Invalid OTP")

        if datetime.utcnow() > user.otp_expiry:
            raise HTTPException(status_code=400, detail="OTP expired")

        user.is_verified = True
        user.otp = None

        db.commit()

        return {"message": "Email verified successfully"}