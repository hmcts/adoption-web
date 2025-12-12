jest.mock('@hmcts/nodejs-logging');

import { Logger } from '@hmcts/nodejs-logging';
import { Application } from 'express';

//import { UserPathError } from '../../steps/error/error.controller';
import { UserRole } from '../../app/case/definition';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { KEEP_ALIVE_URL, TASK_LIST_URL} from '../../steps/urls';

import { UserRedirectMiddleware } from '.';

describe('user-redirect', () => {
  const req = {
    session: {},
    //session: { user: {}, userCase: {} },
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

  // test('should not call next for Citizen links when no session.user', () => {
  //   expect.assertions(1);
  //   req.path = TASK_LIST_URL;
  //   try {
  //     registeredMiddleware(req, res, mockNext);
  //   } catch (err) {
  //     expect(err).toBeInstanceOf(UserPathError);
  //     //expect(err.message).toMatch(/Citizen user id/);
  //   }
  //   //expect(res.statusCode).toBe(404);
  // });

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
    //expect(mockLogger.warn).toHaveBeenCalledWith('Error in refreshing service auth token ');
  });
});
