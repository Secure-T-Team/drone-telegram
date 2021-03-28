const envsubst = require('./envsubst')
const { getTag, url_escape } = require('./utils')

class Config {
	constructor() {
		const {
			PLUGIN_TOKEN,
			PLUGIN_TO,
			PLUGIN_LINK,
			PLUGIN_AUTHORS,

			DRONE_REPO_NAME,
			DRONE_SOURCE_BRANCH,
			DRONE_COMMIT_MESSAGE,
			DRONE_BUILD_NUMBER,
			DRONE_COMMIT_AUTHOR,
			DRONE_BUILD_STATUS,
			DRONE_REPO_BRANCH,
		} = process.env // TODO refactor to util

		this.tg = {
			to: PLUGIN_TO,
			token: PLUGIN_TOKEN,
		}
		this.meta = {
			build_number: +DRONE_BUILD_NUMBER,
			repo_name: DRONE_REPO_NAME,
			branch: DRONE_SOURCE_BRANCH,
			commit_message: DRONE_COMMIT_MESSAGE,
			default_branch: DRONE_REPO_BRANCH,
			build_status: DRONE_BUILD_STATUS,
			author: DRONE_COMMIT_AUTHOR,
		}
		this.tag = getTag(DRONE_SOURCE_BRANCH)
		this.authors = PLUGIN_AUTHORS ? JSON.parse(PLUGIN_AUTHORS) : {}

		this.link = PLUGIN_LINK
			? envsubst(PLUGIN_LINK, {
					...this.meta,
					tag: this.tag,
					branch: url_escape(this.meta.branch),
			  })
			: undefined
	}
}

module.exports = Config
