const mockGetFee = jest.fn();
jest.mock('../../../app/fee/fee-lookup-api', () => ({
  getFee: mockGetFee,
}));

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import EligibilityStartGetController from './EligibilityStartGetController';
import { generateContent } from './content';

describe('EligibilityStartGetController', () => {
  const controller = new EligibilityStartGetController(__dirname + './template', generateContent);
  let req = mockRequest({ userCase: {} });
  const res = mockResponse();

  afterEach(() => {
    mockGetFee.mockClear();
  });

  it('shoud call the fee lookup api', async () => {
    req = mockRequest({ userCase: {} });
    mockGetFee.mockResolvedValue({ FeeAmount: '4321' });
    await controller.get(req, res);
    expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger);
  });

  it('shoud save the fee response in session', async () => {
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
      expect(err).toEqual(new Error('Unable to get fee from fee-register API'));
      expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger);
      /* eslint-enable jest/no-conditional-expect */
    }
  });
});
