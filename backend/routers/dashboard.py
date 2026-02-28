from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from dbCalls.usersCalls import UserSetter
from datetime import datetime
from dbCalls.usersCalls import ManageUser_Class
from dbCalls.fooddata import ManageFood_Class
from dbCalls.symptomps import ManageSymptom_Class
from AI.AI_test import *

from fastapi import Request

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


@router.post("/symptomData/{user_id}")
def get_symptoms_items(user_id: int):
    items = ManageSymptom_Class.get_items(user_id)
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
        return {"status": "error", "message": e}


@router.post("/addsymp/{user_id}")
def add_symp(user_id: int, symp: SympItem):
    try:
        item = ManageSymptom_Class.add_item(
            user_id=user_id,
            severity=symp.severity,
            symptom=symp.symptom,
            creation_date=symp.creation_date,
        )
        return {"status": "success", "item": item}
    except Exception as e:
        return {"status": "error", "message": e}


@router.post("/ai_suggestion/{user_id}")
def ai_res(user_id: int, request: Request):
    try:
        if request.session.get("ai_generated"):
            return {
                "status": "skipped",
                "message": "AI suggestion already generated in this session.",
            }

        foods = ManageFood_Class.get_items(user_id)
        symptoms = ManageSymptom_Class.get_items(user_id)
        # ai_result = analyze_correlation(foods, symptoms)
        ai_result = "No AI res"

        request.session["ai_generated"] = True

        return {"status": "success", "item": ai_result}

    except Exception as e:
        return {"status": "error", "message": str(e)}


from datetime import datetime, timedelta, timezone


@router.post("/correlation/{user_id}")
def correlation(user_id: int):
    try:
        foods = ManageFood_Class.get_items(user_id)
        symptoms = ManageSymptom_Class.get_items(user_id)

        correlation_points = []

        for food in foods:
            # Force UTC aware
            food_time = datetime.fromisoformat(food["creation_date"]).replace(
                tzinfo=timezone.utc
            )

            for sym in symptoms:
                sym_time = datetime.fromisoformat(sym["creation_date"]).replace(
                    tzinfo=timezone.utc
                )

                time_diff = sym_time - food_time

                if timedelta(0) <= time_diff <= timedelta(hours=6):
                    correlation_points.append(
                        {
                            "food": food["food_name"],
                            "quantity": food["quantity"],
                            "severity": sym["severity"],
                            "symptom": sym["symptom"],
                        }
                    )

        return {"status": "success", "data": correlation_points, "symptoms": symptoms, "foods": foods}

    except Exception as e:
        return {"status": "error", "message": str(e)}
