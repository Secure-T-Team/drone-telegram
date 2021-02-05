const Message = jest.fn().mockImplementation(() => ({
	render: jest.fn().mockReturnValue('success message'),
}))

module.exports = Message
