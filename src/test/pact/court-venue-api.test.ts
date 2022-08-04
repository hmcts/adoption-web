jest.useRealTimers();

jest.mock('../../main/app/auth/service/get-service-auth-token', () => ({
  getServiceAuthToken: jest.fn(() => 'mock-service-auth-token'),
}));

import config from 'config';
import { when } from 'jest-when';
import type { LoggerInstance } from 'winston';

// import { AppRequest, UserDetails } from '../../main/app/controller/AppRequest';
// import { getServiceAuthToken } from '../../main/app/auth/service/get-service-auth-token';
import { getCourtList, getCourtVenues } from '../../main/app/court/court-venues-api';
import { mockRequest } from '../unit/utils/mockRequest';

// import { CourtVenue, LocationResponse } from '../../main/app/court/location';

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
        .mockReturnValue(`${provider.mockService.baseUrl}/refdata/location/court-venues/services`);
    });

    describe('court-venue getCourtVenues API', () => {
      const EXPECTED_VENUES = [
        {
          fullAddress: 'BUCKINGHAM PALACE, LONDON, SW1A 1AA',
          street1: 'BUCKINGHAM PALACE',
          street2: '',
          town: 'LONDON',
          county: 'CITY OF WESTMINSTER',
          postcode: 'SW1A 1AA',
        },
      ];

      const courtVenueAdoptSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        // body: { results: validPostcode200Response.results },
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
            service_code: 'services.adoptionCourt.code',
          },
        },
      };

      const courtVenuePLSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        // body: { results: validPostcode200Response.results },
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
            service_code: 'services.familyPublicLawCourt.code',
          },
        },
      };

      beforeEach(() => {
        // config.get = jest.fn();
        // when(config.get)
        //   .calledWith('services.location_api.url')
        //   .mockReturnValue(`${provider.mockService.baseUrl}`)
        // .calledWith('services.postcodeLookup.token')
        // .mockReturnValue('ssshhh');

        const interaction = {
          state: 'Adoption Court Venues exist for the service code provided',
          ...courtVenuePLRequest,
          willRespondWith: courtVenuePLSuccessResponse,
        };

        provider.addInteraction(interaction);

        const interaction2 = {
          state: 'Adoption Court Venues exist for the service code provided',
          ...courtVenueAdoptRequest,
          willRespondWith: courtVenueAdoptSuccessResponse,
        };

        provider.addInteraction(interaction2);
      });

      it('returns correct venue list for Adoption', async () => {
        const { Logger } = require('@hmcts/nodejs-logging');
        const logger: LoggerInstance = Logger.getLogger('server');

        const addresses = await getCourtVenues(`${config.get('services.adoptionCourt.code')}`, userDetails, logger);
        console.log(addresses, 'line 138');
        console.log(EXPECTED_VENUES, 'line 139');
        expect(addresses).toEqual(EXPECTED_VENUES);
      });

      it('returns correct venue list for Public Law', async () => {
        const { Logger } = require('@hmcts/nodejs-logging');
        const logger: LoggerInstance = Logger.getLogger('server');

        const addresses = await getCourtVenues(
          `${config.get('services.familyPublicLawCourt.code')}`,
          userDetails,
          logger
        );
        console.log(addresses, 'line 148');
        console.log(EXPECTED_VENUES, 'line 149');
        expect(addresses).toEqual(EXPECTED_VENUES);
      });

      it('returns correct venue list', async () => {
        // const { Logger } = require('@hmcts/nodejs-logging');
        // const logger: LoggerInstance = Logger.getLogger('server');

        const addresses = await getCourtList(
          mockRequest({
            session: {
              lang: 'en',
              user: userDetails,
            },
            // locals: logger
          })
        );
        console.log(addresses, 'line 164');
        console.log(EXPECTED_VENUES, 'line 165');
        expect(addresses).toEqual(EXPECTED_VENUES);
      });
    });
  }
);
