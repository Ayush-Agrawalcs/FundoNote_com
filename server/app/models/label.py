from sqlalchemy import Column,Integer,String
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.associations import NoteLabelAssociation


class Label(Base):
    __tablename__='labels'

    id=Column(Integer,primary_key=True,index=True)
    name=Column(String(255),nullable=False,unique=True)

    notes=relationship(
        'Note',
        secondary=NoteLabelAssociation.note_label,
        back_populates='labels'
    )


    