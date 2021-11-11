import config from 'config';
import { Request } from 'express';

import { JwtExtractor } from 'idam/jwtExtractor';

const sessionCookieName = config.get<string>('session.cookieName');

describe('Extracting JWT', () => {
  test('should return token from cookie', () => {
    const jwtValue = 'a';

    const req = {
      cookies: {
        [sessionCookieName]: jwtValue
      }
    } as Request;

    expect(JwtExtractor.extract(req)).toBe(jwtValue);
  });
});
