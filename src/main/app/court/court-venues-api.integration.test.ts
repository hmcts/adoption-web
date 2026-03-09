import config from 'config';
import nock from 'nock';
import { LoggerInstance } from 'winston';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { AppRequest, UserDetails } from '../../app/controller/AppRequest';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';

import { getCourtListFromAPI, getCourtVenuesFromAPI } from './court-venues-api';

jest.mock('../auth/service/get-service-auth-token');

config.get = jest.fn().mockImplementation((key: string) => {
  if (key === 'services.location_api.url') {
    return 'http://location-api';
  }
  if (key === 'services.adoptionCourt.code') {
    return 'ABA4';
  }
  if (key === 'adoption.family-court') {
    return {};
  }
  return '';
});

const mockGetServiceAuthToken = getServiceAuthToken as jest.Mock;
mockGetServiceAuthToken.mockReturnValue('mock-service-auth-token');
const userDetails: UserDetails = {
  accessToken: '123',
  email: 'billy@bob.com',
  givenName: 'billy',
  familyName: 'bob',
  id: 'something',
  roles: [],
};

describe('Court Lookup', () => {
  let mockLogger: LoggerInstance;
  let mockReq: AppRequest;

  beforeEach(() => {
    mockReq = mockRequest();
    mockLogger = {
      error: jest.fn().mockImplementation((message: string) => message),
    } as unknown as LoggerInstance;
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('returns an empty array when there are no results getCourtVenues', async () => {
    nock('http://location-api').get('/refdata/location/court-venues/services').query(true).reply(200, {});

    const actual = await getCourtVenuesFromAPI('ABA3', userDetails, mockLogger);

    expect(mockLogger.error).not.toHaveBeenCalled();
    expect(actual).toEqual([]);
  });

  it('returns an empty array when there are no results getCourtList', async () => {
    nock('http://location-api').get('/refdata/location/court-venues/services').query(true).reply(200, {});

    const actual = await getCourtListFromAPI(mockReq);

    expect(mockLogger.error).not.toHaveBeenCalled();
    expect(actual).toEqual([]);
  });
});
