import { Application } from 'express';

import { Routes } from './routes';

describe('Routes', () => {
  it('sets up dynamic step sequence routes', () => {
    const appMock = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      use: jest.fn(),
      locals: {
        errorHandler: jest.fn(),
      },
    } as unknown as Application;

    new Routes().enableFor(appMock);

    expect(appMock.locals.errorHandler).toHaveBeenCalled();

    expect(appMock.get).toHaveBeenCalledWith('/', undefined);
    expect(appMock.get).toHaveBeenCalledWith('/number-of-children', undefined);

    expect(appMock.use).toHaveBeenCalled();
  });
});
