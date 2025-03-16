import jwt

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Any, Annotated, Dict

from services.auth import get_token_payload


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


def authorize(token: Annotated[str, Depends(oauth2_scheme)]) -> Dict[str, Any]:
    try:
        return get_token_payload(token)
    except jwt.InvalidTokenError as e:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
