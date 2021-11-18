import { Request } from 'express';
import { buildURL } from 'app/utils/callbackBuilder';

const mockRequest = {
  body: {
    firstName: 'J',
    lastName: 'Doe',
    email: 'jdoe@abc123.com',
    password: 'Abcd1234',
    passwordConfirm: 'Abcd1234',
    company: 'ABC Inc.'
  }
} as Request;

describe('CallbackBuilder', () => {

  describe('buildURL should create URL ', () => {
    test('for SSL request ', () => {
      const path = 'my/service/path';
      const expected = `https://localhost/${path}`;
      mockRequest.secure = true;
      mockRequest.headers = { host: 'localhost' };
      const url = buildURL(mockRequest, path);

      expect(url).toEqual(expected);
    });

    test('for non SSL request ', () => {
      const path = '/my/service/path';
      const expected = `https://localhost${path}`;
      mockRequest.secure = false;
      mockRequest.headers = { host: 'localhost' };

      const url = buildURL(mockRequest, path);
      expect(url).toEqual(expected);
    });
  });

  describe('buildURL should throw error ', () => {
    test('for undefined request ', () => {
      const path = 'my/service/path';
      expect(() => buildURL(undefined, path)).toThrow(Error); //, 'Request is undefined'
    });

    test('for null path ', () => {
      mockRequest.secure = false;
      mockRequest.headers = { host: 'localhost' };
      expect(() => buildURL(mockRequest, null)).toThrow(Error);//, 'Path null or undefined')
    });

    test('for empty path ', () => {
      mockRequest.secure = false;
      mockRequest.headers = { host: 'localhost' };
      expect(() => buildURL(mockRequest, '')).toThrow(Error);//, 'Path null or undefined')
    });

    test('for undefined path ', () => {
      mockRequest.secure = false;
      mockRequest.headers = { host: 'localhost' };
      expect(() => buildURL(mockRequest, undefined)).toThrow(Error);//, 'Path null or undefined')
    });
  });
});
