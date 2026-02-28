from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from dbCalls.usersCalls import UserSetter
from datetime import datetime
from dbCalls.usersCalls import ManageUser_Class
from dbCalls.fooddata import ManageFood_Class
from dbCalls.symptomps import ManageSymptom_Class
from AI.AI_test import *

# call it by prefix when fetching
router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.post("/{user_id}")
def get_first_name(user_id: int):
    name = ManageUser_Class.get_name_by_id(user_id)
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


class SympItem(BaseModel):
    severity: int = 1
    symptom: str | None = None
    allergen: str | None = None
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
    
@router.post("/addsymp/{user_id}")
def add_symp(user_id: int, symp: SympItem):
    try:
        item = ManageSyn.add_item(
            user_id=user_id,
            severity=symp.severity,
            symptom=symp.symptom,
            creation_date=symp.creation_date,
        )
        return {"status": "success", "item": item}
    except Exception as e:
        return  {"status": "error", "message": e}



@router.post("/ai_suggestion/{user_id}")
def add_symp(user_id: int):
    try:
        foods = ManageFood_Class.get_items(user_id)
        symptoms = ManageSymptom_Class.get_items(user_id)
        ai_res = analyze_correlation(foods, symptoms)
        return {"status": "success", "item": ai_res}
    except Exception as e:
        return  {"status": "error", "message": e}
