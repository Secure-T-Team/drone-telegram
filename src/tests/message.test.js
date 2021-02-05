const Message = require('../message')
const Config = require('../config')

jest.mock('../config')

const config = new Config()

describe('Message', () => {
	describe('success message', () => {
		it('correct', () => {
			expect(new Message()._success_template()).toEqual([
				`✅ #1 repo_name —— branch`,
				'commit_message',
				`\n🎉 link`,
			])
		})
		it('correct without link', () => {
			const msg = new Message()
			msg.config.link = undefined
			expect(msg._success_template()).toEqual([
				`✅ #1 repo_name —— branch`,
				'commit_message',
				undefined,
			])
		})
	})

	describe('failure message', () => {
		it('correct', () => {
			expect(new Message()._failure_template()).toEqual([
				`👺 #1 repo_name —— branch`,
				'commit_message',
				`\n@annpetrovna please fix it`,
			])
		})

		it('correct without author', () => {
			const msg = new Message()
			msg.config.meta.author = 'test'
			expect(msg._failure_template()).toEqual([
				`👺 #1 repo_name —— branch`,
				'commit_message',
				`\n@test please fix it`,
			])
		})
	})

	describe('render', () => {
		it('must call failure template', () => {
			const msg = new Message()
			msg._failure_template = jest.fn().mockReturnValue(['test', 'failure'])
			msg._success_template = jest.fn().mockReturnValue(['test', 'success'])
			msg.config.meta.build_status = 'failure'
			msg.render()
			expect(msg._failure_template).toBeCalled()
			expect(msg._success_template).not.toBeCalled()
		})

		it('must call success template', () => {
			const msg = new Message()
			msg._failure_template = jest.fn().mockReturnValue(['test', 'failure'])
			msg._success_template = jest.fn().mockReturnValue(['test', 'success'])
			msg.config.meta.build_status = 'success'
			msg.render()
			expect(msg._success_template).toBeCalled()
			expect(msg._failure_template).not.toBeCalled()
		})

		it('must return success msg', () => {
			const msg = new Message()
			msg._failure_template = jest.fn().mockReturnValue(['test', 'failure'])
			msg._success_template = jest.fn().mockReturnValue(['test', 'success'])
			msg.config.meta.build_status = 'success'
			msg.render()
			expect(msg.render()).toEqual('test\nsuccess')
		})

		it('must return failure msg', () => {
			const msg = new Message()
			msg._failure_template = jest.fn().mockReturnValue(['test', 'failure'])
			msg._success_template = jest.fn().mockReturnValue(['test', 'success'])
			msg.config.meta.build_status = 'failure'
			msg.render()
			expect(msg.render()).toEqual('test\nfailure')
		})

		it('must filter empty in template', () => {
			const msg = new Message()
			msg._success_template = jest
				.fn()
				.mockReturnValue(['test', 'success', undefined, null, '', false])
			msg.render()
			expect(msg.render()).toEqual('test\nsuccess')
		})
	})
})
