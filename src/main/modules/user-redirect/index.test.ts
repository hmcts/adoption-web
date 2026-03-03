jest.mock('@hmcts/nodejs-logging');

import { Logger } from '@hmcts/nodejs-logging';
import { Application } from 'express';

import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { UserRole } from '../../app/case/definition';
import { UserPathError } from '../../steps/error/error.controller';
import { KEEP_ALIVE_URL, LA_PORTAL_KBA_CASE_REF, LA_PORTAL_TASK_LIST, TASK_LIST_URL } from '../../steps/urls';

import { UserRedirectMiddleware } from '.';

describe('user-redirect', () => {
  const req = {
    session: {},
    path: '',
  };
  const res = mockResponse();
  const mockNext = jest.fn();
  let middlewareUnderTest: UserRedirectMiddleware;
  let mockApp;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let registeredMiddleware: any;

  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
  };
  Logger.getLogger.mockReturnValue(mockLogger);

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    mockApp = {
      use: jest.fn(fn => {
        registeredMiddleware = fn;
      }),
      locals: {
        errorHandler: jest.fn(callback => callback),
      },
    } as unknown as Application;

    middlewareUnderTest = new UserRedirectMiddleware();
    middlewareUnderTest.enableFor(mockApp);
  });

  test('should call next for public links', () => {
    req.path = KEEP_ALIVE_URL;

    registeredMiddleware(req, res, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  test('should throw for Citizen internal links when no session.user', async () => {
    req.path = TASK_LIST_URL;

    const t = async () => {
      await registeredMiddleware(req, res, mockNext);
    };
    await expect(t).rejects.toThrow(UserPathError);
    await expect(t).rejects.toThrow(/Unauthorised user id undefined tried to access/);
  });

  test('should throw for LA internal links when no session.user', async () => {
    req.path = LA_PORTAL_TASK_LIST;

    const t = async () => {
      await registeredMiddleware(req, res, mockNext);
    };
    await expect(t).rejects.toThrow(UserPathError);
    await expect(t).rejects.toThrow(/Unauthorised user id undefined tried to access/);
  });

  test('should call next for citizen users accessing citizen links', () => {
    req.session = {
      user: {
        id: 'user-123',
        roles: [UserRole.CITIZEN],
      },
      userCase: { id: '123' },
    };
    req.path = TASK_LIST_URL;

    registeredMiddleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  test('should throw for citizen users accessing LA links', async () => {
    req.session = {
      user: {
        id: 'user-123',
        roles: [UserRole.CITIZEN],
      },
      userCase: { id: '123' },
    };
    req.path = LA_PORTAL_TASK_LIST;

    const t = async () => {
      await registeredMiddleware(req, res, mockNext);
    };
    await expect(t).rejects.toThrow(UserPathError);
    await expect(t).rejects.toThrow(/Citizen user id user-123 tried to access/);
  });

  test('should call next for LA users accessing LA links', () => {
    req.session = {
      user: {
        id: 'la-123',
        roles: [UserRole.CASE_WORKER],
        isSystemUser: true,
      },
      userCase: { id: '123' },
    };
    req.path = LA_PORTAL_TASK_LIST;

    registeredMiddleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  test('should throw for LA users accessing citizen links', async () => {
    req.session = {
      user: {
        id: 'la-123',
        roles: [UserRole.CASE_WORKER],
        isSystemUser: true,
      },
      userCase: { id: '123' },
    };
    req.path = TASK_LIST_URL;

    const t = async () => {
      await registeredMiddleware(req, res, mockNext);
    };
    await expect(t).rejects.toThrow(UserPathError);
    await expect(t).rejects.toThrow(/LA user id la-123 tried to access/);
  });

  test('should redirect citizen users from LA Login to Home', async () => {
    req.session = {
      user: {
        id: 'user-123',
        roles: [UserRole.CITIZEN],
      },
      userCase: { id: '123' },
    };
    req.path = LA_PORTAL_KBA_CASE_REF;

    await registeredMiddleware(req, res, mockNext);

    expect(res.redirect).toHaveBeenCalledWith('/');
  });

  test('should redirect logged in LA users from LA Login to Home', async () => {
    req.session = {
      user: {
        id: 'la-123',
        roles: [UserRole.CASE_WORKER],
        isSystemUser: true,
      },
      userCase: { id: '123' },
    };
    req.path = LA_PORTAL_KBA_CASE_REF;

    await registeredMiddleware(req, res, mockNext);

    expect(res.redirect).toHaveBeenCalledWith('/');
  });
});
