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
import { YesOrNo } from '../../../app/case/definition';

import SiblingRemovePlacementOrderPostController from './SiblingRemovePlacementOrderPostController';

const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');

describe('SiblingRemovePlacementOrderPostController', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({
      session: {
        userCase: {
          id: 'MOCK_ID',
          siblings: [
            {
              siblingId: 'MOCK_SIBLING_ID',
              siblingRelation: '',
              siblingPoType: '',
              siblingPoNumber: '',
            },
          ],
          selectedSiblingId: 'MOCK_SIBLING_ID',
        },
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();
    controller = new SiblingRemovePlacementOrderPostController({});
  });

  describe('when there are no form errors', () => {
    describe('and when there is a selectedSiblingId', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({ confirm: YesOrNo.YES });
        mockGetErrors.mockReturnValue([]);
        controller = new SiblingRemovePlacementOrderPostController({});
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      test('should update the siblings array and save', async () => {
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
          triggerEvent: jest.fn(() => {
            return {
              applicant1AdditionalNames: [
                { id: 'MOCK_ID2', firstNames: 'MOCK_FIRST_NAMES2', lastNames: 'MOCK_LAST_NAMES2' },
              ],
              applicant1HasOtherNames: 'Yes',
            };
          }),
          addPayment: jest.fn(() => {
            return { familyCourtName: 'Chelmsford Family Court' };
          }),
        };
        (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);
        await controller.post(req, res);
        expect(req.session.errors).toEqual([]);
        expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
          'MOCK_ID',
          { selectedSiblingId: undefined, siblings: [] },
          'citizen-update-application'
        );
        expect(req.session.save).toHaveBeenCalled();
      });

      test('should redirect to correct screen', async () => {
        mockGetNextStepUrl.mockReturnValue('/MOCK_ENDPOINT');
        await controller.post(req, res);
        expect(mockGetNextStepUrl).toHaveBeenCalledWith(req, req.session.userCase);
        expect(res.redirect).toHaveBeenCalledWith('/MOCK_ENDPOINT');
      });

      test('should update the siblings array and save when there are more than one sibling placement orders', async () => {
        req = mockRequest({
          session: {
            userCase: {
              id: 'MOCK_ID',
              siblings: [
                {
                  siblingId: 'MOCK_SIBLING_ID',
                },
                {
                  siblingId: 'MOCK_SIBLING_ID2',
                },
              ],
              selectedSiblingId: 'MOCK_SIBLING_ID',
            },
            save: jest.fn(done => done()),
          },
        });
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
          triggerEvent: jest.fn(() => {
            return {
              applicant1AdditionalNames: [
                { id: 'MOCK_ID2', firstNames: 'MOCK_FIRST_NAMES2', lastNames: 'MOCK_LAST_NAMES2' },
              ],
              applicant1HasOtherNames: 'Yes',
            };
          }),
          addPayment: jest.fn(() => {
            return { familyCourtName: 'Chelmsford Family Court' };
          }),
        };
        (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);
        await controller.post(req, res);
        expect(req.session.errors).toEqual([]);
        expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
          'MOCK_ID',
          {
            selectedSiblingId: undefined,
            siblings: [
              {
                siblingId: 'MOCK_SIBLING_ID2',
              },
            ],
          },
          'citizen-update-application'
        );
        expect(req.session.save).toHaveBeenCalled();
      });
    });
  });

  describe('when there are form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({});
      mockGetErrors.mockReturnValue(['MOCK_ERROR']);
      mockGetNextStepUrl.mockReturnValue('/MOCK_ENDPOINT');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should save the errors in session', async () => {
      await controller.post(req, res);
      expect(req.session.errors).toEqual(['MOCK_ERROR']);
      expect(req.session.save).toHaveBeenCalled();
    });

    test('should redirect to same page', async () => {
      await controller.post(req, res);
      expect(mockGetNextStepUrl).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });
  });
});
