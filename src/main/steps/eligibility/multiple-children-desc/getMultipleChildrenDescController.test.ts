const mockGetFee = jest.fn();
jest.mock('../../../app/fee/fee-lookup-api', () => ({
  getFee: mockGetFee,
}));

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Case } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';

import { generateContent } from './content';
import GetMultipleChildrenDescController from './getMultipleChildrenDescController';

describe('GetMultipleChildrenDescController', () => {
  const controller = new GetMultipleChildrenDescController(__dirname + './template', generateContent);
  let req: AppRequest<Partial<Case>>;
  const res = mockResponse();

  beforeEach(() => {
    req = mockRequest({ userCase: {} });
  });

  afterEach(() => {
    mockGetFee.mockClear();
  });

  it('should call the fee lookup api', async () => {
    mockGetFee.mockResolvedValue({ FeeAmount: 'a fee amount' });
    await controller.get(req, res);
    expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger);
  });

  it('should save the fee response in session', async () => {
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
