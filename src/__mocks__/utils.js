const utils = jest.createMockFromModule('../utils')

utils.url_escape = jest.fn().mockReturnValue('escaped_url')

utils.getTag = jest.fn().mockReturnValue('tag')

module.exports = utils
