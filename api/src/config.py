from pydantic import SecretStr
from pydantic_settings import BaseSettings
from secrets import token_hex
from typing import Set


class Config(BaseSettings):
    SECRET_KEY: SecretStr = token_hex(32)
    ALLOWED_ORIGINS: Set[str] = set(["http://localhost:5173"])
