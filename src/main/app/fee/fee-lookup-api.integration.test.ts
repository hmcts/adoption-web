import axios from 'axios';
import config from 'config';
import { when } from 'jest-when';
import { LoggerInstance } from 'winston';

import {
  emptyFeeLookup200Response,
  invalidFeeLookup400Response,
  invalidFeeLookupKey401Response,
  validFeeLookup200Response,
} from '../../../test/unit/utils/mockFeeLookupResponses';

import { getFee } from './fee-lookup-api';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
config.get = jest.fn();
describe('fee-lookup-api', () => {
  let mockLogger: LoggerInstance;

  beforeEach(() => {
    mockLogger = {
      error: jest.fn().mockImplementation((message: string) => message),
    } as unknown as LoggerInstance;

    when(config.get)
      .calledWith('services.feeLookup.url')
      .mockReturnValue('http://fees-register-api/fees-register/fees/lookup');
  });

  it('correctly returns fee lookup api success response', async () => {
    mockedAxios.get.mockResolvedValueOnce(validFeeLookup200Response);

    const actual = await getFee(mockLogger);

    expect(mockedAxios.get).toHaveBeenCalledWith('http://fees-register-api/fees-register/fees/lookup', {
      headers: { accept: 'application/json' },
      params: {
        application_type: 'all',
        channel: 'default',
        event: 'issue',
        jurisdiction1: 'family',
        jurisdiction2: 'family court',
        keyword: 'ApplyAdoption',
        service: 'adoption',
      },
    });

    expect(actual).toEqual({
      FeeAmount: '1234',
      FeeCode: 'MOCK_CODE',
      FeeDescription: 'MOCK_DESCRIPTION',
      FeeVersion: 'MOCK_VERSION',
    });
  });

  it('returns an empty object when there are no results', async () => {
    mockedAxios.get.mockResolvedValueOnce(emptyFeeLookup200Response);

    const actual = await getFee(mockLogger);

    expect(mockLogger.error).not.toHaveBeenCalled();
    expect(actual).toEqual(undefined);
  });

  it('returns an empty object with an invalid response', async () => {
    mockedAxios.get.mockRejectedValueOnce({ response: { data: invalidFeeLookup400Response } });

    const actual = await getFee(mockLogger);

    expect(mockLogger.error).toHaveBeenCalled();
    expect(actual).toEqual(undefined);
  });

  it('returns an empty object when the token is incorrect and logs the error', async () => {
    const mockResponse = { response: { status: 401, data: invalidFeeLookupKey401Response } };
    mockedAxios.get.mockRejectedValueOnce(mockResponse);

    const actual = await getFee(mockLogger);

    expect(mockLogger.error).toHaveBeenCalledWith('Fee lookup error occurred', mockResponse);
    expect(actual).toEqual(undefined);
  });

  it('returns an empty object when the request fails', async () => {
    mockedAxios.get.mockRejectedValueOnce({ code: 'ECONNABORTED' });

    const actual = await getFee(mockLogger);

    expect(mockLogger.error).toHaveBeenCalledWith('Fee lookup error occurred', { code: 'ECONNABORTED' });
    expect(actual).toEqual(undefined);
  });
});
