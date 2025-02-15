async function sell(bot) {
    bot.function.sell = {
        func: async function () {
            for (let i = 0; i <= 4; i++) {
                const enderPearl = bot.inventory.items().find(item => item.name === bot.item);

                if (enderPearl) {
                    await bot.equip(enderPearl, 'hand');
                } else {
                    console.log('Предмет не найден в инвентаре.');
                }

                // console.log(bot.price)
                bot.chat(`/ah sell ${bot.price}`);

                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    }

    bot.function.resell = {
        func: async function () {
            bot.OpenAh = true
            bot.chat('/ah')
        }
    }

    bot.on('windowOpen', async () => {
        if (!bot.OpenAh) return
        bot.OpenAh = false

        await new Promise(resolve => setTimeout(resolve, 2000));
        await bot.clickWindow(45, 0, 0)
        await new Promise(resolve => setTimeout(resolve, 2000))

        for (let i = 0; i <= 4; i++) {
            if (!bot.currentWindow) {
                // console.log('окно закрыто')
		        await bot.function.sell.func()
                return
            }
            await bot.clickWindow(0, 0, 0)
            await new Promise(resolve => setTimeout(resolve, 250));
        }

        for (let i = 0; i <= 1; i++) {
            if (!bot.currentWindow) {
                // console.log('окно закрыто')
                await bot.function.sell.func()
                return
            }
            await bot.closeWindow(bot.currentWindow);
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // console.log('sell')
        await bot.function.sell.func()
    })
}

module.exports = { sell }