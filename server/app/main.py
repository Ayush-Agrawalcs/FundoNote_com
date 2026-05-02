from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import db_instance
from app.routes.note_routes import router as note_router
from app.models import note,label,associations,user
from app.routes.label_routes import router as label_router
from app.routes.auth_routes import router as auth_router
from app.routes.user_routes import router as user_router

## Table Creation
db_instance.get_base().metadata.create_all(bind=db_instance.get_engine())

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Hello':'World'}

app.include_router(note_router)
app.include_router(label_router)
app.include_router(auth_router)
app.include_router(user_router)