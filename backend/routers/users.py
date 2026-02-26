from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from dbCalls.usersCalls import UserSetter

UserSetter_Class = UserSetter()

# call it by prefix when fetching
router = APIRouter(prefix="/users", tags=["users"])


@router.get("/hello")
def hello():
    return {"message": "Hello World"}


@router.get("/{user_id}")
def read_item(user_id: int):
    return {"message": "Hello items"}


@router.get("/")
def read():
    items = UserSetter_Class.get()
    return items

class UserData(BaseModel):
    email: EmailStr
    password: str

# vagy...
# def post_item(user: dict = Body(...)):
@router.post("/register/{user_id}")
def post_item(user: UserData):
    print(f"Email: {user.email}, Password: {user.password}")
    return {"added entry": f"{user.email}: {user.password}"}
