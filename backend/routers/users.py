from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from dbCalls.usersCalls import UserSetter
from dbCalls.usersCalls import UserCreator

UserCrator_Class = UserCreator(userdb_path = "backend/dbCalls/users.db")

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
    firstname: str
    lastname: str

# vagy...
# def post_item(user: dict = Body(...)):
@router.post("/register/{user_id}")
def post_item(user: UserData):
    print(f"Email: {user.email}, Password: {user.password}, FirstName: {user.firstname}, LastName: {user.lastname}")
    UserCrator_Class.add_item_user(user.email, user.firstname, user.lastname, user.password)
    return {"added entry": f"{user.email}: {user.password}"}
