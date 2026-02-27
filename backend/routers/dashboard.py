from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from dbCalls.usersCalls import UserSetter
from dbCalls.usersCalls import UserCretor_Class
from dbCalls.fooddata import ManageFood_Class

# call it by prefix when fetching
router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.post("/{user_id}")
def get_first_name(user_id: int):
    name = UserCretor_Class.get_name_by_id(user_id)
    return {"status": "success", "name": name}


@router.post("/login/{user_id}")
def get_food_items(user_id: int):
    items = ManageFood_Class.list_items_userid(user_id)
    return items