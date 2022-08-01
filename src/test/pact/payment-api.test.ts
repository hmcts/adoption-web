/* jest.mock('../../main/app/auth/service/get-service-auth-token', () => ({
  getServiceAuthToken: jest.fn(() => 'someServiceAuthorization'),
}));

import config from 'config';
import { when } from 'jest-when';

import { PaymentClient } from '../../main/app/payment/PaymentClient';
import { mockRequest } from '../unit/utils/mockRequest';

const { Matchers } = require('@pact-foundation/pact');
const { pactWith } = require('jest-pact');
const { like } = Matchers;

config.get = jest.fn();

pactWith(
  {
    consumer: 'adoption-web',
    provider: 'payment_cardPayment',
    logLevel: 'DEBUG',
  },
  provider => {
    beforeEach(() => {
      when(config.get).calledWith('services.payments.url').mockReturnValue(provider.mockService.baseUrl);
    });

    describe('create payment API', () => {
      const EXPECTED_RESPONSE = {
        _links: {
          next_url: {
            href: 'next_url',
            method: 'GET',
          },
          self: {
            href: 'self',
            method: 'GET',
          },
          cancel: {
            href: 'cancel',
            method: 'GET',
          },
        },
        reference: like('RC-1519-9028-2432-0001'),
        external_reference: like('e2kkddts5215h9qqoeuth5c0v'),
        status: like('Initiated'),
        date_created: like('2020-12-11T15:40:40.079+0000'),
      };

      const createPaymentSuccessResponse = {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
        body: EXPECTED_RESPONSE,
      };

      const createPaymentRequest = {
        uponReceiving: ' a request to create a payment for a case',
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
            amount: 183,
            ccd_case_number: '1234567891011123',
            description: 'Apply for adoption',
            currency: 'GBP',
            fees: [{ calculated_amount: '183', code: 'FEE0310', version: '2' }],
            language: '',
          },
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'A Payment is posted for a case',
          ...createPaymentRequest,
          willRespondWith: createPaymentSuccessResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns a successful response', async () => {
        const req = mockRequest({
          userCase: {
            id: '1234567891011123',
            applicationFeeOrderSummary: {
              Fees: [{ value: { FeeAmount: 183, FeeCode: 'FEE0310', FeeVersion: '2' } }],
            },
          },
          session: { lang: 'en' },
        });

        const client = new PaymentClient(req.session, '/review-pay-submit/payment/payment-callback');
        await client.create();
        provider.verify();
      });
    });

    describe('get payment API', () => {
      const EXPECTED_RESPONSE = {
        _links: {
          next_url: {
            href: 'next_url',
            method: 'GET',
          },
          self: {
            href: 'self',
            method: 'GET',
          },
          cancel: {
            href: 'cancel',
            method: 'GET',
          },
        },
        reference: like('RC-1519-9028-2432-0001'),
        external_reference: like('e2kkddts5215h9qqoeuth5c0v'),
        status: like('Initiated'),
        date_created: like('2020-12-11T15:40:40.079+0000'),
      };

      const getPaymentSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: EXPECTED_RESPONSE,
      };

      const getPaymentRequest = {
        uponReceiving: ' a request for information for that payment reference ',
        withRequest: {
          method: 'GET',
          path: '/card-payments/654321ABC',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'someServiceAuthorization',
            'return-url': '/review-pay-submit/payment/payment-callback',
          },
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'A payment reference exists',
          ...getPaymentRequest,
          willRespondWith: getPaymentSuccessResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns a successful payment details', async () => {
        const req = mockRequest({
          userCase: {
            id: '1234',
            applicationFeeOrderSummary: {
              Fees: [{ value: { FeeAmount: 1234, FeeCode: 'FEE0310', FeeVersion: '2' } }],
            },
          },
        });

        const client = new PaymentClient(req.session, '/review-pay-submit/payment/payment-callback');
        await client.get('654321ABC');
        provider.verify();
      });
    });
  }
);
 */
