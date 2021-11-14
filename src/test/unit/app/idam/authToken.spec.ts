import { AuthToken } from 'idam/authToken';

describe('authToken', () => {
  test('should set params correctly', () => {
    const token = new AuthToken('MOCK_ACCESS_TOKEN', 'MOCK_TOKEN_TYPE', 1000);
    expect(token.accessToken).toBe('MOCK_ACCESS_TOKEN');
    expect(token.tokenType).toBe('MOCK_TOKEN_TYPE');
    expect(token.expiresIn).toBe(1000);
  });
});