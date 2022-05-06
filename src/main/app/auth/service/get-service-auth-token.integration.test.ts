jest.mock('axios');
jest.mock('@hmcts/nodejs-logging');
jest.useFakeTimers();
import { Logger } from '@hmcts/nodejs-logging';
const logger = {
  info: jest.fn(),
  error: jest.fn(),
};
Logger.getLogger.mockReturnValue(logger);
import Axios, { AxiosStatic } from 'axios';
import config from 'config';
import { when } from 'jest-when';

import { getServiceAuthToken, getTokenFromApi, initAuthToken } from './get-service-auth-token';

const mockedAxios = Axios as jest.Mocked<AxiosStatic>;

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

  test('Should set an interval to start fetching a token', () => {
    mockedAxios.post.mockResolvedValue('token');

    initAuthToken();
    expect(mockedAxios.post).toHaveBeenCalledWith('http://rpe-service-auth-provider/lease', {
      microservice: 'adoption_web',
      oneTimePassword: expect.anything(),
    });
  });

  test('Should log errors', async () => {
    mockedAxios.post.mockRejectedValue({ message: 'MOCK_ERROR', response: { status: 500, data: 'Error' } });
    try {
      getTokenFromApi();
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
    }
    expect(logger.error).toHaveBeenCalledWith('Error in refreshing service auth token ', 'MOCK_ERROR', 500, 'Error');
  });
});

describe('getServiceAuthToken', () => {
  test('Should return a token', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'token' });

    await getTokenFromApi();
    expect(getServiceAuthToken()).not.toBeUndefined();
  });
});
