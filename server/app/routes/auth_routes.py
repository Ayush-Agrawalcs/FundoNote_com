from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import db_instance
from app.schemas.user_schema import UserCreate, UserLogin, UserResponse
from app.services.auth_service import AuthService
from typing import List

router = APIRouter(prefix='/auth', tags=['Auth'])
auth_service = AuthService()

@router.post('/signup', response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(user_data: UserCreate, db: Session = Depends(db_instance.get_db)):
    return auth_service.create_user(user_data, db)

@router.post('/login', response_model=UserResponse)
def login(user_data: UserLogin, db: Session = Depends(db_instance.get_db)):
    return auth_service.authenticate_user(user_data, db)
