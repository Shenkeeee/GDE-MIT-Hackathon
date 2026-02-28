from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from dbCalls.usersCalls import UserSetter
from datetime import datetime
from dbCalls.usersCalls import UserCretor_Class
from dbCalls.fooddata import ManageFood_Class

# call it by prefix when fetching
router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.post("/{user_id}")
def get_first_name(user_id: int):
    name = UserCretor_Class.get_name_by_id(user_id)
    return {"status": "success", "name": name}


@router.post("/fooddata/{user_id}")
def get_food_items(user_id: int):
    items = ManageFood_Class.get_items(user_id)
    return items


# Pydantic model for incoming food data
class FoodItem(BaseModel):
    food_name: str
    ingredients: str | None = None
    allergen: str | None = None
    quantity: int = 1
    creation_date: datetime


# POST endpoint to add food for a user
@router.post("/addfood/{user_id}")
def add_food(user_id: int, food: FoodItem):
    try:
        item = ManageFood_Class.add_item(
            user_id=user_id,
            food_name=food.food_name,
            ingredients="",
            allergen="",
            quantity=food.quantity,
            creation_date=food.creation_date,
        )
        return {"status": "success", "item": item}
    except Exception as e:
        return  {"status": "error", "message": e}
