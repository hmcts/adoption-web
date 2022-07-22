const mockGetParsedBody = jest.fn();
const mockGetErrors = jest.fn();
jest.mock('../../../app/form/Form', () => {
  return {
    Form: jest.fn().mockImplementation(() => {
      return { getParsedBody: mockGetParsedBody, getErrors: mockGetErrors };
    }),
  };
});

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { PostController } from '../../../app/controller/PostController';
import { LA_PORTAL_KBA_CASE_REF } from '../../urls';

import LaPortalKbaPostController from './LaPortalKbaPostController';

describe('la-portal > LaPortalKbaPostController', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({
      session: {
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();
    controller = new LaPortalKbaPostController({});
  });

  test('should extend PostController', async () => {
    expect(controller).toBeInstanceOf(PostController);
  });

  describe('when there are no form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({ caseRef: 'mockValue' });
      mockGetErrors.mockReturnValue([]);
      controller = new LaPortalKbaPostController({});
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should save data in session', async () => {
      await controller.post(req, res);
      expect(req.session.save).toHaveBeenCalled();
      expect(req.session.laPortalKba).toEqual({ caseRef: 'mockValue' });
    });

    test('should redirect to next page', async () => {
      req.url = LA_PORTAL_KBA_CASE_REF;
      req.originalUrl = LA_PORTAL_KBA_CASE_REF;
      await controller.post(req, res);
      expect(req.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/la-portal/start-page');
    });
  });

  describe('when there are form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({ caseRef: 'mockValue' });
      mockGetErrors.mockReturnValue([{ mockErroKey: 'mockErrorValue' }]);
      controller = new LaPortalKbaPostController({});
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should redirect to same page', async () => {
      req.url = LA_PORTAL_KBA_CASE_REF;
      req.originalUrl = LA_PORTAL_KBA_CASE_REF;
      await controller.post(req, res);
      expect(req.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/la-portal/kba-case-ref');
    });
  });

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
      req = mockRequest({
        session: {
          cookie: {},
          save: jest.fn(done => done('MOCK_ERROR')),
        },
      });
      try {
        await controller.post(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBe('MOCK_ERROR');
      }
    });
  });
});
