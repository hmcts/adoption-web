import { Application } from 'express';

import { Routes } from './routes';

const mockCSRFTokenError = jest.fn();
const mockNotFound = jest.fn();
jest.mock('./steps/error/error.controller', () => {
  return {
    ErrorController: jest.fn().mockImplementation(() => {
      return { CSRFTokenError: mockCSRFTokenError, notFound: mockNotFound };
    }),
  };
});

const mockHomeGetController = jest.fn();
jest.mock('./steps/home/get', () => {
  return {
    HomeGetController: jest.fn().mockImplementation(() => {
      return { get: mockHomeGetController };
    }),
  };
});

const mockSaveAndSignOutGetController = jest.fn();
jest.mock('./steps/save-sign-out/get', () => {
  return {
    SaveSignOutGetController: jest.fn().mockImplementation(() => {
      return { get: mockSaveAndSignOutGetController };
    }),
  };
});

const mockTimedOutGetController = jest.fn();
jest.mock('./steps/timed-out/get', () => {
  return {
    TimedOutGetController: jest.fn().mockImplementation(() => {
      return { get: mockTimedOutGetController };
    }),
  };
});

const mockTaskListGetController = jest.fn();
jest.mock('./steps/task-list/get', () => {
  return {
    TaskListGetController: jest.fn().mockImplementation(() => {
      return { get: mockTaskListGetController };
    }),
  };
});

const mockKeepAliveController = jest.fn();
jest.mock('./app/keepalive/KeepAliveController', () => {
  return {
    KeepAliveController: jest.fn().mockImplementation(() => {
      return { get: mockKeepAliveController };
    }),
  };
});

describe('Routes', () => {
  let appMock;

  beforeEach(() => {
    appMock = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      use: jest.fn(),
      locals: {
        errorHandler: jest.fn(arg => arg),
      },
    } as unknown as Application;
    new Routes().enableFor(appMock);
  });

  test('should setup routes', () => {
    expect(appMock.get).toHaveBeenCalledWith('/csrf-token-error', mockCSRFTokenError);
    expect(appMock.get).toHaveBeenCalledWith('/', mockHomeGetController);
    expect(appMock.get).toHaveBeenCalledWith('/save-and-sign-out', mockSaveAndSignOutGetController);
    expect(appMock.get).toHaveBeenCalledWith('/timed-out', mockTimedOutGetController);
    expect(appMock.get).toHaveBeenCalledWith('/task-list', mockTaskListGetController);
    expect(appMock.get).toHaveBeenCalledWith('/keep-alive', mockKeepAliveController);
    expect(appMock.use).toHaveBeenCalledWith(mockNotFound);
  });
});
