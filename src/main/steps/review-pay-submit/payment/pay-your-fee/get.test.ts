const v4Mock = jest.fn().mockReturnValue('MOCK_V4_UUID');
jest.mock('uuid', () => ({
  v4: v4Mock,
}));

const mockGetFee = jest.fn();
jest.mock('../../../../app/fee/fee-lookup-api', () => ({
  getFee: mockGetFee,
}));

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { generateContent } from '../../statement-of-truth/content';

import FeeGetController from './get';

describe('PayYourFeeGetController', () => {
  const controller = new FeeGetController(__dirname + './template', generateContent);
  let req = mockRequest({ userCase: {} });
  const res = mockResponse();

  afterEach(() => {
    mockGetFee.mockClear();
  });

  describe('when there is no applicationFeeOrderSummary object in userCase', () => {
    it('shoul call the fee lookup api', async () => {
      mockGetFee.mockResolvedValue({ FeeAmount: '4321' });
      await controller.get(req, res);
      expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger);
      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          applicationFeeOrderSummary: {
            Fees: [{ id: 'MOCK_V4_UUID', value: { FeeAmount: '4321' } }],
            PaymentReference: '',
            PaymentTotal: '4321',
          },
        },
        'citizen-update-application'
      );
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
        expect(req.locals.api.triggerEvent).not.toHaveBeenCalledWith();
        /* eslint-enable jest/no-conditional-expect */
      }
    });
  });

  // describe('when there is a applicationFeeOrderSummary object in userCase', () => {
  //   it('shoul not call the fee lookup api', async () => {
  //     req = mockRequest({
  //       userCase: {
  //         applicationFeeOrderSummary: { PaymentTotal: '100' },
  //       },
  //     });
  //     await controller.get(req, res);
  //     expect(mockGetFee).not.toHaveBeenCalled();
  //     expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
  //     expect(req.session.userCase.applicationFeeOrderSummary).toEqual({ PaymentTotal: '100' });
  //   });
  // });

  describe('when there is an error in destroying session', () => {
    test('Should throw an error', async () => {
      mockGetFee.mockResolvedValue({ FeeAmount: '4321' });
      req = mockRequest({
        session: {
          user: { email: 'test@example.com' },
          save: jest.fn(done => done('MOCK_ERROR')),
          userCase: {},
        },
      });
      try {
        await controller.get(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBe('MOCK_ERROR');
      }
    });
  });
});
