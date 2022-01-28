const mockGetFee = jest.fn();
jest.mock('../../../../app/fee/fee-lookup-api', () => ({
  getFee: mockGetFee,
}));

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { generateContent } from './content';
import FeeGetController from './get';

describe('PayYourFeeGetController', () => {
  const controller = new FeeGetController(__dirname + './template', generateContent);
  let req = mockRequest();
  const res = mockResponse();

  describe('when there is no fee object in session', () => {
    it('shoul call the fee lookup api', async () => {
      mockGetFee.mockResolvedValue({ feeAmount: 'MOCK_FEE_AMOUNT' });
      await controller.get(req, res);
      expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger);
      expect(req.session.fee).toEqual({ feeAmount: 'MOCK_FEE_AMOUNT' });
    });
  });

  describe('when there is a fee object in session', () => {
    it('shoul not call the fee lookup api', async () => {
      req = mockRequest({
        session: {
          fee: {
            feeAmount: 'MOCK_AMOUNT',
            feeCode: 'MOCK_CODE',
            feeDescription: 'MOCK_DESCRIPTION',
            feeVersion: 'MOCK_VERSION',
          },
        },
      });
      await controller.get(req, res);
      expect(mockGetFee).not.toHaveBeenCalledWith(req.locals.logger);
      expect(req.session.fee).toEqual({
        feeAmount: 'MOCK_AMOUNT',
        feeCode: 'MOCK_CODE',
        feeDescription: 'MOCK_DESCRIPTION',
        feeVersion: 'MOCK_VERSION',
      });
    });
  });

  describe('when there is an error in destroying session', () => {
    test('Should throw an error', async () => {
      req = mockRequest({
        session: {
          user: { email: 'test@example.com' },
          save: jest.fn(done => done('MOCK_ERROR')),
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
