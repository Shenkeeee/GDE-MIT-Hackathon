from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import items

app = FastAPI()

# CORS setup - allow client to request from port
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(items.router)
