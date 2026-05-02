from app.models.note import Note
from app.utils.logger import logger_instance
from fastapi import HTTPException
from app.models.label import Label


class NoteService:

    # ✅ Create Note
    def create_note(self, note_data, db):
        try:
            new_note = Note(
                title=note_data.title,
                description=note_data.description,
                color=note_data.color,
                isArchived=note_data.isArchived,
                isTrashed=note_data.isTrashed,
                user_id=note_data.user_id   # 🔥 IMPORTANT
            )

            db.add(new_note)
            db.commit()
            db.refresh(new_note)

            logger_instance.info('Note created successfully')
            return new_note

        except Exception as e:
            db.rollback()
            logger_instance.error(f"Error creating note: {e}")
            raise HTTPException(status_code=500, detail=str(e))


    # ✅ Get All Notes (FIXED 🔥)
    def get_all_notes(self, db, isArchived=None, isTrashed=None, user_id=None):
        query = db.query(Note)

        if isArchived is not None:
            query = query.filter(Note.isArchived == isArchived)

        if isTrashed is not None:
            query = query.filter(Note.isTrashed == isTrashed)

        if user_id is not None:
            query = query.filter(Note.user_id == user_id)   # 🔥 MAIN FIX

        return query.all()


    # ✅ Get Note By ID
    def get_note_by_id(self, note_id, db):
        note = db.query(Note).filter(Note.id == note_id).first()

        if not note:
            raise HTTPException(status_code=404, detail="Note not found")

        return note


    # ✅ Update Note
    def update_note(self, note_id, note_data, db):
        note = self.get_note_by_id(note_id, db)

        if note_data.title is not None:
            note.title = note_data.title

        if note_data.description is not None:
            note.description = note_data.description

        if note_data.color is not None:
            note.color = note_data.color

        if note_data.isArchived is not None:
            note.isArchived = note_data.isArchived

        if note_data.isTrashed is not None:
            note.isTrashed = note_data.isTrashed

        if note_data.user_id is not None:
            note.user_id = note_data.user_id

        db.commit()
        db.refresh(note)

        logger_instance.info('Note updated successfully')
        return note


    # ✅ Delete Note
    def delete_note(self, note_id, db):
        note = self.get_note_by_id(note_id, db)

        db.delete(note)
        db.commit()

        logger_instance.info('Note deleted successfully')
        return {"message": "Note deleted successfully"}


    # ✅ Add Label
    def add_label_to_note(self, note_id, label_id, db):
        note = self.get_note_by_id(note_id, db)
        label = db.query(Label).filter(Label.id == label_id).first()

        if not label:
            raise HTTPException(status_code=404, detail="Label not found")

        note.labels.append(label)
        db.commit()
        db.refresh(note)

        logger_instance.info('Label added successfully')
        return note


    # ✅ Remove Label
    def remove_label_from_note(self, note_id, label_id, db):
        note = self.get_note_by_id(note_id, db)
        label = db.query(Label).filter(Label.id == label_id).first()

        if not label:
            raise HTTPException(status_code=404, detail="Label not found")

        note.labels.remove(label)
        db.commit()
        db.refresh(note)

        logger_instance.info('Label removed successfully')
        return note


    # ✅ Get Note with Labels
    def get_note_with_label(self, note_id, db):
        note = db.query(Note).filter(Note.id == note_id).first()

        if not note:
            raise HTTPException(status_code=404, detail="Note not found")

        return note