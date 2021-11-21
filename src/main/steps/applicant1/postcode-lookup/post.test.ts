import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { getAddressesFromPostcode } from '../../../app/postcode/postcode-lookup';

import { PostcodeLookupPostController } from './post';

jest.mock('../../../app/postcode/postcode-lookup');

const mockGetAddressesFromPostcode = getAddressesFromPostcode as jest.Mocked<jest.Mock>;

describe('PostcodeLookupPostController', () => {
  afterEach(() => {
    mockGetAddressesFromPostcode.mockClear();
  });

  it('calls getAddressesFromPostcode and returns json', async () => {
    const postcodeLookupPostController = new PostcodeLookupPostController();

    const mockReq = mockRequest({ body: { postcode: 'TEST POSTCODE' } });
    const mockRes = mockResponse();
    mockGetAddressesFromPostcode.mockResolvedValueOnce(['MOCK ADDRESS']);

    await postcodeLookupPostController.post(mockReq, mockRes);

    expect(mockGetAddressesFromPostcode).toBeCalledWith('TEST POSTCODE', mockReq.locals.logger);
    expect(mockRes.json).toBeCalledWith(['MOCK ADDRESS']);
  });

  it.each([
    { postcode: 'ZZ00 0ZZ', expected: [] },
    { postcode: 'SW1H 9AJ', expected: [{ street1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE' }] },
    { postcode: 'SW1A 1AA', expected: [{ street1: 'BUCKINGHAM PALACE' }] },
  ])('returns a mock postcode %o', async ({ postcode, expected }) => {
    const postcodeLookupPostController = new PostcodeLookupPostController();

    const mockReq = mockRequest({ body: { postcode } });
    const mockRes = mockResponse();

    await postcodeLookupPostController.post(mockReq, mockRes);

    expect(mockGetAddressesFromPostcode).not.toHaveBeenCalled();
    expect((mockRes.json as jest.Mock).mock.calls[0][0]).toMatchObject(expected);
  });
});
