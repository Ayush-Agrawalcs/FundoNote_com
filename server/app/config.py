from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    def __init__(self):
        self.DATABASE_URL = os.getenv("DATABASE_URL")

        # 🔥 Fix for Render
        if self.DATABASE_URL and self.DATABASE_URL.startswith("postgres://"):
            self.DATABASE_URL = self.DATABASE_URL.replace(
                "postgres://", "postgresql://"
            )

config = Config()