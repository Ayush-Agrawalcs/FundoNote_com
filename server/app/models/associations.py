from sqlalchemy import Table,Column,Integer,ForeignKey
from app.database import Base

class NoteLabelAssociation:
    note_label=Table(
        'note_label',
        Base.metadata,
        Column('note_id',Integer,ForeignKey('notes.id'),primary_key=True),
        Column('label_id',Integer,ForeignKey('labels.id'),primary_key=True)
    )

    