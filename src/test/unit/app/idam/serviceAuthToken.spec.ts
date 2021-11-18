/* tslint:disable:no-unused-expression */
import jwt from 'jsonwebtoken';
import moment from 'moment';

import { ServiceAuthToken } from 'idam/serviceAuthToken';

describe('ServiceAuthToken', () => {
  describe('hasExpired', () => {
    test('should thrown an error when token is malformed', () => {
      expect(() => new ServiceAuthToken('malformed-jwt-token').hasExpired()).toThrow(Error);
    });

    test('should return true when token has expired', () => {
      const token = jwt.sign({ exp: moment().unix() }, 'secret');
      expect(new ServiceAuthToken(token).hasExpired()).toBe(true);
    });

    test('should return false when token has not expired yet', () => {
      const token = jwt.sign({ exp: moment().add(1, 'second').unix() }, 'secret');
      expect(new ServiceAuthToken(token).hasExpired()).toBe(false);
    });
  });
});
