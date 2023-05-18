const jwtDecodeMock = jest.fn().mockReturnValue({
  sub: 'citizen.automation@mailinator.com',
  family_name: 'automation',
  given_name: 'citizen',
  uid: '267491aa-b696-4235-83a6-3b9253709798',
});
jest.mock('jwt-decode', () => ({
  __esModule: true,
  default: jwtDecodeMock,
}));

import config from 'config';
import { when } from 'jest-when';

import { getSystemUser } from '../../main/app/auth/user/oidc';

const { Matchers } = require('@pact-foundation/pact');
const { pactWith } = require('jest-pact');
const { like } = Matchers;

pactWith(
  {
    consumer: 'adoption-web',
    provider: 'idamApi_oidc',
    logLevel: 'DEBUG',
  },
  provider => {
    describe('idam-get-system-user-details API', () => {
      const EXPECTED_USER_DETAILS = {
        accessToken: 'eyJ0eXAiOiJKV1QiLCJraWQiOiJiL082T3ZWdjEre',
        id: '267491aa-b696-4235-83a6-3b9253709798',
        email: 'citizen.automation@mailinator.com',
        givenName: 'citizen',
        familyName: 'automation',
      };

      const getUserDetailsSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          access_token: like('eyJ0eXAiOiJKV1QiLCJraWQiOiJiL082T3ZWdjEre'),
          scope: like('openid profile roles'),
          expires_in: like('28799'),
        },
      };

      const getUserDetailsRequest = {
        uponReceiving: 'a request to get system-user details',
        withRequest: {
          method: 'POST',
          path: '/o/token',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'grant_type=password&username=citizen.automation@mailinator.com&password=mock_password&client_id=adoption-web&client_secret=ssshhhh&scope=openid%20profile%20roles%20openid%20roles%20profile',
        },
      };

      beforeEach(() => {
        config.get = jest.fn();
        when(config.get)
          .calledWith('services.idam.tokenURL')
          .mockReturnValue(`${provider.mockService.baseUrl}/o/token`)
          .calledWith('services.idam.clientID')
          .mockReturnValue('adoption-web')
          .calledWith('services.idam.clientSecret')
          .mockReturnValue('ssshhhh')
          .calledWith('services.idam.systemUsername')
          .mockReturnValue('citizen.automation@mailinator.com')
          .calledWith('services.idam.systemPassword')
          .mockReturnValue('mock_password');

        const interaction = {
          state: 'a token is requested',
          ...getUserDetailsRequest,
          willRespondWith: getUserDetailsSuccessResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns user details', async () => {
        const userDetails = await getSystemUser();
        expect(userDetails).toEqual(EXPECTED_USER_DETAILS);
      });
    });
  }
);
