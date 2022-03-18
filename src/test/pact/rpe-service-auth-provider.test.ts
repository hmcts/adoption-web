import { getTokenFromApi } from '../../main/app/auth/service/get-service-auth-token';

const { pactWith } = require('jest-pact');

jest.mock('otplib', () => ({
  authenticator: {
    generate: jest.fn(() => '123456'),
  },
}));

pactWith(
  {
    consumer: 'adoption-web',
    provider: 'rpe-service-auth-provider',
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
        const interaction = {
          state: 'i request a service auth token',
          ...serviceAuthTokenRequest,
          willRespondWith: successResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns a service auth token', async () => {
        const token = await getTokenFromApi(provider.mockService.baseUrl);
        expect(token).toEqual(EXPECTED_RESPONSE);
      });
    });
  }
);
