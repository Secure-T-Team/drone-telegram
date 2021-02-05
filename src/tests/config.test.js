const Config = require('../config')
const utils = require('../utils')

jest.mock('../utils')

const ENV = {
	PLUGIN_TOKEN: 'token',
	PLUGIN_TO: 'to',
	PLUGIN_LINK: 'link-{{branch}}-test',
	PLUGIN_AUTHORS: JSON.stringify({
		rediska1114: 'rediska1114',
		xp4ck: 'xp4ck',
		aaaaaaaaaaann: 'annpetrovna',
	}),

	DRONE_REPO_NAME: 'repo_name',
	DRONE_SOURCE_BRANCH: 'branch',
	DRONE_COMMIT_MESSAGE: 'commit_message',
	DRONE_BUILD_NUMBER: 1,
	DRONE_COMMIT_AUTHOR: 'rediska1114',
	DRONE_BUILD_STATUS: 'success',
	DRONE_REPO_BRANCH: 'master',
}

beforeEach(() => {
	process.env = ENV
})

describe('Config', () => {
	it('pass telegram config', () => {
		expect(new Config()).toHaveProperty('tg', { token: ENV.PLUGIN_TOKEN, to: ENV.PLUGIN_TO })
	})
	it('pass link config', () => {
		expect(new Config()).toHaveProperty('link', 'link-escaped_url-test')
	})
	it('call url_escape with correct args', () => {
		new Config()
		expect(utils.url_escape).toBeCalledWith(ENV.DRONE_SOURCE_BRANCH)
	})
	it('pass meta config', () => {
		expect(new Config()).toHaveProperty('meta', {
			build_number: ENV.DRONE_BUILD_NUMBER,
			repo_name: ENV.DRONE_REPO_NAME,
			branch: ENV.DRONE_SOURCE_BRANCH,
			commit_message: ENV.DRONE_COMMIT_MESSAGE,
			default_branch: ENV.DRONE_REPO_BRANCH,
			build_status: ENV.DRONE_BUILD_STATUS,
			author: ENV.DRONE_COMMIT_AUTHOR,
		})
	})
	it('pass tag config', () => {
		expect(new Config()).toHaveProperty('tag', 'tag')
	})
	it('pass authors config', () => {
		expect(new Config()).toHaveProperty('authors', JSON.parse(ENV.PLUGIN_AUTHORS))
	})

	it('call getTag with correct args', () => {
		new Config()
		expect(utils.getTag).toBeCalledWith(ENV.DRONE_SOURCE_BRANCH)
	})
})
