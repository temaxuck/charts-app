from typing import Annotated, Dict
from fastapi import Depends, FastAPI, HTTPException, status

from dependencies import authorize
from models import ChartData
from services.auth import authenticate, create_access_token
from schemas import LoginRequest, LoginResponse, ChartDataResponse

app = FastAPI()


@app.get("/chart-data", response_model=ChartDataResponse)
async def chart_data(_: Annotated[Dict, Depends(authorize)]):
    data = ChartData()
    return {"value": data.current_value, "max": data.max_value}


@app.post("/login", response_model=LoginResponse)
async def login(credentials: LoginRequest):
    if not authenticate(credentials.username, credentials.password.get_secret_value()):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)

    access_token = create_access_token(credentials.username)
    return {"access_token": access_token}
