import 'jest-extended';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { ApplicationType, PaymentStatus, State } from '../../../../app/case/definition';
import { APPLICATION_SUBMITTED, CHECK_ANSWERS_URL, PAY_YOUR_FEE } from '../../../urls';

import PaymentCallbackGetController from './get';

jest.mock('../../../../app/payment/PaymentClient');

const { mockCreate, mockGet } = require('../../../../app/payment/PaymentClient');

describe('PaymentCallbackGetController', () => {
  const paymentController = new PaymentCallbackGetController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockGet.mockClear();
  });

  describe('callback', () => {
    it('saves and redirects to the submitted page if last payment was successful', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingPayment,
          payments: [
            {
              id: 'mock payment id',
              value: {
                amount: 55000,
                channel: 'mock payment provider',
                feeCode: 'FEE0002',
                reference: 'mock ref',
                status: PaymentStatus.IN_PROGRESS,
                transactionId: 'mock payment id',
              },
            },
          ],
        },
      });
      const res = mockResponse();

      (mockGet as jest.Mock).mockReturnValueOnce({
        payment_id: 'mock payment id',
        status: 'Success',
      });

      await paymentController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith('mock ref');

      expect(req.locals.api.addPayment).toHaveBeenCalledWith('1234', expect.any(Array));

      expect(res.redirect).toHaveBeenCalledWith(APPLICATION_SUBMITTED);
    });

    it('redirects to the home page if the state is not awaiting payment', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingDocuments,
        },
      });
      const res = mockResponse();

      await paymentController.get(req, res);

      expect(mockGet).not.toHaveBeenCalled();
      expect(req.locals.api.addPayment).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(CHECK_ANSWERS_URL);
    });

    it('redirects to the home page if there is no last payment', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingPayment,
        },
      });
      const res = mockResponse();

      await paymentController.get(req, res);

      expect(mockGet).not.toHaveBeenCalled();
      expect(req.locals.api.addPayment).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(CHECK_ANSWERS_URL);
    });

    it('saves and redirects to the pay your fee page if last payment was unsuccessful', async () => {
      const userCase = {
        state: State.AwaitingPayment,
        applicationType: ApplicationType.SOLE_APPLICATION,
        payments: [
          {
            id: 'mock payment id',
            value: {
              amount: 55000,
              channel: 'mock payment provider',
              created: '1999-12-31T20:01:00.123',
              feeCode: 'FEE0002',
              reference: 'mock ref',
              status: PaymentStatus.IN_PROGRESS,
              transactionId: 'mock payment id',
            },
          },
        ],
      };
      const req = mockRequest({
        userCase,
      });
      req.locals.api.addPayment = jest.fn().mockReturnValue(userCase);
      const res = mockResponse();

      (mockGet as jest.Mock).mockReturnValueOnce({
        payment_id: 'mock payment id',
        status: 'Failed',
      });

      await paymentController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith('mock ref');

      expect(req.locals.api.addPayment).toHaveBeenCalledWith('1234', expect.any(Array));

      expect(res.redirect).toHaveBeenCalledWith(PAY_YOUR_FEE);
    });
  });
});
