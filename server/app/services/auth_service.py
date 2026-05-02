from app.models.user import User
from app.schemas.user_schema import UserCreate, UserLogin
from app.utils.logger import logger_instance
from fastapi import HTTPException
import bcrypt
import hashlib
import traceback


class AuthService:

    # 🔐 HASH PASSWORD
    def get_password_hash(self, password):
        sha256_pw = hashlib.sha256(password.encode('utf-8')).hexdigest().encode('utf-8')
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(sha256_pw, salt).decode('utf-8')

    # 🔐 VERIFY PASSWORD
    def verify_password(self, plain_password, hashed_password):
        sha256_pw = hashlib.sha256(plain_password.encode('utf-8')).hexdigest().encode('utf-8')
        return bcrypt.checkpw(sha256_pw, hashed_password.encode('utf-8'))

    # ✅ SIGNUP
    def create_user(self, user_data: UserCreate, db):
        try:
            # Check if email already exists
            existing_user = db.query(User).filter(User.email == user_data.email).first()
            if existing_user:
                raise HTTPException(status_code=400, detail="EMAIL_EXISTS")

            # Hash password
            hashed_pw = self.get_password_hash(user_data.password)

            # Create user
            new_user = User(
                firstName=user_data.firstName,
                lastName=user_data.lastName,
                email=user_data.email,
                password=hashed_pw,
                service=user_data.service
            )

            db.add(new_user)
            db.commit()
            db.refresh(new_user)

            logger_instance.info(f"User created with ID: {new_user.id}")
            return new_user

        except HTTPException as e:
            raise e
        except Exception as e:
            db.rollback()
            tb = traceback.format_exc()
            logger_instance.error(f"Error creating user: {str(e)}\n{tb}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

    # ✅ LOGIN
    def authenticate_user(self, user_data: UserLogin, db):
        user = db.query(User).filter(User.email == user_data.email).first()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid Credentials")

        if not self.verify_password(user_data.password, user.password):
            raise HTTPException(status_code=401, detail="Invalid Credentials")

        logger_instance.info(f"User authenticated: {user.id}")
        return user