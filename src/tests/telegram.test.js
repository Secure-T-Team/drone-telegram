const Telegram = require('../telegram')
const Config = require('../config')
const axios = require('axios')
const Message = require('../message')

jest.mock('../config')
jest.mock('axios')
jest.mock('../message')

const config = new Config()

describe('Telegram', () => {
	describe('config', () => {
		it('must call constructor', () => {
			new Telegram()
			expect(Config).toBeCalled()
		})
		it('has config property', () => {
			expect(new Telegram()).toHaveProperty('config', config)
		})
	})

	describe('_send_message', () => {
		it('must call axios.get with correct params', () => {
			new Telegram()._send_message('text')

			expect(axios.get).toBeCalledWith(
				`https://api.telegram.org/bot${config.tg.token}/sendMessage`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					data: {
						chat_id: config.tg.to,
						disable_web_page_preview: true,
						disable_notification: config.meta.build_status === 'success',
						text: 'text',
					},
				},
			)
		})

		it('must throw if axios.get return ok=false', async () => {
			axios.get = jest.fn().mockReturnValue(Promise.resolve({ data: { ok: false } }))

			const tg = new Telegram()

			await expect(async () => {
				await tg._send_message('text')
			}).rejects.toEqual({ ok: false })
		})
	})

	describe('send', () => {
		it('must call Message.render', async () => {
			const tg = new Telegram()
			tg._send_message = jest.fn().mockReturnValue(Promise.resolve())
			await tg.send()
			expect(tg._send_message).toBeCalledWith(new Message().render())
		})
	})
})
