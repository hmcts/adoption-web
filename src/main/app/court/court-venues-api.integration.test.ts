import axios from 'axios';
import { LoggerInstance } from 'winston';

import { emptyPostcode200Response } from '../../../test/unit/utils/mockPostcodeResponses';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { AppRequest, UserDetails } from '../../app/controller/AppRequest';

import { getCourtList, getCourtVenues } from './court-venues-api';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const userDetails: UserDetails = {
  accessToken: '123',
  email: 'billy@bob.com',
  givenName: 'billy',
  familyName: 'bob',
  id: 'something',
  roles: [],
};
// let mockReq: AppRequest;

describe('Court Lookup', () => {
  let mockLogger: LoggerInstance;
  let mockReq: AppRequest;

  beforeEach(() => {
    mockReq = mockRequest();
    mockLogger = {
      error: jest.fn().mockImplementation((message: string) => message),
    } as unknown as LoggerInstance;
  });

  it('returns an empty array when there are no results getCourtVenues', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: emptyPostcode200Response });

    const actual = await getCourtVenues('ABA3', userDetails, mockLogger);

    expect(mockLogger.error).not.toHaveBeenCalled();
    expect(actual).toEqual([]);
  });

  it('returns an empty array when there are no results getCourtList', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: emptyPostcode200Response });

    const actual = await getCourtList(mockReq);

    expect(mockLogger.error).not.toHaveBeenCalled();
    expect(actual).toEqual([]);
  });
});
