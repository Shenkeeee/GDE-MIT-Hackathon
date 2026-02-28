from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import items, users, dashboard , testalldataaiandmore

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path


### DEV ###

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
app.include_router(users.router)
app.include_router(dashboard.router)


# ### PROD ###

# app = FastAPI()

# # Include routes
# app.include_router(items.router)
# app.include_router(users.router)
# app.include_router(dashboard.router)

# # Absolute path (safer on Windows)
# BASE_DIR = Path(__file__).resolve().parent
# DIST_DIR = BASE_DIR.parent / "frontend" / "dist"

# app.mount("/", StaticFiles(directory=DIST_DIR, html=True), name="static")


# # Serve React app
# @app.get("/{full_path:path}")
# async def serve_react(full_path: str):
#     return FileResponse(DIST_DIR / "index.html")
