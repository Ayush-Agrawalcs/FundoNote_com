from app.models.label import Label
from app.utils.logger import logger_instance
from fastapi import HTTPException

class LabelServices:

    def create_label(self,label_data,db):
        try:
            logger_instance.info('Creating new label')

            new_label=Label(name=label_data.name)
            db.add(new_label)
            db.commit()
            db.refresh(new_label)

            logger_instance.info(f'Label created with Id:{new_label.id}')
            return new_label

        except Exception as e:
            db.rollback()
            logger_instance.error(f'Error creating label: {str(e)}')
            raise HTTPException(status_code=500,detail=str(e))

    def get_all_labels(self,db):
        logger_instance.info('Fetching all labels')
        return db.query(Label).all()

    def update_label(self,label_id,label_data,db):
        logger_instance.info(f'Updating label ID:{label_id}')
        label=db.query(Label).filter(Label.id==label_id).first()

        if not label:
            logger_instance.warning(f'Label not found with ID:{label_id}')
            raise HTTPException(status_code=404,detail='Label not found ')

        label.name=label_data.name
        db.commit()
        db.refresh(label)

        logger_instance.info(f'Label updated with ID:{label.id}')
        return label


    def delete_label(self,label_id,db):
        logger_instance.info(f'Deleting label ID:{label_id}')
        label=db.query(Label).filter(Label.id==label_id).first()

        if not label:
            logger_instance.warning(f'Label not found with ID:{label_id}')
            raise HTTPException(status_code=404,detail='Label not found ')

        db.delete(label)
        db.commit()

        logger_instance.info(f'Label deleted with ID:{label.id}')
        return {'message':'Label deleted successfully'} 