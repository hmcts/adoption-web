jest.mock('../../main/app/auth/service/get-service-auth-token', () => ({
  getServiceAuthToken: jest.fn(() => 'someServiceAuthorization'),
}));

import { PactV3 } from '@pact-foundation/pact';
import config from 'config';
import { when } from 'jest-when';

import { PaymentClient } from '../../main/app/payment/PaymentClient';
import { mockRequest } from '../unit/utils/mockRequest';

config.get = jest.fn();

jest.setTimeout(30000);

const pactOptions = {
  consumer: 'adoption-web',
  provider: 'payment_cardPayment',
  logLevel: 'debug' as const,
};

const PAYMENT_RESPONSE_BODY = {
  _links: {
    next_url: { href: 'next_url', method: 'GET' },
    self: { href: 'self', method: 'GET' },
    cancel: { href: 'cancel', method: 'GET' },
  },
  reference: 'RC-1519-9028-2432-0001',
  external_reference: 'e2kkddts5215h9qqoeuth5c0v',
  status: 'Initiated',
  date_created: '2020-12-11T15:40:40.079+0000',
};

describe('Pact between adoption-web and payment_cardPayment', () => {
  describe('create payment API', () => {
    it('returns a successful response', async () => {
      const provider = new PactV3(pactOptions);

      await provider
        .addInteraction({
          states: [{ description: 'A Payment is posted for a case' }],
          uponReceiving: 'a request to create a payment for a case',
          withRequest: {
            method: 'POST',
            path: '/card-payments',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer mock-user-access-token',
              ServiceAuthorization: 'someServiceAuthorization',
              'return-url': '/review-pay-submit/payment/payment-callback',
            },
            body: {
              case_type: 'A58',
              amount: 207,
              ccd_case_number: '1234567891011123',
              description: 'Apply for adoption',
              currency: 'GBP',
              fees: [{ calculated_amount: '207', code: 'FEE0310', version: '5' }],
              language: '',
            },
          },
          willRespondWith: {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
            body: PAYMENT_RESPONSE_BODY,
          },
        })
        .executeTest(async mockServer => {
          when(config.get).calledWith('services.payments.url').mockReturnValue(mockServer.url);

          const req = mockRequest({
            userCase: {
              id: '1234567891011123',
              applicationFeeOrderSummary: {
                Fees: [{ value: { FeeAmount: 207, FeeCode: 'FEE0310', FeeVersion: '5' } }],
              },
            },
            session: { lang: 'en' },
          });

          const client = new PaymentClient(req.session, '/review-pay-submit/payment/payment-callback');
          await client.create();
        });
    });
  });

  describe('get payment API', () => {
    it('returns a successful payment details', async () => {
      const provider = new PactV3(pactOptions);

      await provider
        .addInteraction({
          states: [{ description: 'A payment reference exists' }],
          uponReceiving: 'a request for information for that payment reference',
          withRequest: {
            method: 'GET',
            path: '/card-payments/654321ABC',
            headers: {
              Authorization: 'Bearer mock-user-access-token',
              ServiceAuthorization: 'someServiceAuthorization',
              'return-url': '/review-pay-submit/payment/payment-callback',
            },
          },
          willRespondWith: {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: PAYMENT_RESPONSE_BODY,
          },
        })
        .executeTest(async mockServer => {
          when(config.get).calledWith('services.payments.url').mockReturnValue(mockServer.url);

          const req = mockRequest({
            userCase: {
              id: '1234',
              applicationFeeOrderSummary: {
                Fees: [{ value: { FeeAmount: 1234, FeeCode: 'FEE0310', FeeVersion: '3' } }],
              },
            },
          });

          const client = new PaymentClient(req.session, '/review-pay-submit/payment/payment-callback');
          await client.get('654321ABC', 'case-ref');
        });
    });
  });
});
