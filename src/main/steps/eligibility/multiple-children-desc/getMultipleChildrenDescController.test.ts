const mockGetFee = jest.fn();
jest.mock('../../../app/fee/fee-lookup-api', () => ({
  getFee: mockGetFee,
}));

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import GetMultipleChildrenDescController from './getMultipleChildrenDescController';
import { generateContent } from './content';

describe('GetMultipleChildrenDescController', () => {
  const controller = new GetMultipleChildrenDescController(__dirname + './template', generateContent);
  let req = mockRequest({ userCase: {} });
  const res = mockResponse();

  afterEach(() => {
    mockGetFee.mockClear();
  });

  it('should call the fee lookup api', async () => {
    req = mockRequest({ userCase: {} });
    mockGetFee.mockResolvedValue({ FeeAmount: '4321' });
    await controller.get(req, res);
    expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger);
  });

  it('should save the fee response in session', async () => {
    req = mockRequest({ userCase: {} });
    mockGetFee.mockResolvedValue({
      FeeCode: 'MOCK_CODE',
      FeeDescription: 'MOCK_DESCRIPTION',
      FeeVersion: 'MOCK_VERSION',
      FeeAmount: 'MOCK_AMOUNT',
    });
    await controller.get(req, res);
    expect(req.session.fee).toEqual({
      FeeCode: 'MOCK_CODE',
      FeeDescription: 'MOCK_DESCRIPTION',
      FeeVersion: 'MOCK_VERSION',
      FeeAmount: 'MOCK_AMOUNT',
    });
  });

  it('should throw error when feel lookup api fails', async () => {
    req = mockRequest({ userCase: {} });
    mockGetFee.mockReturnValue(undefined);
    try {
      await controller.get(req, res);
    } catch (err) {
      /* eslint-disable jest/no-conditional-expect */
      expect(err).toEqual(new Error('GetMultipleChildrenDescController unable to get fee from fee-register API'));
      expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger);
      /* eslint-enable jest/no-conditional-expect */
    }
  });
});
