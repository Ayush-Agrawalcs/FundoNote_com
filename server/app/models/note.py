from sqlalchemy import Table,Column,Integer,String,Boolean,DateTime,ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from app.models.associations import NoteLabelAssociation
class Note(Base):
    __tablename__='notes'
    id=Column(Integer,primary_key=True,index=True)
    title=Column(String(255),nullable=True,default="")
    description=Column(String(1000),nullable=True,default="")
    color=Column(String(50), default="#ffffff")
    isArchived=Column(Boolean, default=False)
    isTrashed=Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    created_at=Column(DateTime,default=datetime.utcnow)
    updated_at=Column(DateTime,default=datetime.utcnow,onupdate=datetime.utcnow)
    labels=relationship(
        'Label',
        secondary=NoteLabelAssociation.note_label,
        back_populates='notes'
    )
