const axios = jest.createMockFromModule('axios')

axios.get = jest.fn().mockReturnValue(Promise.resolve({ data: { ok: true, result: 'okay' } }))

module.exports = axios
