from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, status

from dependencies import authorize
from services.auth import authenticate, create_access_token
from schemas import LoginRequest, LoginResponse

app = FastAPI()


@app.get("/")
async def index(_: Annotated[str, Depends(authorize)]):
    return {"msg": "Hello, World!"}


@app.post("/login", response_model=LoginResponse)
async def login(credentials: LoginRequest):
    if not authenticate(credentials.username, credentials.password.get_secret_value()):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)

    access_token = create_access_token(credentials.username)
    return {"access_token": access_token}
