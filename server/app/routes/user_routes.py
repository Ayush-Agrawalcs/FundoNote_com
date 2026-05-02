from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import db_instance
from app.models.user import User
from app.schemas.user_schema import UserResponse

router = APIRouter(prefix='/users', tags=['Users'])

@router.get('/{user_id}', response_model=UserResponse)
def get_user_by_id(user_id: int, db: Session = Depends(db_instance.get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
