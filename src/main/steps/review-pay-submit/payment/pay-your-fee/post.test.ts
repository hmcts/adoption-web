import 'jest-extended';
const mockGetParsedBody = jest.fn();
const mockGetErrors = jest.fn();
jest.mock('../../../../app/form/Form', () => {
  return {
    Form: jest.fn().mockImplementation(() => {
      return { getParsedBody: mockGetParsedBody, getErrors: mockGetErrors };
    }),
  };
});

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { PaymentStatus, State } from '../../../../app/case/definition';
import { PAYMENT_CALLBACK_URL } from '../../../urls';

import PaymentPostController from './post';

jest.mock('../../../../app/payment/PaymentClient');

const { mockCreate, mockGet } = require('../../../../app/payment/PaymentClient');

describe('PayYourFeePostController', () => {
  const paymentController = new PaymentPostController({});

  beforeEach(() => {
    mockGetParsedBody.mockReturnValue({});
    mockGetErrors.mockReturnValue([]);
  });

  afterEach(() => {
    mockCreate.mockClear();
    mockGet.mockClear();
  });

  it('redirects to same page with errors if fee object is not present in session', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await paymentController.post(req, res);
    expect(req.session.errors).toEqual([
      {
        errorType: 'errorRetrievingFee',
        propertyName: 'paymentType',
      },
    ]);
    expect(mockCreate).not.toHaveBeenCalled();
    expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
    expect(req.locals.api.addPayment).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/request');
  });

  it('redirects to same page with errors if there are form errors', async () => {
    mockGetErrors.mockReturnValue([
      {
        errorType: 'MOCK_ERROR_TYPE',
        propertyName: 'MOCK_PROPERTY_NAME',
      },
    ]);
    const req = mockRequest({ session: { fee: {} } });
    const res = mockResponse();
    await paymentController.post(req, res);
    expect(req.session.errors).toEqual([
      {
        errorType: 'MOCK_ERROR_TYPE',
        propertyName: 'MOCK_PROPERTY_NAME',
      },
    ]);
    expect(mockCreate).not.toHaveBeenCalled();
    expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
    expect(req.locals.api.addPayment).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/request');
  });

  it('creates a new payment and redirects to payment URL', async () => {
    const req = mockRequest({
      session: { fee: {} },
      userCase: {
        state: State.AwaitingPayment,
        applicationFeeOrderSummary: {
          Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
        },
        payments: [],
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
    expect(mockCreate).toHaveBeenCalled();
    //TODO uncomment this once CCD payment event is done
    // expect(req.locals.api.triggerEvent).toHaveBeenCalled();
    // expect(req.locals.api.addPayment).toHaveBeenCalled();
    expect(req.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('http://example.com/pay');
  });

  it('transitions the case to awaiting payment if the state is draft', async () => {
    const req = mockRequest({ session: { fee: {} } });
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

    //TODO uncomment this once CCD payment event is done
    //expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_SUBMIT);
    expect(res.redirect).toHaveBeenCalledWith('http://example.com/pay');
  });

  it('redirects to the PAYMENT_CALLBACK_URL if last payment is in progress', async () => {
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
              status: PaymentStatus.IN_PROGRESS,
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

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
      const req = mockRequest({
        session: {
          save: jest.fn(done => done('MOCK_ERROR')),
        },
      });
      const res = mockResponse();
      try {
        await paymentController.post(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBe('MOCK_ERROR');
      }
    });
  });

  describe('when req.app.locals.developmentMode is set', () => {
    it('creates correct return url', async () => {
      const req = mockRequest({
        appLocals: { developmentMode: true },
        session: { fee: {} },
        userCase: {
          state: State.AwaitingPayment,
          applicationFeeOrderSummary: {
            Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
          },
          payments: [],
        },
      });
      const res = mockResponse();

      (mockCreate as jest.Mock).mockReturnValueOnce({
        date_created: '1999-12-31T23:59:59.999Z',
        reference: 'mock ref',
        external_reference: 'mock external reference payment id',
        _links: { next_url: { href: 'http://example.com/pay' } },
      });

      await paymentController.post(req, res);
      expect(mockCreate).toHaveBeenCalled();
      //TODO uncomment this once CCD payment event is done
      // expect(req.locals.api.triggerEvent).toHaveBeenCalled();
      // expect(req.locals.api.addPayment).toHaveBeenCalled();
      expect(req.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('http://example.com/pay');
    });
  });
});
