from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base
import importlib.util
_spec = importlib.util.spec_from_file_location("app.config", "app/config.py")
_config = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_config)
config = _config.config

def singleton(cls):
    instance={}

    def wrapper(*args,**kwargs):
        if cls not in instance:
            instance[cls]=cls(*args,**kwargs)
            return instance[cls]

    return wrapper

@singleton
class Database:
    def __init__(self):
        self.engine = create_engine(
            config.DATABASE_URL,
            echo=True,
            pool_pre_ping=True
        )
        self.SessionLocal = sessionmaker(bind=self.engine)
        self.Base = declarative_base()

    def get_db(self):
        db=self.SessionLocal()
        try:
            yield db
        finally:
            db.close()


    def get_session(self):
        return self.SessionLocal

    def get_engine(self):
        return self.engine

    def get_base(self):
        return self.Base    

db_instance=Database()
Base=db_instance.get_base()
Session=db_instance.get_session()
Engine=db_instance.get_engine()
get_db=db_instance.get_db()