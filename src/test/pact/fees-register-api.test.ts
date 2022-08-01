/* import config from 'config';
import { when } from 'jest-when';
import type { LoggerInstance } from 'winston';

import { getFee } from '../../main/app/fee/fee-lookup-api';

const { Matchers } = require('@pact-foundation/pact');
const { pactWith } = require('jest-pact');
const { somethingLike, like } = Matchers;

pactWith(
  {
    consumer: 'adoption-web',
    provider: 'feeRegister_lookUp',
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
        body: {
          code: somethingLike('FEE0310'),
          description: like('Adoption application fee'),
          version: like(2),
          fee_amount: like(183.0),
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
          query:
            'application_type=all&channel=default&event=issue&jurisdiction1=family&jurisdiction2=family+court&keyword=ApplyAdoption&service=adoption',
        },
      };

      beforeEach(() => {
        config.get = jest.fn();
        when(config.get)
          .calledWith('services.feeLookup.url')
          .mockReturnValue(`${provider.mockService.baseUrl}/fees-register/fees/lookup`);

        const interaction = {
          state: 'service is registered in Fee registry',
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
 */
