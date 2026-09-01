const mockGetSystemUser = jest.fn();
const mockGetCaseById = jest.fn();
const mockGetDraftCaseFromStore = jest.fn();

jest.mock('../../app/auth/user/oidc', () => ({
  getSystemUser: mockGetSystemUser,
}));
jest.mock('../../app/case/CaseApi', () => ({
  getCaseApi: jest.fn(() => ({ getCaseById: mockGetCaseById })),
}));
jest.mock('../../modules/draft-store/draft-store-service', () => ({
  getDraftCaseFromStore: mockGetDraftCaseFromStore,
}));

import { Application, NextFunction, Response } from 'express';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import {
  LA_PORTAL_KBA_CALLBACK,
  LA_PORTAL_KBA_CASE_REF,
  LA_PORTAL_NEG_SCENARIO,
  LA_PORTAL_START_PAGE,
  LA_PORTAL_TASK_LIST,
} from '../../steps/urls';

import { KbaMiddleware } from '.';

describe('KbaMiddleware', () => {
  type RegisteredHandler = (req: AppRequest, res: Response, next?: NextFunction) => unknown;

  const caseRef = '1234567890123456';
  const dateOfBirth = { day: '1', month: '2', year: '2020' };
  const systemUser = {
    id: 'system-user',
    accessToken: 'system-user-token',
    email: 'system@example.com',
    givenName: 'System',
    familyName: 'User',
    roles: [],
  };
  const userCase = {
    id: caseRef,
    state: State.Draft,
    childrenFirstName: 'Test',
    childrenLastName: 'Child',
    childrenDateOfBirth: dateOfBirth,
  };

  let routes: Record<string, RegisteredHandler>;
  let registeredMiddleware: RegisteredHandler;

  beforeEach(() => {
    jest.clearAllMocks();
    routes = {};

    const app = {
      get: jest.fn((path, callback) => {
        routes[path] = callback as RegisteredHandler;
      }),
      use: jest.fn(callback => {
        registeredMiddleware = callback as RegisteredHandler;
      }),
      locals: {
        errorHandler: jest.fn(callback => callback),
      },
    } as unknown as Application;

    new KbaMiddleware().enableFor(app);
    mockGetSystemUser.mockResolvedValue(systemUser);
    mockGetCaseById.mockResolvedValue(userCase);
    mockGetDraftCaseFromStore.mockResolvedValue(undefined);
  });

  test('validates the exact case before creating the system-user session', async () => {
    const regenerate = jest.fn(done => done());
    const save = jest.fn(done => done());
    const req = mockRequest({
      session: {
        user: undefined,
        userCase: undefined,
        laPortalKba: {
          kbaCaseRef: caseRef,
          kbaChildName: 'Test Child',
          kbaChildrenDateOfBirth: dateOfBirth,
        },
        regenerate,
        save,
      },
    });
    const res = mockResponse();

    await routes[LA_PORTAL_KBA_CALLBACK](req, res);

    expect(mockGetCaseById).toHaveBeenCalledWith(caseRef);
    expect(mockGetCaseById.mock.invocationCallOrder[0]).toBeLessThan(regenerate.mock.invocationCallOrder[0]);
    expect(req.session.user).toEqual({ ...systemUser, isSystemUser: true });
    expect(req.session.userCase).toEqual(userCase);
    expect(req.session.laPortalKba).toEqual({ authenticated: true, kbaCaseRef: caseRef });
    expect(save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(LA_PORTAL_START_PAGE);
  });

  test('destroys the session when the KBA details do not match the requested case', async () => {
    const destroy = jest.fn(done => done());
    const regenerate = jest.fn(done => done());
    const req = mockRequest({
      session: {
        user: undefined,
        userCase: undefined,
        laPortalKba: {
          kbaCaseRef: caseRef,
          kbaChildName: 'Wrong Child',
          kbaChildrenDateOfBirth: dateOfBirth,
        },
        destroy,
        regenerate,
      },
    });
    const res = mockResponse();

    await routes[LA_PORTAL_KBA_CALLBACK](req, res);

    expect(destroy).toHaveBeenCalled();
    expect(regenerate).not.toHaveBeenCalled();
    expect(req.session.user).toBeUndefined();
    expect(res.redirect).toHaveBeenCalledWith(LA_PORTAL_NEG_SCENARIO);
  });

  test('rejects an LA session when its authenticated case binding has changed', async () => {
    const destroy = jest.fn(done => done());
    const req = mockRequest({
      path: LA_PORTAL_TASK_LIST,
      session: {
        user: { ...systemUser, isSystemUser: true },
        userCase: { ...userCase, id: '9999999999999999' },
        laPortalKba: { authenticated: true, kbaCaseRef: caseRef },
        destroy,
      },
    });
    const res = mockResponse();
    const next = jest.fn();

    await registeredMiddleware(req, res, next);

    expect(destroy).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(LA_PORTAL_KBA_CASE_REF);
    expect(next).not.toHaveBeenCalled();
  });
});
