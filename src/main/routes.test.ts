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
    expect(appMock.use).toHaveBeenCalledWith(mockNotFound);
  });
});
