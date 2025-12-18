from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fitzy_backend.database.db import Base, engine
from fitzy_backend.models.category import Category
from fitzy_backend.models.dietmodel import DietVeg
from fitzy_backend.models.nonveg_model import DietNonVeg
from fitzy_backend.models.model import User
from fitzy_backend.models.exemodel import Exercise
from fitzy_backend.routers import user, diet, nonveg_diet, exercise,category


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     
    allow_credentials=True,
    allow_methods=["*"],      
    allow_headers=["*"],
)


# Include routers
app.include_router(user.router)
app.include_router(diet.router)
app.include_router(nonveg_diet.router)
app.include_router(exercise.router)
app.include_router(category.router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def get_homee():
    return {"msg": "Welcome to Fitzy Backend"}
