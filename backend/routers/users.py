from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from dbCalls.usersCalls import UserSetter
from dbCalls.usersCalls import UserCreator

UserCretor_Class = UserCreator(userdb_path = "backend/dbCalls/users.db")

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
    result = UserCretor_Class.add_item_user(user.email, user.firstname, user.lastname, user.password)
    print(result)
    return {"added entry": f"{user.email}: {user.password}"}

class UserDataLogin(BaseModel):
    email: EmailStr
    password: str

@router.post("/login/{user_id}")
def handle_login(user: UserDataLogin):
    print(f"Email: {user.email}, Password: {user.password}")
    same = UserCretor_Class.get_logindata(user.email, user.password)
    print("SAME:", same)
    return {"login entry": f"{user.email}: {user.password}"}
