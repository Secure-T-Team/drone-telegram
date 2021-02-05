const envsubst = require('../envsubst')

describe('envsubst', () => {
	it('replace env', () => {
		expect(envsubst('123_{{test}}_234', { test: 456 })).toBe('123_456_234')
	})

	it('replace not existing env', () => {
		expect(envsubst('123_{{test}}_234', { test1: 456 })).toBe('123_{{test}}_234')
	})

	it('empty context', () => {
		expect(envsubst('123_{{test}}_234', {})).toBe('123_{{test}}_234')
	})

	it('undefined context', () => {
		expect(envsubst('123_{{test}}_234')).toBe('123_{{test}}_234')
	})
})
