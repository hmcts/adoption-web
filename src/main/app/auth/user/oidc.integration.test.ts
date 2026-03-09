import config from 'config';
import nock from 'nock';
import { when } from 'jest-when';

import { CALLBACK_URL } from '../../../steps/urls';

import { getRedirectUrl, getSystemUser, getUserDetails } from './oidc';

config.get = jest.fn();

const token = config['mockData']['authToken'];
const mockedEmail = config['mockData']['email'];
const mockedGivenName = config['mockData']['givenName'];
const mockedId = config['mockData']['id'];
const mockedFamilyName = config['mockData']['familyName'];
const mockedRoles = config['mockData']['roles'];

describe('getRedirectUrl', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should create a valid URL to redirect to the login screen', () => {
    when(config.get)
      .calledWith('services.idam.clientID')
      .mockReturnValue('adoption-web')
      .calledWith('services.idam.authorizationURL')
      .mockReturnValue('https://idam-web-public/login');

    expect(getRedirectUrl('http://localhost', CALLBACK_URL)).toBe(
      'https://idam-web-public/login?client_id=adoption-web&response_type=code&redirect_uri=http://localhost/receiver'
    );
  });
});

describe('getUserDetails', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should exchange a code for a token and decode a JWT to get the user details', async () => {
    when(config.get)
      .calledWith('services.idam.clientID')
      .mockReturnValue('adoption-web')
      .calledWith('services.idam.clientSecret')
      .mockReturnValue('mock-secret')
      .calledWith('services.idam.tokenURL')
      .mockReturnValue('http://idam-service/o/token');

    nock('http://idam-service')
      .post('/o/token')
      .reply(200, {
        access_token: token,
        id_token: token,
      });

    const result = await getUserDetails('http://localhost', '123', CALLBACK_URL);
    expect(result).toStrictEqual({
      accessToken: token,
      email: mockedEmail,
      givenName: mockedGivenName,
      familyName: mockedFamilyName,
      id: mockedId,
      roles: mockedRoles,
    });
  });
});

describe('getCaseWorkerUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should retrieve a token with caseworker username and password then decode the JWT to get user details', async () => {
    when(config.get)
      .calledWith('services.idam.clientID')
      .mockReturnValue('adoption-web')
      .calledWith('services.idam.clientSecret')
      .mockReturnValue('mock-secret')
      .calledWith('services.idam.tokenURL')
      .mockReturnValue('http://idam-service/o/token')
      .calledWith('services.idam.systemUsername')
      .mockReturnValue('system-user')
      .calledWith('services.idam.systemPassword')
      .mockReturnValue('system-pass');

    nock('http://idam-service')
      .post('/o/token')
      .reply(200, {
        access_token: token,
        id_token: token,
      });

    const result = await getSystemUser();
    expect(result).toStrictEqual({
      accessToken: token,
      email: mockedEmail,
      givenName: mockedGivenName,
      familyName: mockedFamilyName,
      id: mockedId,
      roles: mockedRoles,
    });
  });
});
