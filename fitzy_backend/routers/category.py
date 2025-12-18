from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from fitzy_backend.models.category import Category  
from fitzy_backend.schemas.category import CategoryCreate
from fitzy_backend.dependencies import get_db

router = APIRouter(
    prefix="/category",
    tags=["category"]
)
@router.get("/category")
def get_all(db:Session=Depends(get_db)):
    val = db.query(Category).all()  #select * from diet
    return val


@router.get("/category/{id}")
def get_diet_by_id(id : int,db:Session=Depends(get_db)):
    val = db.query(Category).get(id)
    return val               


@router.post("/category/post")
def create_diet(data:CategoryCreate,db:Session=Depends(get_db)):
    new_category = Category(
            category_id = data.category_id,
            category= data.category,
            bmi_start = data.bmi_start,
            bmi_end = data.bmi_end,
    )
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category 

 





