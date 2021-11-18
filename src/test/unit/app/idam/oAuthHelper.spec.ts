import { OAuthHelper } from 'app/idam/oAuthHelper';
import * as express from 'express';
import uuid from 'uuid';

jest.mock('uuid');
jest.mock('cookies');

const mockReq = {
  path: '/some-path',
  headers: {
    host: 'somehost.com'
  },
  cookies: {
    state: 'MOCK_STATE_COOKIE'
  }
} as express.Request;

const mockRes = {

} as express.Response;


describe('OAuthHelper', () => {
  beforeEach(() => {
    mockRes.locals = {
      user: {
        id: 'MOCK_ID'
      }
    };
    jest.spyOn(uuid, 'v4').mockReturnValue('MOCK_UUID_V4');
  });

  describe('forLogin', () => {
    test('should return correct reditect uri', () => {
      const expected = 'http://localhost:9002/login?response_type=code&state=MOCK_UUID_V4&client_id=adoption-web&redirect_uri=https://somehost.com/receiver';
      expect(OAuthHelper.forLogin(mockReq, mockRes)).toBe(expected);
    });
  });

  describe('forPin', () => {
    test('should return correct reditect uri', () => {
      const expected = 'http://localhost:9002/login/pin?response_type=code&state=MOCK_CLAIM_REFERENCE&client_id=adoption-web&redirect_uri=https://somehost.com/receiver';
      expect(OAuthHelper.forPin(mockReq, mockRes, 'MOCK_CLAIM_REFERENCE')).toBe(expected);
    });
  });

  describe('forUplift', () => {
    test('should return correct reditect uri', () => {
      const expected = 'http://localhost:9002/login/uplift?response_type=code&state=MOCK_ID&client_id=adoption-web&redirect_uri=https://somehost.com/receiver';
      expect(OAuthHelper.forUplift(mockReq, mockRes)).toBe(expected);
    });
  });

  describe('getStateCookie', () => {
    test('should return correct reditect uri', () => {
      const expected = 'MOCK_STATE_COOKIE';
      expect(OAuthHelper.getStateCookie(mockReq)).toBe(expected);
    });
  });
});