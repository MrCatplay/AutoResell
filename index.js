global.anarflayer = require('anarflayer')
global.socks = require('socks').SocksClient
const { sell } = require('./Autoresel')
const {processChatCommand} = require("./processChatCommand");
const {readFile} = require("node:fs");
const {sendTelegramMessage} = require("./sendTelegram");
const { Proxy } = require('./startBOT/Proxy')
const { NotProxy } = require('./startBOT/NotProxy')

async function start(user, usersData) {
    let bot = ''

    if (user.proxy === {}) {
        bot = await Proxy(user)
    } else {
        bot = await NotProxy(user.nickname)
    }

    bot.price = user.price
    bot.item = user.item
    bot.function = {}
    bot.spawn = false
    bot.windowOpen = false
    bot.loginServer = false
    bot.OpenAh = false

    bot.on('kicked', (reason) => {
        console.log(reason)
    })

    bot.on('login', async () => {
        if (bot.spawn) return
        bot.spawn = true

        await sell(bot)

        await new Promise(resolve => setTimeout(resolve, 2000));
        bot.chat('/lite')
        bot.windowOpen = true
    })

    bot.on('login', async () => {
        if (!bot.loginServer) return
        bot.loginServer = false

        await bot.function.resell.func()
        setInterval(async () => {
            await bot.function.resell.func()
        }, 15 * 1000)
    })

    bot.on('messagestr', (message) => {
        // console.log(message);
        if (message.includes('▶ Вы успешно выставили на продажу') || message.includes('был снят с продажи')) {
            console.log(message);
        }

        if (message.includes('/chat ')) {
            processChatCommand(bot, message);
        }

        if (message.includes('купил у вас')) {
            try {
                // Изменение регулярного выражения для захвата названия товара
                const purchaseRegex = /▶ (.+?) купил у вас \[Ender Pearl\] x(\d+) за ([\d ]+)¤/;
                const match = message.match(purchaseRegex);

                if (match) {
                    const [, username, quantity, price] = match;

                    // Форматируем сообщение для Telegram
                    console.log(price)
                    const formattedMessage =
                        `🛍 Покупка: ${username}\n` +
                        `📦 Товар: 'Ender Pearl' x${quantity}\n` +
                        `💰 Сумма: ${price.replace(/ /g, ',')}¤`; // Заменяем пробелы в числе на запятые

                    bot.chat(`/pay HE_MrKot ${price.replace(/ /g, '')}`);
                    // Отправляем сообщение в Telegram
                    sendTelegramMessage(usersData.token, usersData.chatId, formattedMessage)
                        .then(() => console.log('Уведомление о покупке отправлено'))
                        .catch(error => console.error('Ошибка отправки сообщения в Telegram:', error));
                } else {
                    console.error('Не удалось распарсить сообщение о покупке:', message);
                }
            } catch (e) {
                console.error('Ошибка обработки покупки:', e);
            }
        }

    })

    bot.on('windowOpen', async (window) => {
        if (!bot.windowOpen) return
        bot.windowOpen = false

        await new Promise(resolve => setTimeout(resolve, 2000));
        await bot.clickWindow(user.mode, 0, 0)
        await new Promise(resolve => setTimeout(resolve, 2000));
        await bot.clickWindow(user.anarchy, 0, 0)
        bot.loginServer = true
    })
}

readFile('Name.json', 'utf8', async (err, data) => {
    if (err) {
        console.error('Ошибка при чтении файла:', err);
        return;
    }

    const usersData = JSON.parse(data);

    const usersList = usersData.users;

    // console.log(usersList)

    for (const user of usersList) {
        // console.log(user)
        await start(user, usersData)
        await new Promise(resolve => setTimeout(resolve, 20));
    }
});