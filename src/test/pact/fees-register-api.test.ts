import { MatchersV2 } from '@pact-foundation/pact';
import type { InteractionObject } from '@pact-foundation/pact/src/dsl/interaction';
import config from 'config';
import { pactWith } from 'jest-pact';
import { when } from 'jest-when';
import type { LoggerInstance } from 'winston';

import { getFee } from '../../main/app/fee/fee-lookup-api';

const { like } = MatchersV2;

pactWith(
  {
    consumer: 'adoption-web',
    provider: 'feeRegister_lookUp',
    logLevel: 'debug',
  },
  provider => {
    describe('fees-register API', () => {
      const EXPECTED_RESPONSE = {
        FeeCode: 'FEE0310',
        FeeDescription: 'Adoption application fee',
        FeeVersion: '5',
        FeeAmount: '207',
      };

      const successResponse = {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: {
          code: like('FEE0310'),
          description: like('Adoption application fee'),
          version: like(5),
          fee_amount: like(207.0),
        },
      };

      const feeLookupRequest = {
        uponReceiving: 'a request to GET a fee',
        withRequest: {
          method: 'GET',
          path: '/fees-register/fees/lookup',
          headers: {
            accept: 'application/json',
          },
          query: {
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
          .mockReturnValue(`http://127.0.0.1:${provider.opts.port}/fees-register/fees/lookup`);

        return provider.addInteraction({
          state: 'service is registered in Fee registry',
          ...feeLookupRequest,
          willRespondWith: successResponse,
        } as unknown as InteractionObject);
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
