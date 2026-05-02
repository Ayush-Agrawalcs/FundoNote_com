from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str
    service: Optional[str] = "advance"

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    firstName: str
    lastName: str
    email: str
    service: str

    class Config:
        from_attributes = True
