# Charts app API

Серверная часть приложения **Charts app**

# Quick start

1. (Опционально) Создайте виртуальное окружение и активируйте его:
```shell
python3 -m venv .venv
. .venv/bin/activate
```
2. Установите зависимости:
```shell
pip install -r requirements/base.txt
```
3. Используйте **uvicorn** для запуска сервера:
```shell
cd src
uvicorn main:app
```

# Запуск тестов

1. Установите необходимые зависимости:
```shell
pip install -r requirements/dev.txt
```

2. Запустите тесты:
```shell
pytest
ruff check
```

