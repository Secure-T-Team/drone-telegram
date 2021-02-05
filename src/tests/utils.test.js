const { url_escape, getTag, getFirstGroup } = require('../utils')

describe('utils', () => {
	describe('url_escape', () => {
		it('empty string', () => {
			expect(url_escape('')).toBe('')
		})

		it('simple string', () => {
			expect(url_escape('test')).toBe('test')
		})

		it('uppercase string', () => {
			expect(url_escape('TEST')).toBe('test')
		})

		it('string with syms', () => {
			expect(url_escape('test/123-g*')).toBe('test-123-g-')
		})
	})

	describe('getTag', () => {
		it('empty string', () => {
			expect(getTag('')).toBe('')
		})

		it('simple string', () => {
			expect(getTag('features-2')).toBe('features-2')
		})

		it('simple string with escape', () => {
			expect(getTag('features/test-2')).toBe('features-test-2')
		})

		it('string with jira tag', () => {
			expect(getTag('TEST-2-wgw-wg')).toBe('test-2')
		})

		it('string with jira tag and prefix', () => {
			expect(getTag('features/TEST-2')).toBe('test-2')
		})
	})

	describe('getFirstGroup', () => {
		it('empty string', () => {
			expect(getFirstGroup(/([0-9]+)/g, '')).toEqual([])
		})

		it('simple string', () => {
			expect(getFirstGroup(/([0-9]+)/g, '1234')).toEqual(['1234'])
		})
	})
})
