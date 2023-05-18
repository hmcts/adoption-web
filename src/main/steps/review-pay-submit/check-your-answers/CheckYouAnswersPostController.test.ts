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
import moment from 'moment';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import * as caseApi from '../../../app/case/CaseApi';
import { STATEMENT_OF_TRUTH } from '../../urls';

import CheckYouAnswersPostController from './CheckYouAnswersPostController';

const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');

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

  describe('when there is no submitted cases today object', () => {
    const caseApiMockFn = {
      getCases: jest.fn(() => {
        return [
          {
            id: '123456',
            state: 'Submitted',
            case_data: { applyingWith: 'alone' },
            dateSubmitted: '2023-04-02',
          },
          {
            id: '123456',
            state: 'Submitted',
            case_data: { applyingWith: 'alone' },
            dateSubmitted: '2023-04-02',
          },
        ];
      }),
      unlinkStaleDraftCaseIfFound: jest.fn(() => {
        return undefined;
      }),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    test('should redirect to same page', async () => {
      await controller.post(req, res);
      expect(res.redirect).toHaveBeenCalledWith(STATEMENT_OF_TRUTH);
    });
  });

  describe('when there is one submitted cases today object', () => {
    const caseApiMockFn = {
      getCases: jest.fn(() => {
        return [
          {
            id: '123456',
            state: 'Submitted',
            case_data: { applyingWith: 'alone', dateSubmitted: moment(new Date()).format('YYYY-MM-DD') },
          },
        ];
      }),
      unlinkStaleDraftCaseIfFound: jest.fn(() => {
        return undefined;
      }),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    test('should redirect to same page', async () => {
      await controller.post(req, res);
      expect(res.redirect).toHaveBeenCalledWith(STATEMENT_OF_TRUTH);
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
