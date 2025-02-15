const https = require('https');

function sendTelegramMessage(token, chatId, message) {
    return new Promise((resolve, reject) => {
        try {
            // Формируем параметры запроса
            const params = new URLSearchParams({
                chat_id: chatId,
                text: message
            });

            // Настраиваем опции для HTTPS-запроса
            const options = {
                hostname: 'api.telegram.org',
                port: 443,
                path: `/bot${token}/sendMessage?${params}`,
                method: 'GET'
            };

            // Создаем и отправляем запрос
            const req = https.request(options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 200) {
                        resolve(JSON.parse(data));
                    } else {
                        reject(`HTTP Error: ${res.statusCode} - ${data}`);
                    }
                });
            });

            // Обработка ошибок
            req.on('error', (error) => {
                reject(`Request error: ${error.message}`);
            });

            // Таймаут соединения (5 секунд)
            req.setTimeout(5000, () => {
                req.destroy();
                reject('Connection timeout');
            });

            req.end();
        } catch (err) {
            console.log(err)
        }
    });
}

module.exports = { sendTelegramMessage }