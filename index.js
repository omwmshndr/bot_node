const TelegramBot = require('node-telegram-bot-api')

const TOKEN = '6947314734:AAGjylv4f06ybSYD0SxH-O6U2ElaqQbT-HM'
const webAppUrl = 'https://stunning-belekoy-d054c4.netlify.app'
const bot = new TelegramBot(TOKEN, { polling: true })

bot.on('message', async message => {
	const chatId = message.chat.id
	const text = message.text

	if (text === '/start') {
		await bot.sendMessage(chatId, ':)', {
			reply_markup: {
				keyboard: [
					[{ text: 'Заполнить форму', web_app: { url: webAppUrl + '/form' } }]
				]
			}
		})
	}

	if (message?.web_app_data?.data) {
		try {
			const data = JSON.parse(message?.web_app_data?.data)

			await bot.sendMessage(chatId, `Ваша страна ${data.country}`)
			
			setTimeout(async () => {
				await bot.sendMessage(chatId, `Ваш город ${data.city}`)
			}, 500)

		} catch (e) {
			console.log(e)
		}
	}
})