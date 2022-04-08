import config from 'config';
import { when } from 'jest-when';

import { getTokenFromApi } from '../../main/app/auth/service/get-service-auth-token';

const { pactWith } = require('jest-pact');

jest.mock('otplib', () => ({
  authenticator: {
    generate: jest.fn(() => '123456'),
  },
}));

config.get = jest.fn();

pactWith(
  {
    consumer: 'adoption-web',
    provider: 's2s_auth',
    logLevel: 'DEBUG',
  },
  provider => {
    describe('rpe-service-auth-provider API', () => {
      const EXPECTED_RESPONSE = 'MOCK_TOKEN';

      const successResponse = {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: EXPECTED_RESPONSE,
      };

      const serviceAuthTokenRequest = {
        uponReceiving: 'a request for service auth token',
        withRequest: {
          method: 'POST',
          path: '/lease',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
          },
          body: {
            microservice: 'adoption_web',
            oneTimePassword: '123456',
          },
        },
      };

      beforeEach(() => {
        when(config.get)
          .calledWith('services.authProvider.url')
          .mockReturnValue(provider.mockService.baseUrl)
          .calledWith('services.authProvider.microservice')
          .mockReturnValue('adoption_web')
          .calledWith('services.authProvider.secret')
          .mockReturnValue('mock-secret');

        const interaction = {
          state: 'i request a service auth token',
          ...serviceAuthTokenRequest,
          willRespondWith: successResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns a service auth token', async () => {
        const token = await getTokenFromApi();
        expect(token).toEqual(EXPECTED_RESPONSE);
      });
    });
  }
);
