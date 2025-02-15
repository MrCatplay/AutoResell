function processChatCommand(bot, message) {
    const command = message.substring(message.indexOf('/chat ') + 6);
    bot.chat(command);
}

module.exports = { processChatCommand }