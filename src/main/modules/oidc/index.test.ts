const mockGetCaseDetails = jest.fn();
const mockGetCaseApi = jest.fn(() => ({ getCaseDetails: mockGetCaseDetails }));

jest.mock('@hmcts/nodejs-logging');
jest.mock('../../app/auth/user/oidc', () => ({
  getRedirectUrl: jest.fn(),
  getUserDetails: jest.fn(),
}));
jest.mock('../../app/case/CaseApi', () => ({
  getCaseApi: mockGetCaseApi,
}));

import { Application, NextFunction, Response } from 'express';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { AppRequest } from '../../app/controller/AppRequest';
import { HOME_URL, LA_DOCUMENT_MANAGER, LA_PORTAL_START_PAGE } from '../../steps/urls';

import { OidcMiddleware } from '.';

describe('OidcMiddleware', () => {
  type RegisteredMiddleware = (req: AppRequest, res: Response, next: NextFunction) => unknown;

  let registeredMiddleware: RegisteredMiddleware;

  beforeEach(() => {
    jest.clearAllMocks();
    const app = {
      get: jest.fn(),
      use: jest.fn(callback => {
        registeredMiddleware = callback as RegisteredMiddleware;
      }),
      locals: {
        developmentMode: true,
        errorHandler: jest.fn(callback => callback),
      },
    } as unknown as Application;

    new OidcMiddleware().enableFor(app);
  });

  test('does not run citizen case discovery for a system user visiting the public root', async () => {
    const req = mockRequest({
      path: HOME_URL,
      session: {
        user: { isSystemUser: true },
        userCase: undefined,
      },
    });
    const res = mockResponse();
    const next = jest.fn();

    await registeredMiddleware(req, res, next);

    expect(mockGetCaseApi).not.toHaveBeenCalled();
    expect(mockGetCaseDetails).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(LA_PORTAL_START_PAGE);
    expect(next).not.toHaveBeenCalled();
  });

  test('initialises the exact-case API without case discovery for LA service routes', async () => {
    const req = mockRequest({
      path: LA_DOCUMENT_MANAGER,
      session: {
        user: { isSystemUser: true },
        userCase: { id: '1234567890123456' },
      },
    });
    const next = jest.fn();

    await registeredMiddleware(req, mockResponse(), next);

    expect(mockGetCaseApi).toHaveBeenCalledWith(req.session.user, req.locals.logger);
    expect(mockGetCaseDetails).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
