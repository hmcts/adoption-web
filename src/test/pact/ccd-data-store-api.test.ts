jest.useRealTimers();

jest.mock('../../main/app/auth/service/get-service-auth-token', () => ({
  getServiceAuthToken: jest.fn(() => 'mock-service-auth-token'),
}));

import * as path from 'path';

import { MatchersV3, PactV3 } from '@pact-foundation/pact';
import config from 'config';
import { when } from 'jest-when';
import type { LoggerInstance } from 'winston';

import { getCaseApi } from '../../main/app/case/CaseApi';
import { Adoption } from '../../main/app/case/definition';

const { like } = MatchersV3;

config.get = jest.fn();

const userDetails = {
  accessToken: 'mock-user-access-token',
  id: '123456',
  email: 'user@hmcts.net',
  givenName: 'Firstname',
  familyName: 'Surname',
  roles: ['adoption-citizen-user'],
};

const pactOptions = {
  consumer: 'adoption-web',
  provider: 'ccdDataStoreAPI_Cases',
  logLevel: 'debug' as const,
  dir: path.resolve(process.cwd(), 'pact/pacts'),
};

jest.setTimeout(30000);

describe('Pact between adoption-web and ccdDataStoreAPI_Cases', () => {
  describe('ccd_data_store getCases API', () => {
    const CASES = [
      {
        id: '123456',
        state: 'Draft',
        case_data: { applyingWith: 'alone' },
      },
    ];

    it('returns all cases for a user', async () => {
      const provider = new PactV3(pactOptions);

      await provider
        .addInteraction({
          states: [{ description: 'adoption-web makes request to get cases' }],
          uponReceiving: 'a request to get cases',
          withRequest: {
            method: 'POST',
            path: '/searchCases',
            query: { ctid: 'A58' },
            headers: {
              Authorization: 'Bearer mock-user-access-token',
              ServiceAuthorization: 'mock-service-auth-token',
              experimental: 'true',
              Accept: '*/*',
              'Content-Type': 'application/json',
            },
            body: {
              query: { match_all: {} },
              sort: [{ id: { order: 'asc' } }],
            },
          },
          willRespondWith: {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: like({
              cases: [{ id: '123456', state: 'Draft', case_data: { applyingWith: 'alone' } }],
              total: 1,
            }),
          },
        })
        .executeTest(async mockServer => {
          const { Logger } = require('@hmcts/nodejs-logging');
          const logger: LoggerInstance = Logger.getLogger('server');
          when(config.get).calledWith('services.case.url').mockReturnValue(mockServer.url);
          const caseApi = getCaseApi(userDetails, logger);
          const cases = await caseApi.getCases();
          expect(cases).toEqual(CASES);
        });
    });
  });

  describe('ccd_data_store getCaseById API', () => {
    const EXPECTED_CASE_DATA = {
      id: '45678',
      state: 'Draft',
      applyingWith: 'alone',
      status: 'Draft',
    };

    it('returns case data by id', async () => {
      const provider = new PactV3(pactOptions);

      await provider
        .addInteraction({
          states: [{ description: 'adoption-web makes request to get case by id' }],
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
          willRespondWith: {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: like({
              id: '45678',
              state: 'Draft',
              data: { applyingWith: 'alone' },
            }),
          },
        })
        .executeTest(async mockServer => {
          const { Logger } = require('@hmcts/nodejs-logging');
          const logger: LoggerInstance = Logger.getLogger('server');
          when(config.get).calledWith('services.case.url').mockReturnValue(mockServer.url);
          const caseApi = getCaseApi(userDetails, logger);
          const caseResponse = await caseApi.getCaseById('45678');
          expect(caseResponse).toEqual(EXPECTED_CASE_DATA);
        });
    });
  });

  describe('ccd_data_store createCase API', () => {
    const EXPECTED_CASE_DATA = {
      id: '45678',
      state: 'Draft',
      status: 'Draft',
    };

    it('creates a new case and return case data in response', async () => {
      const provider = new PactV3(pactOptions);

      await provider
        .addInteraction({
          states: [{ description: 'adoption-web makes request to get citizen-create-application event token' }],
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
          willRespondWith: {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: like({ token: 'create-case-event-token' }),
          },
        })
        .addInteraction({
          states: [{ description: 'adoption-web makes request to create case' }],
          uponReceiving: 'a request to create a new case',
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
          willRespondWith: {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: like({ id: '45678', state: 'Draft', data: {} }),
          },
        })
        .executeTest(async mockServer => {
          const { Logger } = require('@hmcts/nodejs-logging');
          const logger: LoggerInstance = Logger.getLogger('server');
          when(config.get).calledWith('services.case.url').mockReturnValue(mockServer.url);
          const caseApi = getCaseApi(userDetails, logger);
          const caseResponse = await caseApi.createCase(Adoption.ADOPTION, userDetails);
          expect(caseResponse).toEqual(EXPECTED_CASE_DATA);
        });
    });
  });

  describe('ccd_data_store case-users API', () => {
    const EXPECTED_CASE_USER_ROLES = {
      case_users: [{ case_id: '45678', user_id: '123456', case_role: 'citizen' }],
    };

    it('return case assigned user roles in response for given caseId and userId', async () => {
      const provider = new PactV3(pactOptions);

      await provider
        .addInteraction({
          states: [{ description: 'adoption-web makes request to get case-users roles' }],
          uponReceiving: 'a request to get case-user roles',
          withRequest: {
            method: 'GET',
            path: '/case-users',
            query: { case_ids: '45678', user_ids: '123456' },
            headers: {
              Authorization: 'Bearer mock-user-access-token',
              ServiceAuthorization: 'mock-service-auth-token',
              experimental: 'true',
              Accept: '*/*',
              'Content-Type': 'application/json',
            },
          },
          willRespondWith: {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: like(EXPECTED_CASE_USER_ROLES),
          },
        })
        .executeTest(async mockServer => {
          const { Logger } = require('@hmcts/nodejs-logging');
          const logger: LoggerInstance = Logger.getLogger('server');
          when(config.get).calledWith('services.case.url').mockReturnValue(mockServer.url);
          const caseApi = getCaseApi(userDetails, logger);
          const caseUserRoles = await caseApi.getCaseUserRoles('45678', userDetails.id);
          expect(caseUserRoles).toEqual(EXPECTED_CASE_USER_ROLES);
        });
    });
  });

  describe('ccd_data_store sendEvent API', () => {
    const EXPECTED_CASE_DATA = {
      id: '45678',
      state: 'Draft',
      applicant1FirstNames: 'Updated first name',
      applicant1LastNames: 'Updated last name',
      status: 'Draft',
    };

    it('updates case and return case data in response', async () => {
      const provider = new PactV3(pactOptions);

      await provider
        .addInteraction({
          states: [{ description: 'adoption-web makes request to get citizen-update-application event token' }],
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
          willRespondWith: {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: like({ token: 'update-case-event-token' }),
          },
        })
        .addInteraction({
          states: [{ description: 'adoption-web makes request to send case event' }],
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
                applicant1FirstName: 'Updated first name',
                applicant1LastName: 'Updated last name',
              },
              event: { id: 'citizen-update-application' },
              event_token: 'update-case-event-token',
            },
          },
          willRespondWith: {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: like({
              id: '45678',
              state: 'Draft',
              data: {
                applicant1FirstName: 'Updated first name',
                applicant1LastName: 'Updated last name',
              },
              status: 'Draft',
            }),
          },
        })
        .executeTest(async mockServer => {
          const { Logger } = require('@hmcts/nodejs-logging');
          const logger: LoggerInstance = Logger.getLogger('server');
          when(config.get).calledWith('services.case.url').mockReturnValue(mockServer.url);
          const caseApi = getCaseApi(userDetails, logger);
          const caseResponse = await caseApi.triggerEvent(
            '45678',
            { applicant1FirstNames: 'Updated first name', applicant1LastNames: 'Updated last name' },
            'citizen-update-application'
          );
          expect(caseResponse).toEqual(EXPECTED_CASE_DATA);
        });
    });
  });
});
