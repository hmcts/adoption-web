import Axios, { AxiosStatic } from 'axios';
import config from 'config';
import { when } from 'jest-when';

import { CALLBACK_URL } from '../../../steps/urls';

import { getRedirectUrl, getSystemUser, getUserDetails } from './oidc';

jest.mock('axios');
config.get = jest.fn();

const mockedAxios = Axios as jest.Mocked<AxiosStatic>;

const token = config['mockData']['authToken'];
const mockedEmail = config['mockData']['email'];
const mockedGivenName = config['mockData']['givenName'];
const mockedId = config['mockData']['id'];
const mockedFamilyName = config['mockData']['familyName'];
const mockedRoles = config['mockData']['roles'];

describe('getRedirectUrl', () => {
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
  test('should exchange a code for a token and decode a JWT to get the user details', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        access_token: token,
        id_token: token,
      },
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
  test('should retrieve a token with caseworker username and password then decode the JWT to get user details', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        access_token: token,
        id_token: token,
      },
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
