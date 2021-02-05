const axios = require('axios').default
const Config = require('./config')
const Message = require('./message')

class Telegram {
	constructor() {
		this.config = new Config()
	}

	async _send_message(text) {
		const res = await axios.get(`https://api.telegram.org/bot${this.config.tg.token}/sendMessage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				chat_id: this.config.tg.to,
				disable_web_page_preview: true,
				disable_notification: this.config.meta.build_status === 'success',
				text,
			},
		})
		console.log(res.data)
		if (!res.data.ok) {
			throw res.data
		}
	}

	async send() {
		const message = new Message().render()

		await this._send_message(message)
	}
}

module.exports = Telegram
