from fastapi import APIRouter

# call it by prefix when fetching
router = APIRouter(prefix="/api/items", tags=["items"])


@router.get("/hello")
def hello():
    return {"message": "Hello World"}


@router.get("/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}


@router.get("/")
def read():
    return {"message": "Hello World"}


@router.post("/{item_id}")
def post_item():
    return {"message": "Hello World"}


@router.post("")
def post():
    return {"message": "Hello World"}


@router.put("/{item_id}")
def put_item():
    return {"message": "Hello World"}


@router.delete("/{item_id}")
def delete():
    return {"message": "Hello World"}


@router.delete("/")
def delete_items():
    return {"message": "Hello World"}
