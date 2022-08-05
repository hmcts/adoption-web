jest.useRealTimers();

jest.mock('../../main/app/auth/service/get-service-auth-token', () => ({
  getServiceAuthToken: jest.fn(() => 'mock-service-auth-token'),
}));

const jwtDecodeMock = jest.fn().mockReturnValue({
  sub: 'user@hmcts.net',
  family_name: 'Surname',
  given_name: 'Firstname',
  uid: '267491aa-b696-4235-83a6-3b9253709798',
});
jest.mock('jwt-decode', () => ({
  __esModule: true,
  default: jwtDecodeMock,
}));

// import axios from 'axios';
import config from 'config';
import { when } from 'jest-when';

import {
  // CaseApi,
  getCaseApi,
} from '../../main/app/case/CaseApi';
import { mockRequest } from '../unit/utils/mockRequest';

const { pactWith } = require('jest-pact');

config.get = jest.fn();
// jest.mock('axios');

pactWith(
  {
    consumer: 'adoption-web',
    provider: 'ccdDataStoreAPI_Cases',
    logLevel: 'DEBUG',
  },
  provider => {
    let caseApi;
    const userDetails = {
      accessToken: 'eyJ0eXAiOiJKV1QiLCJraWQiOiJiL082T3ZWdjEre',
      id: '267491aa-b696-4235-83a6-3b9253709798',
      email: 'user@hmcts.net',
      givenName: 'Firstname',
      familyName: 'Surname',
      roles: ['adoption-citizen-user'],
    };

    beforeEach(() => {
      const req = mockRequest({
        session: {
          lang: 'en',
          user: userDetails,
        },
      });

      when(config.get).calledWith('services.case.url').mockReturnValue(provider.mockService.baseUrl);
      console.log(provider.mockService.baseUrl, 'line 46');
      caseApi = getCaseApi(req.session.user, req.locals.logger);
      // caseApi = new CaseApi(mockedAxios, logger);
      // console.log(caseApi, 'line 39');
    });

    describe('ccd_data_store getCases API', () => {
      const CASES = [
        {
          id: '267491aa-b696-4235-83a6-3b9253709798',
          state: 'Draft',
          case_data: { applyingWith: 'alone' },
        },
      ];

      const getCasesSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          cases: CASES,
          total: 0,
          case_types_results: [],
        },
      };

      const query = {
        query: { match_all: {} },
        sort: [{ id: { order: 'asc' } }],
      };

      const getCasesRequest = {
        uponReceiving: 'a request to get cases',
        withRequest: {
          method: 'POST',
          path: '/searchCases?ctid=A58',
          headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJiL082T3ZWdjEre',
            ServiceAuthorization: 'mock-service-auth-token',
            experimental: 'true',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: query,
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
        console.log(cases, 'line 84');
        console.log(CASES, 'line 85');
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
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJiL082T3ZWdjEre',
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
        console.log(provider, 'line 130');
        return provider.addInteraction(interaction);
      });

      it('returns case data by id', async () => {
        const caseResponse = await caseApi.getCaseById('45678');
        console.log(caseResponse, 'line 136');
        console.log(EXPECTED_CASE_DATA, 'line 137');
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
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJiL082T3ZWdjEre',
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
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJiL082T3ZWdjEre',
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
        console.log(caseResponse, 'line 244');
        console.log(EXPECTED_CASE_DATA, 'line 245');
        expect(caseResponse).toEqual(EXPECTED_CASE_DATA);
      });
    });

    describe('ccd_data_store case-users API', () => {
      const EXPECTED_CASE_USER_ROLES = {
        case_users: [{ case_id: '45678', user_id: '267491aa-b696-4235-83a6-3b9253709798', case_role: 'citizen' }],
      };

      const getCaseUserRolesResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          case_users: [{ case_id: '45678', user_id: '267491aa-b696-4235-83a6-3b9253709798', case_role: 'citizen' }],
        },
      };

      const getCaseUserRolesRequest = {
        uponReceiving: 'a request to get case-user roles',
        withRequest: {
          method: 'GET',
          path: '/case-users',
          headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJiL082T3ZWdjEre',
            ServiceAuthorization: 'mock-service-auth-token',
            experimental: 'true',
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          query: 'case_ids=45678&user_ids=267491aa-b696-4235-83a6-3b9253709798',
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
        console.log(caseUserRoles, 'line 292');
        console.log(EXPECTED_CASE_USER_ROLES, 'line 293');
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
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJiL082T3ZWdjEre',
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
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJiL082T3ZWdjEre',
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
        console.log(caseResponse, 'line 391');
        console.log(EXPECTED_CASE_DATA, 'line 392');
        expect(caseResponse).toEqual(EXPECTED_CASE_DATA);
      });
    });
  }
);
