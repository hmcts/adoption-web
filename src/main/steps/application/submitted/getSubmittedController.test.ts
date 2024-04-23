const mockGetFee = jest.fn();
jest.mock('../../../app/fee/fee-lookup-api', () => ({
  getFee: mockGetFee,
}));

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Case } from '../../../app/case/case';
import { State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { TASK_LIST_URL } from '../../urls';

import GetSubmittedController from './getSubmittedController';

describe('GetSubmittedController', () => {
  const controller = new GetSubmittedController();
  const res = mockResponse();
  let req: AppRequest<Partial<Case>>;

  beforeEach(() => {
    req = mockRequest({
      session: { userCase: { state: State.Submitted }, user: { email: 'test@example.com' } },
    });
  });

  afterEach(() => {
    mockGetFee.mockClear();
  });

  it('returns user to task list when state is not Submitted', async () => {
    req.session.userCase.state = State.AwaitingDocuments;
    controller.get(req, res);
    expect(res.redirect).toHaveBeenCalledWith(TASK_LIST_URL);
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
      expect(err).toEqual(new Error('GetSubmittedController unable to get fee from fee-register API'));
      expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger);
      /* eslint-enable jest/no-conditional-expect */
    }
  });
});
