from fastapi import APIRouter,Depends,status
from typing import List
from sqlalchemy.orm import Session
from app.database import db_instance
from app.schemas.label_schema import LabelCreate,LabelUpdate,LabelResponse
from app.services.label_service import LabelServices

router=APIRouter(prefix='/labels',tags=['Labels'])
label_service=LabelServices()



@router.post('/',response_model=LabelResponse,status_code=status.HTTP_201_CREATED)
def create_label(label_data:LabelCreate,db:Session=Depends(db_instance.get_db)):
    return label_service.create_label(label_data,db)



@router.get('/',response_model=List[LabelResponse])
def get_all_labels(db:Session=Depends(db_instance.get_db)):
    return label_service.get_all_labels(db)




@router.put('/{label_id}',response_model=LabelResponse)
def update_label(label_id:int,label_data:LabelUpdate,db:Session=Depends(db_instance.get_db)):
    return label_service.update_label(label_id,label_data,db)

    

@router.delete('/{label_id}',response_model=LabelResponse)
def delete_label(label_id:int,db:Session=Depends(db_instance.get_db)):
    return label_service.delete_label(label_id,db)
