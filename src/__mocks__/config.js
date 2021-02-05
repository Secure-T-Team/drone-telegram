const Config = jest.fn().mockImplementation(() => ({
	tg: {
		to: 'to',
		token: 'token',
	},
	link: 'link',
	meta: {
		build_number: 1,
		repo_name: 'repo_name',
		branch: 'branch',
		commit_message: 'commit_message',
		default_branch: 'master',
		build_status: 'success',
		author: 'aaaaaaaaaaann',
	},
	tag: 'edu-12',
	authors: {
		rediska1114: 'rediska1114',
		xp4ck: 'xp4ck',
		aaaaaaaaaaann: 'annpetrovna',
	},
}))

module.exports = Config
