async function Proxy(user) {
    const proxy = user.proxy;

    return anarflayer.createBot({
        host: 'fra.holyworld.ru',
        port: 25565,
        username: user.nickname,
        connectTimeout: 60000,
        version: "1.19.2",
        connect: (client) => {
            socks.createConnection({
                proxy: {
                    host: proxy.host,
                    port: proxy.port,
                    type: 5,
                    userId: proxy.username,
                    password: proxy.password
                },
                command: 'connect',
                destination: {
                    host: 'fra.holyworld.ru',
                    port: 25565
                }
            }, (err, info) => {
                if (err) {
                    console.error(err)
                }

                client.setSocket(info.socket)
                client.emit('connect')
            })
        }
    })
}

module.exports = { Proxy }