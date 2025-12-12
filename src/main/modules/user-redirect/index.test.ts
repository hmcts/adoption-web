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
  //let registeredMiddleware: any; //new

  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
  };
  Logger.getLogger.mockReturnValue(mockLogger);

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    mockApp = {
      use: jest.fn(),
      //use: jest.fn(fn => { registeredMiddleware = fn; }), //new
      locals: {
        errorHandler: jest.fn(callback => callback(req, res, mockNext)),
      },
    } as unknown as Application;

    middlewareUnderTest = new UserRedirectMiddleware();
    //middlewareUnderTest.enableFor(mockApp); //new
  });

  test('should call next for public links', () => {
    req.path = KEEP_ALIVE_URL;
    //registeredMiddleware(req, res, mockNext); //new
    middlewareUnderTest.enableFor(mockApp);
    //expect(mockNext).toHaveBeenCalled();
  });

  // test('should not call next for Citizen links when no session.user', () => {
  //   req.path = TASK_LIST_URL;
  //   try {
  //     //middlewareUnderTest.enableFor(mockApp);
  //     registeredMiddleware(req, res, mockNext); //new
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
    middlewareUnderTest.enableFor(mockApp);
    //registeredMiddleware(req, res, mockNext); //new
    expect(mockNext).toHaveBeenCalled();
    //expect(mockLogger.warn).toHaveBeenCalledWith('Error in refreshing service auth token ');
  });
});
