from fastapi import APIRouter, Depends, status
from typing import List, Optional
from sqlalchemy.orm import Session
from app.database import db_instance
from app.schemas.note_schema import NoteCreate, NoteUpdate, NoteResponse
from app.services.note_service import NoteService

router = APIRouter(prefix='/notes', tags=['Notes'])
note_service = NoteService()


# ✅ Create Note
@router.post('/', response_model=NoteResponse, status_code=status.HTTP_201_CREATED)
def create_note(note_data: NoteCreate, db: Session = Depends(db_instance.get_db)):
    return note_service.create_note(note_data, db)


# ✅ Get All Notes (FIXED 🔥)
@router.get('/', response_model=List[NoteResponse])
def get_all_notes(
    isArchived: Optional[bool] = None,
    isTrashed: Optional[bool] = None,
    user_id: Optional[int] = None,
    db: Session = Depends(db_instance.get_db)
):
    return note_service.get_all_notes(db, isArchived, isTrashed, user_id)


# ✅ Get Note By ID
@router.get('/{note_id}', response_model=NoteResponse)
def get_note_by_id(note_id: int, db: Session = Depends(db_instance.get_db)):
    return note_service.get_note_by_id(note_id, db)


# ✅ Update Note
@router.put('/{note_id}', response_model=NoteResponse)
@router.patch('/{note_id}', response_model=NoteResponse)
def update_note(note_id: int, note_data: NoteUpdate, db: Session = Depends(db_instance.get_db)):
    return note_service.update_note(note_id, note_data, db)


# ✅ Delete Note
@router.delete('/{note_id}')
def delete_note(note_id: int, db: Session = Depends(db_instance.get_db)):
    return note_service.delete_note(note_id, db)


# ✅ Add Label to Note (FIXED 🔥 typo)
@router.post('/{note_id}/labels/{label_id}')
def add_label(note_id: int, label_id: int, db: Session = Depends(db_instance.get_db)):
    return note_service.add_label_to_note(note_id, label_id, db)


# ✅ Remove Label from Note (FIXED 🔥 typo)
@router.delete('/{note_id}/labels/{label_id}')
def remove_label(note_id: int, label_id: int, db: Session = Depends(db_instance.get_db)):
    return note_service.remove_label_from_note(note_id, label_id, db)


# ✅ Get Note with Labels
@router.get('/{note_id}/labels')
def get_note_with_label(note_id: int, db: Session = Depends(db_instance.get_db)):
    return note_service.get_note_with_label(note_id, db)