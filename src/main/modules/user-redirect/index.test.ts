jest.mock('@hmcts/nodejs-logging');

import { Logger } from '@hmcts/nodejs-logging';
import { Application } from 'express';

import { UserPathError } from '../../steps/error/error.controller';
import { UserRole } from '../../app/case/definition';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { KEEP_ALIVE_URL, LA_PORTAL_TASK_LIST, TASK_LIST_URL} from '../../steps/urls';

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
  let registeredMiddleware: any; //TODO type

  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
  };
  Logger.getLogger.mockReturnValue(mockLogger);

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    mockApp = {
      use: jest.fn(fn => { registeredMiddleware = fn; }),
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

  test('should throw for Citizen internal links when no session.user', () => {
    req.path = TASK_LIST_URL;

    return registeredMiddleware(req, res, mockNext).catch((err) => {
      expect(err).toBeInstanceOf(UserPathError);
      expect(err.message).toMatch(/Unauthorised user id undefined tried to access/);
    });
  });

  test('should throw for LA internal links when no session.user', () => {
    req.path = LA_PORTAL_TASK_LIST;

    return registeredMiddleware(req, res, mockNext).catch((err) => {
      expect(err).toBeInstanceOf(UserPathError);
      expect(err.message).toMatch(/Unauthorised user id undefined tried to access/);
    });
  });

  test('should call next for citizen users acessing citizen links', () => {
    req.session = { 
      user: {
        id: 'user-123',
        roles: [UserRole.CITIZEN],
      }, 
      userCase: { id: '123' } };
    req.path = TASK_LIST_URL;

    registeredMiddleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  test('should throw for citizen users acessing LA links', () => {
    req.session = { 
      user: {
        id: 'user-123',
        roles: [UserRole.CITIZEN],
      }, 
      userCase: { id: '123' } };
    req.path = LA_PORTAL_TASK_LIST;

    return registeredMiddleware(req, res, mockNext).catch((err) => {
      expect(err).toBeInstanceOf(UserPathError);
      expect(err.message).toMatch(/Citizen user id user-123 tried to access/);
    });
  });

  test('should call next for LA users acessing LA links', () => {
    req.session = { 
      user: {
        id: 'la-123',
        roles: [UserRole.CASE_WORKER],
        isSystemUser: true,
      }, 
      userCase: { id: '123' } };
    req.path = LA_PORTAL_TASK_LIST;

    registeredMiddleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  test('should throw for LA users acessing citizen links', () => {
    req.session = { 
      user: {
        id: 'la-123',
        roles: [UserRole.CASE_WORKER],
        isSystemUser: true,
      }, 
      userCase: { id: '123' } };
    req.path = TASK_LIST_URL;

    return registeredMiddleware(req, res, mockNext).catch((err) => {
      expect(err).toBeInstanceOf(UserPathError);
      expect(err.message).toMatch(/LA user id la-123 tried to access/);
    });
  });
});
