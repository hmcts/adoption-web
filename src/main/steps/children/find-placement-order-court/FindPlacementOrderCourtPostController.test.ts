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
import { APPLICANT_SOCIAL_WORKER, CHILDREN_FIND_PLACEMENT_ORDER_COURT, SOCIAL_WORKER } from '../../urls';

import FindPlacementOrderCourtPostController from './FindPlacementOrderCourtPostController';

const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');
describe('FindFamilyCourtPostController', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({
      session: {
        userCase: {
          placementOrderCourt: 'Chelmsford Family Court',
          findFamilyCourt: 'No',
          familyCourtName: 'Chelmsford Family Court',
          familyCourtEmailId: 'chelmsfordadoptionapplication@justice.gov.uk',
        },
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();
    controller = new FindPlacementOrderCourtPostController({});
  });

  describe('when there are no form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({});
      mockGetErrors.mockReturnValue([]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('and when there is a findFamilyCourt=No', () => {
      beforeEach(() => {
        mockGetErrors.mockReturnValue([]);
        controller = new FindPlacementOrderCourtPostController({});
        req.locals.api.triggerEvent.mockResolvedValue({
          placementOrderCourt: 'Chelmsford Family Court',
          findFamilyCourt: 'Yes',
          familyCourtName: 'Chelmsford Family Court',
          familyCourtEmailId: 'chelmsfordadoptionapplication@justice.gov.uk',
        });
      });

      test('should set the formData fields in userCase placementOrders session data', async () => {
        req.body.autoCompleteData = 'Chelmsford Family Court';
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
              familyCourtName: 'Chelmsford Family Court',
            };
          }),
        };
        (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);
        await controller.post(req, res);
        expect(req.session.errors).toEqual([]);
        expect(req.session.userCase.familyCourtName).toEqual('Chelmsford Family Court');
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

    test('should save the errors in session for placementOrderCourt', async () => {
      req.path = CHILDREN_FIND_PLACEMENT_ORDER_COURT;
      await controller.post(req, res);
      expect(req.session.errors).toEqual([
        'MOCK_ERROR',
        {
          errorType: 'required',
          propertyName: 'placementOrderCourt',
          id: 'location-picker',
        },
      ]);
      expect(req.session.save).toHaveBeenCalled();
    });

    test('should save the errors in session for childLocalAuthority', async () => {
      req.path = SOCIAL_WORKER;
      await controller.post(req, res);
      expect(req.session.errors).toEqual([
        'MOCK_ERROR',
        {
          errorType: 'required',
          propertyName: 'childLocalAuthority',
          id: 'location-picker',
        },
      ]);
      expect(req.session.save).toHaveBeenCalled();
    });

    test('should save the errors in session for applicantLocalAuthority', async () => {
      req.path = APPLICANT_SOCIAL_WORKER;
      await controller.post(req, res);
      expect(req.session.errors).toEqual([
        'MOCK_ERROR',
        {
          errorType: 'required',
          propertyName: 'applicantLocalAuthority',
          id: 'location-picker',
        },
      ]);
      expect(req.session.save).toHaveBeenCalled();
    });

    test('should redirect to same page', async () => {
      await controller.post(req, res);
      expect(mockGetNextStepUrl).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });
  });

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
      req = mockRequest({
        session: {
          userCase: {
            placementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID' }],
          },
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
