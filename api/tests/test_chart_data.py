import pytest

from fastapi import status
from fastapi.testclient import TestClient
from typing import Any, Dict

from config import Config
from main import app
from services.auth import create_access_token

client = TestClient(app)
settings = Config()


@pytest.fixture
def token():
    return create_access_token("user")


def test_get_chart_data_successful(token):
    response = client.get(
        "/chart-data",
        headers={"Authorization": f"Bearer {token}"},
    )
    response_data: Dict[str, Any] = response.json()

    assert response.status_code == status.HTTP_200_OK
    assert response_data.get("value") is not None
    assert response_data.get("max") is not None
    assert response_data["value"] <= response_data["max"]


def test_get_chart_data_protected():
    response = client.get("/chart-data")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
