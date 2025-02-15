## Установка

1. Скачайте и установите [Node.js LTS](https://nodejs.org/).
2. Склонируйте репозиторий или загрузите файлы проекта.
3. Откройте терминал в папке проекта и выполните:
`
npm install
`
## Настройка.

в Name.json вы видите 
```
{
  "token": "ВАШ_ТОКЕН_БОТА",
  "chatId": "ID_ЧАТА",
  "MainUsername": "НИК_ДЛЯ_ПОЛУЧЕНИЯ_МОНЕТ",
  "price": 100,
  "users": [
    {
      "nickname": "НИК_БОТА",
      "password": "ПАРОЛЬ_БОТА",
      "anarchy": 21,
      "mode": 3,
      "item": "ender_pearl",
      "proxy": {
        "host": "хост_прокси",
        "port": 1080,
        "username": "логин_прокси",
        "password": "пароль_прокси"
      }
    }
  ]
}
```

Пояснения к полям:
```
token: Токен вашего [Telegram-бота]
chatId: ID чата, куда будут отправляться уведомления. Добавьте бота в этот чат.
MainUsername: Никнейм аккаунта, на который поступают монеты после продажи.
price: Цена продажи предмета (число).
users: Массив аккаунтов-ботов:
nickname: Никнейм аккаунта.
password: Пароль аккаунта.
anarchy + mode: Формируют номер анархии. Пример: anarchy: 21 + mode: 3 = анархия №31.
item: Название предмета на английском (например: ender_pearl).
proxy (опционально): Настройки SOCKS5 прокси:
host: Адрес прокси.
port: Порт прокси.
username: логин от прокси
password: пароль от прокси
```

```
mode = 1 / соло анархия
mode = 2 / дуо анархия
mode = 3 / трио анарахия
mode = 4 / клан анархия
```
## Запуск

В терминале выполните:
`
node index.js
`
Важно! перед запускам ведите капчу

Пример конфигурации
```
{
  "token": "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11",
  "chatId": "-1001234567890",
  "MainUsername": "SellerAccount",
  "price": 150,
  "users": [
    {
      "nickname": "Bot1",
      "password": "qwerty123",
      "anarchy": 5,
      "mode": 2,
      "item": "diamond",
      "proxy": {}
    },
    {
      "nickname": "Bot2",
      "password": "securePass",
      "anarchy": 15,
      "mode": 4,
      "item": "ender_pearl",
      "proxy": {
        "host": "proxy.example.com",
        "port": 1080,
        "username": "user123",
        "password": "pass123"
      }
    }
  ]
}
```
