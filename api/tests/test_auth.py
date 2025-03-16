import pytest

from datetime import datetime, timedelta
from fastapi import Depends, status
from fastapi.testclient import TestClient
from jwt import decode
from typing import Annotated

from config import Config
from dependencies import authorize
from main import app
from services.auth import create_access_token

client = TestClient(app)
settings = Config()


class TestLogin:
    # TODO: provide valid username and password
    valid_credentials = {"username": "admin", "password": "admin"}
    invalid_credentials = {"username": "1nv4l1d_u53rn4m3", "password": "p455w0rd"}

    def test_login_successful(self):
        response = client.post(
            "/login",
            json={
                "username": self.valid_credentials["username"],
                "password": self.valid_credentials["password"],
            },
        )

        assert response.status_code == status.HTTP_200_OK
        assert "access_token" in response.json()

        token = response.json()["access_token"]
        token_payload = decode(
            token, settings.SECRET_KEY.get_secret_value(), algorithms=["HS256"]
        )

        assert "sub" in token_payload
        assert token_payload.get("sub") == self.valid_credentials["username"]

    def test_login_invalid_username(self):
        response = client.post(
            "/login",
            json={
                "username": self.invalid_credentials["username"],
                "password": self.valid_credentials["password"],
            },
        )

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_login_invalid_password(self):
        response = client.post(
            "/login",
            json={
                "username": self.valid_credentials["username"],
                "password": self.invalid_credentials["password"],
            },
        )

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_login_missing_fields(self):
        response = client.post(
            "/login",
            json={"username": self.valid_credentials["username"]},
        )

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

        response = client.post(
            "/login",
            json={"password": self.valid_credentials["password"]},
        )

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


class TestProtectedRoute:
    @classmethod
    def setup_class(cls):
        def protected(_: Annotated[str, Depends(authorize)]):
            return {"msg": "Protected route"}

        app.add_api_route("/protected", protected, methods=["GET"])

    @classmethod
    def teardown_class(cls):
        app.router.routes = [
            route for route in app.router.routes if route.path != "/protected"
        ]

    def test_protected_route_successful(self):
        token = create_access_token("user")
        response = client.get(
            "/protected",
            headers={"Authorization": f"Bearer {token}"},
        )
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"msg": "Protected route"}

    def test_protected_route_invalid_token(self):
        token = f"{create_access_token('user')}_invalid_appendix"
        response = client.get(
            "/protected",
            headers={"Authorization": f"Bearer {token}"},
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
