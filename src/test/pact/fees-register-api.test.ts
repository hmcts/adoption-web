import config from 'config';
import { when } from 'jest-when';
import type { LoggerInstance } from 'winston';

import { getFee } from '../../main/app/fee/fee-lookup-api';

const { pactWith } = require('jest-pact');

pactWith(
  {
    consumer: 'adoption-web',
    provider: 'fees-register',
    logLevel: 'DEBUG',
  },
  provider => {
    describe('fees-register API', () => {
      const EXPECTED_RESPONSE = {
        FeeCode: 'FEE0310',
        FeeDescription: 'Adoption application fee',
        FeeVersion: '2',
        FeeAmount: '183',
      };

      const successResponse = {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: { code: 'FEE0310', description: 'Adoption application fee', version: '2', fee_amount: '183' },
      };

      const feeLookupRequest = {
        uponReceiving: 'a request for adoption application fee',
        withRequest: {
          method: 'GET',
          path: '/fees-register/fees/lookup',
          headers: {
            accept: 'application/json',
          },
          params: {
            application_type: 'all',
            channel: 'default',
            event: 'issue',
            jurisdiction1: 'family',
            jurisdiction2: 'family court',
            keyword: 'ApplyAdoption',
            service: 'adoption',
          },
        },
      };

      beforeEach(() => {
        config.get = jest.fn();
        when(config.get)
          .calledWith('services.feeLookup.url')
          .mockReturnValue(`${provider.mockService.baseUrl}/fees-register/fees/lookup`);

        const interaction = {
          state: 'adoption-web request a fee-register',
          ...feeLookupRequest,
          willRespondWith: successResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns an adoption application fee', async () => {
        const { Logger } = require('@hmcts/nodejs-logging');
        const logger: LoggerInstance = Logger.getLogger('server');

        const feeResponse = await getFee(logger);
        expect(feeResponse).toEqual(EXPECTED_RESPONSE);
      });
    });
  }
);
