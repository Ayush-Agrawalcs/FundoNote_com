from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    def __init__(self):
        load_dotenv()
        self.DATABASE_URL=os.getenv("DATABASE_URL")
        
config=Config()