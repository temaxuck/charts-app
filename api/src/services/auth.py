import jwt
from typing import Any, Dict

from config import Config

settings = Config()


def authenticate(username: str, password: str) -> bool:
    if username == "admin" and password == "admin":
        return True
    return False


def get_token_payload(token: str) -> Dict[str, Any]:
    try:
        return jwt.decode(
            token,
            settings.SECRET_KEY.get_secret_value(),
            algorithms=["HS256"],
        )
    except jwt.InvalidTokenError as e:
        raise e


def create_access_token(username: str) -> str:
    payload = {"sub": username}
    return create_token(payload)


def create_token(payload: Dict[str, Any]) -> str:
    return jwt.encode(
        payload,
        settings.SECRET_KEY.get_secret_value(),
        algorithm="HS256",
    )
