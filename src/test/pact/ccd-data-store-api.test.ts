jest.mock('../../main/app/auth/service/get-service-auth-token', () => ({
  getServiceAuthToken: jest.fn(() => 'mock-service-auth-token'),
}));

import config from 'config';
import { when } from 'jest-when';
import type { LoggerInstance } from 'winston';

import { getCaseApi } from '../../main/app/case/CaseApi';

const { pactWith } = require('jest-pact');

config.get = jest.fn();

pactWith(
  {
    consumer: 'adoption-web',
    provider: 'ccd_data_store',
    logLevel: 'DEBUG',
  },
  provider => {
    let caseApi;
    const userDetails = {
      accessToken: 'mock-user-access-token',
      id: '123456',
      email: 'user@hmcts.net',
      givenName: 'Firstname',
      familyName: 'Surname',
    };

    beforeEach(() => {
      const { Logger } = require('@hmcts/nodejs-logging');
      const logger: LoggerInstance = Logger.getLogger('server');
      when(config.get).calledWith('services.case.url').mockReturnValue(provider.mockService.baseUrl);
      caseApi = getCaseApi(userDetails, logger);
    });

    describe('ccd_data_store getCases API', () => {
      const CASES = [
        {
          id: '45678',
          state: 'Draft',
          case_data: { applyingWith: 'alone' },
        },
      ];

      const getCasesSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: CASES,
      };

      const getCasesRequest = {
        uponReceiving: 'a request to get cases',
        withRequest: {
          method: 'GET',
          path: '/citizens/123456/jurisdictions/ADOPTION/case-types/A58/cases',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            experimental: 'true',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'adoption-web makes request to get cases',
          ...getCasesRequest,
          willRespondWith: getCasesSuccessResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns all cases for a user', async () => {
        const cases = await caseApi.getCases();
        expect(cases).toEqual(CASES);
      });
    });

    describe('ccd_data_store getCaseById API', () => {
      const EXPECTED_CASE_DATA = {
        id: '45678',
        state: 'Draft',
        applyingWith: 'alone',
      };

      const getCaseByIdSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          id: '45678',
          state: 'Draft',
          data: { applyingWith: 'alone' },
        },
      };

      const getCaseByIdRequest = {
        uponReceiving: 'a request to get case by id',
        withRequest: {
          method: 'GET',
          path: '/cases/45678',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            experimental: 'true',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'adoption-web makes request to get case by id',
          ...getCaseByIdRequest,
          willRespondWith: getCaseByIdSuccessResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns case data by id', async () => {
        const caseResponse = await caseApi.getCaseById('45678');
        expect(caseResponse).toEqual(EXPECTED_CASE_DATA);
      });
    });

    describe('ccd_data_store createCase API', () => {
      const EXPECTED_CASE_DATA = {
        id: '45678',
        state: 'Draft',
      };

      const createCaseEventTokenResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          token: 'create-case-event-token',
        },
      };

      const createCaseEventTokenRequest = {
        uponReceiving: 'a request to get citizen-create-application event token',
        withRequest: {
          method: 'GET',
          path: '/case-types/A58/event-triggers/citizen-create-application',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            experimental: 'true',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        },
      };

      const createCaseResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          id: '45678',
          state: 'Draft',
          data: {},
        },
      };

      const createCaseRequest = {
        uponReceiving: 'a request to get citizen-create-application event token',
        withRequest: {
          method: 'POST',
          path: '/case-types/A58/cases',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            experimental: 'true',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: {
            data: {
              applicant1FirstName: userDetails.givenName,
              applicant1LastName: userDetails.familyName,
              applicant1Email: userDetails.email,
            },
            event: { id: 'citizen-create-application' },
            event_token: 'create-case-event-token',
          },
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'adoption-web makes request to get citizen-create-application event token',
          ...createCaseEventTokenRequest,
          willRespondWith: createCaseEventTokenResponse,
        };
        provider.addInteraction(interaction);

        const interaction2 = {
          state: 'adoption-web makes request to create case',
          ...createCaseRequest,
          willRespondWith: createCaseResponse,
        };
        provider.addInteraction(interaction2);
      });

      it('creates a new case and return case data in response', async () => {
        const caseResponse = await caseApi.createCase('adoption', userDetails);
        expect(caseResponse).toEqual(EXPECTED_CASE_DATA);
      });
    });

    describe('ccd_data_store case-users API', () => {
      const EXPECTED_CASE_USER_ROLES = {
        case_users: [{ case_id: '45678', user_id: '123456', case_role: 'citizen' }],
      };

      const getCaseUserRolesResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          case_users: [{ case_id: '45678', user_id: '123456', case_role: 'citizen' }],
        },
      };

      const getCaseUserRolesRequest = {
        uponReceiving: 'a request to get case-user roles',
        withRequest: {
          method: 'GET',
          path: '/case-users',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            experimental: 'true',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          query: 'case_ids=45678&user_ids=123456',
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'adoption-web makes request to get case-users roles',
          ...getCaseUserRolesRequest,
          willRespondWith: getCaseUserRolesResponse,
        };
        provider.addInteraction(interaction);
      });

      it('return case assigned user roles in response for given caseId and userId', async () => {
        const caseUserRoles = await caseApi.getCaseUserRoles('45678', userDetails.id);
        expect(caseUserRoles).toEqual(EXPECTED_CASE_USER_ROLES);
      });
    });

    describe('ccd_data_store sendEvent API', () => {
      const EXPECTED_CASE_DATA = {
        id: '45678',
        state: 'Draft',
        applicant1FirstNames: 'Updated first name',
        applicant1LastNames: 'Updated last name',
      };

      const getEventTokenResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          token: 'update-case-event-token',
        },
      };

      const getEventTokenRequest = {
        uponReceiving: 'a request to get citizen-update-application event token',
        withRequest: {
          method: 'GET',
          path: '/cases/45678/event-triggers/citizen-update-application',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            experimental: 'true',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        },
      };

      const sendCaseEventResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          id: '45678',
          state: 'Draft',
          data: {
            applicant1FirstName: 'Updated first name',
            applicant1LastName: 'Updated last name',
          },
        },
      };

      const sendCaseEventRequest = {
        uponReceiving: 'a request to send citizen-update-application event',
        withRequest: {
          method: 'POST',
          path: '/cases/45678/events',
          headers: {
            Authorization: 'Bearer mock-user-access-token',
            ServiceAuthorization: 'mock-service-auth-token',
            experimental: 'true',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: {
            data: {
              applicant1FirstNames: 'Updated first name',
              applicant1LastNames: 'Updated last name',
            },
            event: { id: 'citizen-update-application' },
            event_token: 'update-case-event-token',
          },
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'adoption-web makes request to get citizen-update-application event token',
          ...getEventTokenRequest,
          willRespondWith: getEventTokenResponse,
        };
        provider.addInteraction(interaction);

        const interaction2 = {
          state: 'adoption-web makes request to send case event',
          ...sendCaseEventRequest,
          willRespondWith: sendCaseEventResponse,
        };
        provider.addInteraction(interaction2);
      });

      it('updates case and return case data in response', async () => {
        const caseResponse = await caseApi.sendEvent(
          '45678',
          { applicant1FirstNames: 'Updated first name', applicant1LastNames: 'Updated last name' },
          'citizen-update-application'
        );
        expect(caseResponse).toEqual(EXPECTED_CASE_DATA);
      });
    });
  }
);
