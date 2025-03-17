# Charts app

Fullstack-приложение **Charts app**. Проект является решением тестового задания на позицию Fullstack-разработчик в [Servicepipe](https://servicepipe.ru/).

## Запуск приложения

Запустить проект можно используя **docker** или **вручную** клиентскую и серверную части.

### Docker

1. Запустите приложение:
```shell
docker compose build
docker compose up -d # флаг -d опционален 
```

2. Перейдите по адресу http://localhost:4173/

3. Для аутентификации используйте имя пользователя *admin* и пароль *admin*

### Вручную

Для запуска серверного и клиентского приложений вручную следуйте инструкциям *README.md* внутри директорий [api/](https://github.com/temaxuck/charts-app/blob/main/api/README.md) и [client/](https://github.com/temaxuck/charts-app/blob/main/client/README.md).