function url_escape(str) {
	return str.toLowerCase().replace(/[^a-z0-9\-]/gm, '-')
}

function getTag(branch) {
	const match = getFirstGroup(/([A-Z]+-[\d]+)/g, branch)
	if (!match || !match[0]) {
		return url_escape(branch)
	}
	return url_escape(match[0])
}

function getFirstGroup(regexp, str) {
	return Array.from(str.matchAll(regexp), m => m[1])
}

module.exports = {
	url_escape,
	getTag,
	getFirstGroup,
}
