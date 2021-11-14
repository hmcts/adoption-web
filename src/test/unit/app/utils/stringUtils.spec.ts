import { StringUtils } from 'utils/stringUtils'

describe('StringUtils', () => {
  describe('trimToUndefined', () => {
    test('should return undefined if value is undefined', () => {
      expect(StringUtils.trimToUndefined(undefined)).not.toBeDefined()
    })

    test('should return undefined for blank string', () => {
      expect(StringUtils.trimToUndefined('')).not.toBeDefined()
    })

    test('should return undefined for empty string', () => {
      expect(StringUtils.trimToUndefined('   ')).not.toBeDefined()
    })

    test('should return trim string if on both ends', () => {
      expect(StringUtils.trimToUndefined('  abc  ')).toEqual('abc')
    })

    test('should return unchanged string if there is nothing to trim', () => {
      expect(StringUtils.trimToUndefined('abc')).toEqual('abc')
    })
  })
})
