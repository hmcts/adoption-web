const mockGetParsedBody = jest.fn();
const mockGetErrors = jest.fn();

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { PostController } from '../../../app/controller/PostController';
import { HOME_URL, LA_PORTAL_KBA_CASE_REF } from '../../urls';

import SaveAndReloginPostController from './post';

describe('SaveAndReloginPostController', () => {
  let req;
  let laReq;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({
      session: {
        save: jest.fn(done => done()),
        destroy: jest.fn((cb: () => void) => cb()),
      },
    });
    laReq = mockRequest({
      session: {
        save: jest.fn(done => done()),
        destroy: jest.fn((cb: () => void) => cb()),
      },
      query: {
        isLa: 'true',
      },
    });
    res = mockResponse();
    controller = new SaveAndReloginPostController({});
  });

  test('should extend SaveAndReloginPostController', async () => {
    expect(controller).toBeInstanceOf(PostController);
  });

  describe('when there are no form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({});
      mockGetErrors.mockReturnValue([]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('and when there is citizen user action', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({});
        mockGetErrors.mockReturnValue([]);
        controller = new SaveAndReloginPostController({});
      });

      test('Calling SaveAndReloginPostController.post', async () => {
        await controller.post(req, res);
        expect(req.session.errors).toEqual(undefined);
        expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
      });
    });

    describe('and when there is LA user action', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({});
        mockGetErrors.mockReturnValue([]);
        controller = new SaveAndReloginPostController({});
      });

      test('Calling SaveAndReloginPostController.post', async () => {
        await controller.post(laReq, res);
        expect(laReq.session.errors).toEqual(undefined);
        expect(res.redirect).toHaveBeenCalledWith(LA_PORTAL_KBA_CASE_REF);
      });
    });
  });
});
