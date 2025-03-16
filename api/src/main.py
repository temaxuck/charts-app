from typing import Annotated, Dict
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from config import Config
from dependencies import authorize
from models import ChartData
from schemas import LoginRequest, LoginResponse, ChartDataResponse
from services.auth import authenticate, create_access_token

settings = Config()


def create_app() -> FastAPI:
    app = FastAPI()
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


app = create_app()


@app.get("/chart-data", response_model=ChartDataResponse)
async def chart_data(_: Annotated[Dict, Depends(authorize)]):
    data = ChartData()
    return {"value": data.current_value, "max": data.max_value}


@app.post("/login", response_model=LoginResponse)
async def login(credentials: LoginRequest):
    if not authenticate(credentials.username, credentials.password.get_secret_value()):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Bad credentials")

    access_token = create_access_token(credentials.username)
    return {"access_token": access_token}
