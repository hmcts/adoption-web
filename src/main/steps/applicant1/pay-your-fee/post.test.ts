import 'jest-extended';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CITIZEN_SUBMIT, PaymentStatus, State } from '../../../app/case/definition';
import { PAYMENT_CALLBACK_URL, SAVE_AND_SIGN_OUT } from '../../urls';

import PaymentPostController from './post';

jest.mock('../../../app/payment/PaymentClient');

const { mockCreate, mockGet } = require('../../../app/payment/PaymentClient');

describe('PaymentPostController', () => {
  const paymentController = new PaymentPostController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockGet.mockClear();
  });

  describe('payment', () => {
    it('creates a new payment and redirects to payment URL', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingPayment,
          applicationFeeOrderSummary: {
            Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
          },
          payments: [
            {
              id: 'timed out payment',
              value: {
                status: PaymentStatus.IN_PROGRESS,
                reference: 'ref',
              },
            },
          ],
        },
      });
      const res = mockResponse();

      (req.locals.api.addPayment as jest.Mock).mockReturnValueOnce({
        payments: [{ new: 'payment' }],
        applicationFeeOrderSummary: {
          Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
        },
      });

      (mockCreate as jest.Mock).mockReturnValueOnce({
        date_created: '1999-12-31T23:59:59.999Z',
        reference: 'mock ref',
        external_reference: 'mock external reference payment id',
        _links: { next_url: { href: 'http://example.com/pay' } },
      });

      await paymentController.post(req, res);
      expect(req.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/payment-callback');
    });

    it('transitions the case to awaiting payment if the state is draft', async () => {
      const req = mockRequest();
      const res = mockResponse();

      (req.locals.api.triggerEvent as jest.Mock).mockReturnValueOnce({
        state: State.AwaitingPayment,
        applicationFeeOrderSummary: {
          Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
        },
      });

      (mockCreate as jest.Mock).mockReturnValueOnce({
        date_created: '1999-12-31T23:59:59.999Z',
        reference: 'mock ref',
        external_reference: 'mock external reference payment id',
        _links: { next_url: { href: 'http://example.com/pay' } },
      });

      await paymentController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_SUBMIT);
    });

    it('redirects to the check your answers page if last payment is in progress', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingPayment,
          payments: [
            {
              id: 'mock external reference payment id',
              value: {
                amount: 123,
                channel: 'HMCTS Pay',
                create: '1999-12-31T20:00:01.123',
                feeCode: 'mock fee code',
                reference: 'mock ref',
                siteId: 'AA00',
                status: 'inProgress',
                transactionId: 'mock external reference payment id',
              },
            },
          ],
        },
      });
      const res = mockResponse();

      await paymentController.post(req, res);

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(req.locals.api.addPayment).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(PAYMENT_CALLBACK_URL);
    });

    it('saves and signs out', async () => {
      const req = mockRequest();
      req.body['saveAndSignOut'] = true;
      const res = mockResponse();

      await paymentController.post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
    });
  });
});
