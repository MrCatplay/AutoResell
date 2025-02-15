async function NotProxy(username) {
    return anarflayer.createBot({
        host: "fra.holyworld.me",
        port: 25565,
        username,
        version: '1.19.2'
    })
}

module.exports = { NotProxy }