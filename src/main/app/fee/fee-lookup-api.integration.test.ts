import config from 'config';
import { when } from 'jest-when';
import nock from 'nock';
import { LoggerInstance } from 'winston';

import {
  invalidFeeLookup400Response,
  invalidFeeLookupKey401Response,
  validFeeLookup200Response,
} from '../../../test/unit/utils/mockFeeLookupResponses';

import { getFee } from './fee-lookup-api';

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

  afterEach(() => {
    nock.cleanAll();
  });

  it('correctly returns fee lookup api success response', async () => {
    nock('http://fees-register-api')
      .get('/fees-register/fees/lookup')
      .query(true)
      .reply(200, validFeeLookup200Response.data);

    const actual = await getFee(mockLogger);

    expect(actual).toEqual({
      FeeAmount: '1234',
      FeeCode: 'MOCK_CODE',
      FeeDescription: 'MOCK_DESCRIPTION',
      FeeVersion: 'MOCK_VERSION',
    });
  });

  it('returns an empty object when there are no results', async () => {
    nock('http://fees-register-api').get('/fees-register/fees/lookup').query(true).reply(200, '');

    const actual = await getFee(mockLogger);

    expect(mockLogger.error).not.toHaveBeenCalled();
    expect(actual).toEqual(undefined);
  });

  it('returns an empty object with an invalid response', async () => {
    nock('http://fees-register-api')
      .get('/fees-register/fees/lookup')
      .query(true)
      .reply(400, invalidFeeLookup400Response);

    const actual = await getFee(mockLogger);

    expect(mockLogger.error).toHaveBeenCalled();
    expect(actual).toEqual(undefined);
  });

  it('returns an empty object when the token is incorrect and logs the error', async () => {
    nock('http://fees-register-api')
      .get('/fees-register/fees/lookup')
      .query(true)
      .reply(401, invalidFeeLookupKey401Response);

    const actual = await getFee(mockLogger);

    expect(mockLogger.error).toHaveBeenCalledWith('Fee lookup error occurred', expect.anything());
    expect(actual).toEqual(undefined);
  });

  it('returns an empty object when the request fails', async () => {
    nock('http://fees-register-api').get('/fees-register/fees/lookup').query(true).reply(500, 'Service unavailable');

    const actual = await getFee(mockLogger);

    expect(mockLogger.error).toHaveBeenCalledWith('Fee lookup error occurred', expect.anything());
    expect(actual).toEqual(undefined);
  });
});
