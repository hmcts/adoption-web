jest.mock('@hmcts/nodejs-logging');
import { Logger } from '@hmcts/nodejs-logging';
const logger = {
  info: jest.fn(),
  error: jest.fn(),
};
Logger.getLogger.mockReturnValue(logger);
import config from 'config';
import { when } from 'jest-when';
import nock from 'nock';

import { getServiceAuthToken, getTokenFromApi, initAuthToken } from './get-service-auth-token';

config.get = jest.fn();

describe('initAuthToken', () => {
  beforeEach(() => {
    when(config.get)
      .calledWith('services.authProvider.url')
      .mockReturnValue('http://rpe-service-auth-provider')
      .calledWith('services.authProvider.microservice')
      .mockReturnValue('adoption_web')
      .calledWith('services.authProvider.secret')
      .mockReturnValue('mock-secret');
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test('Should set an interval to start fetching a token', async () => {
    nock('http://rpe-service-auth-provider').post('/lease').reply(200, 'token');

    initAuthToken();
    // Flush pending promises so the async getTokenFromApi() call inside initAuthToken()
    // completes before afterEach cleans nock interceptors, preventing leakage into next test
    await new Promise(resolve => setImmediate(resolve));
  });

  test('Should log errors', async () => {
    nock('http://rpe-service-auth-provider').post('/lease').reply(500, 'Error');
    await getTokenFromApi();
    expect(logger.error).toHaveBeenCalledWith(
      'Error in refreshing service auth token ',
      expect.any(String),
      500,
      'Error'
    );
  });
});

describe('getServiceAuthToken', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('Should return a token', async () => {
    nock('http://rpe-service-auth-provider').post('/lease').reply(200, 'token');

    await getTokenFromApi();
    expect(getServiceAuthToken()).not.toBeUndefined();
  });
});
