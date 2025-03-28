from pydantic import BaseModel, SecretStr


class LoginRequest(BaseModel):
    username: str
    password: SecretStr


class LoginResponse(BaseModel):
    access_token: str


class ChartDataResponse(BaseModel):
    value: float
    max: float
