const Config = require('./config')

class Message {
	constructor() {
		this.config = new Config()
	}

	_success_template = () => [
		`✅ #${this.config.meta.build_number} ${this.config.meta.repo_name} —— ${this.config.meta.branch}`,
		this.config.meta.commit_message,
		this.config.link && `\n🎉 ${this.config.link}`,
	]

	_failure_template = () => [
		`👺 #${this.config.meta.build_number} ${this.config.meta.repo_name} —— ${this.config.meta.branch}`,
		this.config.meta.commit_message,
		`\n@${this.config.authors[this.config.meta.author] || this.config.meta.author} please fix it`,
	]

	render() {
		let message = ''
		if (this.config.meta.build_status === 'success') {
			message = this._success_template()
		} else {
			message = this._failure_template()
		}

		return message.filter(v => !!v).join('\n')
	}
}

module.exports = Message
