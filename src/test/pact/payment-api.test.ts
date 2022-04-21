jest.mock('../../main/app/auth/service/get-service-auth-token', () => ({
  getServiceAuthToken: jest.fn(() => 'mock-service-auth-token'),
}));

import config from 'config';
import { when } from 'jest-when';

import { PaymentClient } from '../../main/app/payment/PaymentClient';
import { mockRequest } from '../unit/utils/mockRequest';

const { pactWith } = require('jest-pact');

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
        account_number: '1234',
        amount: 183,
        case_reference: '123456',
        ccd_case_number: '123456',
        channel: 'online',
        currency: 'GBP',
        customer_reference: '1234-5678-9012',
        date_created: 'today',
        date_updated: 'today',
        description: 'Adoption application fee',
        external_provider: 'external_provider',
        external_reference: 'external_reference',
        fees: [
          {
            calculated_amount: 183,
            ccd_case_number: '123456',
            code: 'FEE0310',
            description: 'Adoption application fee',
            id: '1234',
            jurisdiction1: 'ADOPTION',
            jurisdiction2: '',
            memo_line: 'memo_line',
            natural_account_code: 'natural_account_code',
            net_amount: 183,
            reference: '1234-5678-9012',
            version: '2',
            volume: 1,
          },
        ],
        id: '1234-5678-9012',
        method: 'online-card',
        organisation_name: '',
        payment_group_reference: '',
        payment_reference: '1234-5678-9012',
        reference: '1234-5678-9012',
        reported_date_offline: '',
        service_name: 'Adoption',
        site_id: '',
        status: 'Initiated',
        status_histories: [],
      };

      const createPaymentSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: EXPECTED_RESPONSE,
      };

      const createPaymentRequest = {
        uponReceiving: 'a request for initiating a payment',
        withRequest: {
          method: 'POST',
          path: '/card-payments',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            'return-url': '/review-pay-submit/payment/payment-callback',
          },
          body: {
            case_type: 'A58',
            amount: 183,
            ccd_case_number: '1234',
            description: 'Apply for adoption',
            currency: 'GBP',
            fees: [{ calculated_amount: '183', code: 'FEE0310', version: '2' }],
            language: '',
          },
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'adoption-web makes initiate payment request',
          ...createPaymentRequest,
          willRespondWith: createPaymentSuccessResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns a successful response', async () => {
        const req = mockRequest({
          userCase: {
            id: '1234',
            applicationFeeOrderSummary: {
              Fees: [{ value: { FeeAmount: 183, FeeCode: 'FEE0310', FeeVersion: '2' } }],
            },
          },
          session: { lang: 'en' },
        });

        const client = new PaymentClient(req.session, '/review-pay-submit/payment/payment-callback');
        const payment = await client.create();
        expect(payment).toEqual(EXPECTED_RESPONSE);
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
        account_number: '1234',
        amount: 183,
        case_reference: '123456',
        ccd_case_number: '123456',
        channel: 'online',
        currency: 'GBP',
        customer_reference: '1234-5678-9012',
        date_created: 'today',
        date_updated: 'today',
        description: 'Adoption application fee',
        external_provider: 'external_provider',
        external_reference: 'external_reference',
        fees: [
          {
            calculated_amount: 183,
            ccd_case_number: '123456',
            code: 'FEE0310',
            description: 'Adoption application fee',
            id: '1234',
            jurisdiction1: 'ADOPTION',
            jurisdiction2: '',
            memo_line: 'memo_line',
            natural_account_code: 'natural_account_code',
            net_amount: 183,
            reference: '1234-5678-9012',
            version: '2',
            volume: 1,
          },
        ],
        id: '1234-5678-9012',
        method: 'online-card',
        organisation_name: '',
        payment_group_reference: '',
        payment_reference: '1234-5678-9012',
        reference: '1234-5678-9012',
        reported_date_offline: '',
        service_name: 'Adoption',
        site_id: '',
        status: 'Success',
        status_histories: [],
      };

      const getPaymentSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: EXPECTED_RESPONSE,
      };

      const getPaymentRequest = {
        uponReceiving: 'a request to get payment by reference',
        withRequest: {
          method: 'GET',
          path: '/card-payments/1234-5678-9012',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            'return-url': '/review-pay-submit/payment/payment-callback',
          },
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'adoption-web request a payment details by payment-reference',
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
        const payment = await client.get('1234-5678-9012');
        expect(payment).toEqual(EXPECTED_RESPONSE);
      });
    });
  }
);
