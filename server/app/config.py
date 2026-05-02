from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    def __init__(self):
        db_url = os.getenv("DATABASE_URL")

        if not db_url:
            raise ValueError("DATABASE_URL is not set")

        if db_url.startswith("postgres://"):
            db_url = db_url.replace("postgres://", "postgresql://")

        self.DATABASE_URL = db_url

config = Config()