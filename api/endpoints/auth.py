from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict
import uuid
from datetime import datetime

router = APIRouter()

# In-memory storage (simulate database)
users_db: Dict[str, Dict] = {}
login_history: list[str] = []

class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    message: str
    email: str | None = None

@router.post("/register")
def register(data: RegisterRequest):
    if data.username in users_db:
        raise HTTPException(status_code=400, detail="Username already exists")

    users_db[data.username] = {
        "email": data.email,
        "password": data.password,
    }
    return {"message": "Registration successful"}

@router.post("/login", response_model=LoginResponse)
def login(data: LoginRequest):
    user = users_db.get(data.username)
    if not user or user['password'] != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    login_time = f"{data.username} logged in at {datetime.now()}"
    login_history.append(login_time)

    return LoginResponse(message="Login successful", email=user['email'])

@router.get("/history/{username}")
def get_history(username: str):
    filtered = [entry for entry in login_history if entry.startswith(username)]
    return {"history": filtered}
