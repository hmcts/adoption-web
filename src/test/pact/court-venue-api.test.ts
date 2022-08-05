jest.mock('../../main/app/auth/service/get-service-auth-token', () => ({
  getServiceAuthToken: jest.fn(() => 'mock-service-auth-token'),
}));

import config from 'config';
import { when } from 'jest-when';
// import type { LoggerInstance } from 'winston';

import { getCourtVenues } from '../../main/app/court/court-venues-api';
import { mockRequest } from '../unit/utils/mockRequest';

const { pactWith } = require('jest-pact');
config.get = jest.fn();

pactWith(
  {
    consumer: 'adoption-web',
    provider: 'referenceData_location',
    logLevel: 'DEBUG',
  },
  provider => {
    const userDetails = {
      accessToken: 'mock-user-access-token',
      id: '123456',
      email: 'user@hmcts.net',
      givenName: 'Firstname',
      familyName: 'Surname',
      roles: ['adoption-citizen-user'],
    };

    beforeEach(() => {
      when(config.get)
        .calledWith('services.location_api.url')
        .mockReturnValue(`${provider.mockService.baseUrl}`)
        .calledWith('services.adoptionCourt.code')
        .mockReturnValue('ABA4')
        .calledWith('services.familyPublicLawCourt.code')
        .mockReturnValue('ABA3');
    });

    describe('PL court-venue getCourtVenues API', () => {
      const EXPECTED_VENUES = [];

      const courtVenuePLSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: { court_venues: [] },
      };

      const courtVenuePLRequest = {
        uponReceiving: 'a request for court venue list',
        withRequest: {
          method: 'GET',
          path: '/refdata/location/court-venues/services',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          query: {
            service_code: 'ABA3',
          },
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'Public Law Court Venues exist for the service code provided',
          ...courtVenuePLRequest,
          willRespondWith: courtVenuePLSuccessResponse,
        };

        provider.addInteraction(interaction);
      });

      it('returns correct venue list for Adoption', async () => {
        const req = mockRequest({
          session: {
            lang: 'en',
            user: userDetails,
          },
          // locals: logger
        });

        const addresses = await getCourtVenues(
          `${config.get('services.familyPublicLawCourt.code')}`,
          req.session.user,
          req.locals.logger
        );
        console.log(addresses, 'line 138');
        console.log(EXPECTED_VENUES, 'line 139');
        expect(addresses).toEqual(EXPECTED_VENUES);
      });
    });

    describe('Adopt court-venue getCourtVenues API', () => {
      const EXPECTED_VENUES = [];

      const courtVenueAdoptSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: { court_venues: [] },
      };

      const courtVenueAdoptRequest = {
        uponReceiving: 'a request for court venue list',
        withRequest: {
          method: 'GET',
          path: '/refdata/location/court-venues/services',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          query: {
            service_code: 'ABA4',
          },
        },
      };

      beforeEach(() => {
        const interaction2 = {
          state: 'Adoption Court Venues exist for the service code provided',
          ...courtVenueAdoptRequest,
          willRespondWith: courtVenueAdoptSuccessResponse,
        };

        provider.addInteraction(interaction2);
      });

      it('returns correct venue list for Public Law', async () => {
        const req = mockRequest({
          session: {
            lang: 'en',
            user: userDetails,
          },
        });

        const addresses = await getCourtVenues(
          `${config.get('services.adoptionCourt.code')}`,
          req.session.user,
          req.locals.logger
        );
        console.log(addresses, 'line 148');
        console.log(EXPECTED_VENUES, 'line 149');
        expect(addresses).toEqual(EXPECTED_VENUES);
      });
    });

    //     describe('getCourtList court-venue API', () => {
    //       const EXPECTED_VENUES = [];

    //       const courtVenueAdoptSuccessResponse = {
    //         status: 200,
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: { court_venues: [] },
    //       };

    //       const courtVenueAdoptRequest = {
    //         uponReceiving: 'a request for court venue list',
    //         withRequest: {
    //           method: 'GET',
    //           path: '/refdata/location/court-venues/services',
    //           headers: {
    //             Authorization: 'Bearer mock-user-access-token',
    //             ServiceAuthorization: 'mock-service-auth-token',
    //             Accept: '*/*',
    //             'Content-Type': 'application/json',
    //           },
    //           query: {
    //             service_code: 'ABA4',
    //           },
    //         },
    //       };

    //       beforeEach(() => {
    //         const interaction2 = {
    //           state: 'Adoption Court Venues exist for the service code provided',
    //           ...courtVenueAdoptRequest,
    //           willRespondWith: courtVenueAdoptSuccessResponse,
    //         };

    //         provider.addInteraction(interaction2);
    //       });

    //       it('returns correct venue list for Public Law', async () => {
    //         const { Logger } = require('@hmcts/nodejs-logging');
    //         const logger: LoggerInstance = Logger.getLogger('server');

    //         const req = mockRequest({
    //           session: {
    //             lang: 'en',
    //             user: userDetails,
    //           },
    //         });

    //         const addresses = await getCourtVenues(
    //           `${config.get('services.adoptionCourt.code')}`,
    //           req.session.user,
    //           req.locals.logger
    //         );
    //         console.log(addresses, 'line 148');
    //         console.log(EXPECTED_VENUES, 'line 149');
    //         expect(addresses).toEqual(EXPECTED_VENUES);
    //       });
    //     });
  }
);
