from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.schemas.label_schema import LabelResponse


class NoteCreate(BaseModel):
    title: Optional[str] = ""
    description: Optional[str] = ""
    color: Optional[str] = "#ffffff"
    isArchived: Optional[bool] = False
    isTrashed: Optional[bool] = False
    user_id: Optional[int] = None   # ✅ FIXED


class NoteUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    color: Optional[str] = None
    isArchived: Optional[bool] = None
    isTrashed: Optional[bool] = None
    user_id: Optional[int] = None   # ✅ FIXED


class NoteResponse(BaseModel):
    id: int
    title: Optional[str] = ""
    description: Optional[str] = ""
    color: Optional[str] = "#ffffff"
    isArchived: Optional[bool] = False
    isTrashed: Optional[bool] = False
    user_id: Optional[int] = None   # ✅ FIXED
    created_at: datetime
    updated_at: datetime
    labels: List[LabelResponse] = []

    class Config:
        from_attributes = True