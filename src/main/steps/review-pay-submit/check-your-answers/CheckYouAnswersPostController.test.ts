const mockGetParsedBody = jest.fn();
const mockGetErrors = jest.fn();
jest.mock('../../../app/form/Form', () => {
  return {
    Form: jest.fn().mockImplementation(() => {
      return { getParsedBody: mockGetParsedBody, getErrors: mockGetErrors };
    }),
  };
});

const mockGetNextStepUrl = jest.fn();
jest.mock('../../../steps', () => {
  return { getNextStepUrl: mockGetNextStepUrl };
});

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import CheckYouAnswersPostController from './CheckYouAnswersPostController';

describe('CheckYouAnswersPostController', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({
      session: {
        userCase: {
          dateChildMovedIn: { year: '2021', month: '1', day: '1' },
        },
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();
    controller = new CheckYouAnswersPostController({});
  });

  describe('when there are form errors', () => {
    beforeEach(() => {
      req = mockRequest({
        session: {
          userCase: { dateChildMovedIn: { year: '2032', month: '2', day: '1' } },
          save: jest.fn(done => done()),
        },
      });
      res = mockResponse();
      controller = new CheckYouAnswersPostController({});
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should redirect to same page', async () => {
      await controller.post(req, res);
      expect(mockGetNextStepUrl).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });
  });

  describe('when there is no dateChildMovedIn object', () => {
    beforeEach(() => {
      req = mockRequest({
        session: {
          userCase: {},
          save: jest.fn(done => done()),
        },
      });
      res = mockResponse();
      controller = new CheckYouAnswersPostController({});
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should redirect to same page', async () => {
      await controller.post(req, res);
      expect(mockGetNextStepUrl).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });
  });
});
