jest.mock('config');
import config from 'config';
import { Application } from 'express';

import { getDraftCaseFromStore, saveDraftCase } from '../draft-store/draft-store-service';

describe('session', () => {
  let mockApp;
  let mockAppUndefined;
  let req;

  beforeEach(() => {
    config.get = jest.fn().mockImplementationOnce(() => 'MOCK_SECRET');
    mockApp = {
      locals: {
        draftStoreClient: {
          get: jest.fn().mockResolvedValue('{ "id": "MOCK" }'),
          set: jest.fn().mockResolvedValue('{ "id": "MOCK" }'),
        },
      },
      use: jest.fn(callback => callback),
    } as unknown as Application;
    req = {
      app: mockApp,
      session: {
        userCase: { id: 'MOCK' },
      },
    };
    mockAppUndefined = {
      locals: {
        draftStoreClient: {
          get: jest.fn().mockResolvedValue(undefined),
        },
      },
      use: jest.fn(callback => callback),
    } as unknown as Application;
  });

  test('should successfully save data', async () => {
    const returnData = await saveDraftCase(req, '', {});
    expect(returnData).toBe(req.session.userCase);
  });

  test('should successfully return expected data', async () => {
    req.userCase = { id: 'MOCK' };
    const returnData = await getDraftCaseFromStore(req, '');
    expect(returnData).toStrictEqual({ id: 'MOCK' });
  });

  test('should successfully return undefined', async () => {
    req.app = mockAppUndefined;
    const returnData = await getDraftCaseFromStore(req, '');
    expect(returnData).toBe(undefined);
  });
});
