import nock from 'nock';
import { LoggerInstance } from 'winston';

import {
  emptyPostcode200Response,
  invalidPostcode400Response,
  invalidPostcodeKey401Response,
  validPostcode200Response,
} from '../../../test/unit/utils/mockPostcodeResponses';

import { getAddressesFromPostcode } from './postcode-lookup-api';

describe('Postcode Lookup', () => {
  let mockLogger: LoggerInstance;

  beforeEach(() => {
    mockLogger = {
      error: jest.fn().mockImplementation((message: string) => message),
    } as unknown as LoggerInstance;
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('correctly returns an array of a addresses from a given postcode', async () => {
    nock('https://api.os.uk')
      .get('/search/places/v1/postcode')
      .query(true)
      .reply(200, validPostcode200Response);

    const actual = await getAddressesFromPostcode('AB1 2CD', mockLogger);

    expect(actual).toEqual([
      {
        fullAddress: 'BUCKINGHAM PALACE, LONDON, SW1A 1AA',
        street1: 'BUCKINGHAM PALACE',
        street2: '',
        town: 'LONDON',
        county: 'CITY OF WESTMINSTER',
        postcode: 'SW1A 1AA',
      },
      {
        fullAddress: 'THE STATE APARTMENTS, KENSINGTON PALACE, PALACE GREEN, LONDON, W1 2AB',
        street1: 'THE STATE APARTMENTS, KENSINGTON PALACE, PALACE GREEN',
        street2: '',
        town: 'LONDON',
        county: 'KENSINGTON AND CHELSEA',
        postcode: 'W1 2AB',
      },
      {
        fullAddress: '1, KENSINGTON PALACE GARDENS, LONDON, W1 2AB',
        street1: '1 KENSINGTON PALACE GARDENS',
        street2: '',
        town: 'LONDON',
        county: 'KENSINGTON AND CHELSEA',
        postcode: 'W1 2AB',
      },
      {
        fullAddress: '12345A, CHURCH ROAD, LITTLE BERKHAMSTED, HERTFORD, SG12 3AB',
        street1: '12345A, CHURCH ROAD',
        street2: 'LITTLE BERKHAMSTED',
        town: 'HERTFORD',
        county: 'EAST HERTFORDSHIRE',
        postcode: 'SG12 3AB',
      },
      {
        fullAddress: 'COMPANY LTD, UNIT 1234, SHINGLE HALL, TRIMMS GREEN, SAWBRIDGEWORTH, CM12 3AB',
        street1: 'COMPANY LTD, UNIT 1234, SHINGLE HALL',
        street2: 'TRIMMS GREEN',
        town: 'SAWBRIDGEWORTH',
        county: 'EAST HERTFORDSHIRE',
        postcode: 'CM12 3AB',
      },
      {
        fullAddress: 'BUILDING NAME, GREAT WOOD, THE RIDGEWAY, NORTHAW, POTTERS BAR, EN1 2AB',
        street1: 'BUILDING NAME, THE RIDGEWAY',
        street2: 'GREAT WOOD, NORTHAW, SNOWFIELD',
        town: 'POTTERS BAR',
        county: '',
        postcode: 'EN1 2AB',
      },
    ]);
  });

  it('returns an empty array when there are no results', async () => {
    nock('https://api.os.uk').get('/search/places/v1/postcode').query(true).reply(200, emptyPostcode200Response);

    const actual = await getAddressesFromPostcode('AB1 2CD', mockLogger);

    expect(mockLogger.error).not.toHaveBeenCalled();
    expect(actual).toEqual([]);
  });

  it('returns an empty array when there is missing data results', async () => {
    nock('https://api.os.uk').get('/search/places/v1/postcode').query(true).reply(200, '200 OK');

    const actual = await getAddressesFromPostcode('AB1 2CD', mockLogger);

    expect(mockLogger.error).not.toHaveBeenCalled();
    expect(actual).toEqual([]);
  });

  it('returns an empty array with an invalid postcode', async () => {
    nock('https://api.os.uk').get('/search/places/v1/postcode').query(true).reply(400, invalidPostcode400Response);

    const actual = await getAddressesFromPostcode('AB1 2CD', mockLogger);

    expect(mockLogger.error).not.toHaveBeenCalled();
    expect(actual).toEqual([]);
  });

  it('returns an empty array when the token is incorrect and logs the error', async () => {
    nock('https://api.os.uk').get('/search/places/v1/postcode').query(true).reply(401, invalidPostcodeKey401Response);

    const actual = await getAddressesFromPostcode('AB1 2CD', mockLogger);

    expect(mockLogger.error).toHaveBeenCalledWith('Postcode lookup key is invalid', expect.anything());
    expect(actual).toEqual([]);
  });

  it('returns an empty array when the request fails', async () => {
    nock('https://api.os.uk').get('/search/places/v1/postcode').query(true).reply(500, 'Service unavailable');

    const actual = await getAddressesFromPostcode('AB1 2CD', mockLogger);

    expect(mockLogger.error).toHaveBeenCalledWith('Postcode lookup service error', expect.anything());
    expect(actual).toEqual([]);
  });
});
