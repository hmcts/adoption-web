jest.mock('@hmcts/nodejs-logging');

import { Logger } from '@hmcts/nodejs-logging';
import { Application } from 'express';

import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { ApplyingWith, SectionStatus, State } from '../../app/case/definition';
import {
  APPLICANT_2_SAME_ADDRESS,
  APPLYING_WITH_URL,
  CHECK_ANSWERS_URL,
  DOWNLOAD_APPLICATION_SUMMARY,
  KEEP_ALIVE_URL,
  LA_PORTAL_CONFIRMATION_PAGE,
  LA_PORTAL_TASK_LIST,
  TASK_LIST_URL,
} from '../../steps/urls';

import { StateRedirectMiddleware } from '.';

describe('user-redirect', () => {
  const req = {
    session: {},
    path: '',
  };
  const res = mockResponse();
  const mockNext = jest.fn();
  let middlewareUnderTest: StateRedirectMiddleware;
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

    middlewareUnderTest = new StateRedirectMiddleware();
    middlewareUnderTest.enableFor(mockApp);
  });

  test('should call next for public links', () => {
    req.path = KEEP_ALIVE_URL;

    registeredMiddleware(req, res, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  test('should call next for valid Submitted links', () => {
    req.path = DOWNLOAD_APPLICATION_SUMMARY;
    req.session = {
      userCase: {
        state: State.Submitted,
      },
    };

    registeredMiddleware(req, res, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  test('should call next for valid Submitted links when LaSubmitted', () => {
    req.path = APPLYING_WITH_URL;
    req.session = {
      userCase: {
        state: State.LaSubmitted,
      },
    };

    registeredMiddleware(req, res, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  test('should redirect LA internal links to LA Confirmation page after LA Submit', async () => {
    req.path = LA_PORTAL_TASK_LIST;
    req.session = {
      userCase: {
        state: State.LaSubmitted,
      },
    };

    await registeredMiddleware(req, res, mockNext);
    expect(res.redirect).toHaveBeenCalledWith(LA_PORTAL_CONFIRMATION_PAGE);
  });

  test('should redirect Citizen internal links to home after Citizen Submit', async () => {
    req.path = TASK_LIST_URL;
    req.session = {
      userCase: {
        state: State.Submitted,
      },
    };

    await registeredMiddleware(req, res, mockNext);
    expect(res.redirect).toHaveBeenCalledWith('/');
  });

  test('should redirect Citizen internal links to home after Citizen (+ LA) Submit', async () => {
    req.path = TASK_LIST_URL;
    req.session = {
      userCase: {
        state: State.LaSubmitted,
      },
    };

    await registeredMiddleware(req, res, mockNext);
    expect(res.redirect).toHaveBeenCalledWith('/');
  });

  test('should redirect single applicant from APPLICANT2 links', async () => {
    req.path = APPLICANT_2_SAME_ADDRESS;
    req.session = {
      userCase: {
        applyingWith: ApplyingWith.ALONE,
        state: State.Draft,
      },
    };

    await registeredMiddleware(req, res, mockNext);
    expect(res.redirect).toHaveBeenCalledWith(TASK_LIST_URL);
  });

  test('should redirect from Check Answers when not all sections complete', async () => {
    req.path = CHECK_ANSWERS_URL;
    req.session = {
      userCase: SectionStatus.CAN_NOT_START_YET,
    };

    await registeredMiddleware(req, res, mockNext);
    expect(res.redirect).toHaveBeenCalledWith(TASK_LIST_URL);
  });
});
