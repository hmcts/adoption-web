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
import { FormFields } from '../../../app/form/Form';

import SiblingPlacementOrderPostController from './post';

const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');

describe('SiblingPlacementOrderPostController', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({
      session: {
        userCase: {
          siblings: [
            {
              siblingId: 'MOCK_SIBLING_ID',
              siblingFirstName: '',
              siblingLastName: '',
              siblingPlacementOrders: [{ placementOrderId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID' }],
              selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
            },
          ],
          selectedSiblingId: 'MOCK_SIBLING_ID',
          selectedSiblingPoId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID',
        },
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();
    controller = new SiblingPlacementOrderPostController({});
  });

  describe('when there are no form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({});
      mockGetErrors.mockReturnValue([]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('and when there is a selectedSiblingPoId', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({
          placementOrderNumber: 'MOCK_SIBLING_PLACEMENT_ORDER_NUMBER',
          selectedSiblingPoType: 'MOCK_SIBLING_PLACEMENT_TYPE',
        });
        mockGetErrors.mockReturnValue([]);
        controller = new SiblingPlacementOrderPostController({});
        req.locals.api.triggerEvent.mockResolvedValue({
          siblings: [
            {
              siblingId: 'MOCK_SIBLING_ID',
              siblingFirstName: '',
              siblingLastName: '',
              siblingPlacementOrders: [
                {
                  placementOrderId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID',
                  placementOrderNumber: 'MOCK_SIBLING_PLACEMENT_ORDER_NUMBER',
                },
              ],
              selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
            },
          ],
          selectedSiblingId: 'MOCK_SIBLING_ID',
          selectedSiblingPoId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID',
          selectedSiblingPoType: 'MOCK_SIBLING_PLACEMENT_TYPE',
          siblingPlacementOtherType: 'MOCK_SIBLING_PLACEMENT_OTHER_TYPE',
        });
      });

      test('should set the formData fields in userCase placementOrders session data', async () => {
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
            return {
              siblings: [
                {
                  siblingId: 'MOCK_SIBLING_ID',
                  siblingFirstName: '',
                  siblingLastName: '',
                  siblingPlacementOrders: [
                    {
                      placementOrderId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID',
                      placementOrderNumber: 'MOCK_SIBLING_PLACEMENT_ORDER_NUMBER',
                    },
                  ],
                  selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
                },
              ],
              selectedSiblingId: 'MOCK_SIBLING_ID',
              selectedSiblingPoId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID',
              selectedSiblingPoType: 'MOCK_SIBLING_PLACEMENT_TYPE',
              siblingPlacementOtherType: 'MOCK_SIBLING_PLACEMENT_OTHER_TYPE',
            };
          }),
        };
        (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);
        await controller.post(req, res);
        expect(req.session.errors).toEqual([]);
        expect(req.session.userCase).toEqual({
          canPaymentIgnored: true,
          selectedSiblingId: 'MOCK_SIBLING_ID',
          selectedSiblingPoId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID',
          selectedSiblingPoType: 'MOCK_SIBLING_PLACEMENT_TYPE',
          siblingPlacementOtherType: 'MOCK_SIBLING_PLACEMENT_OTHER_TYPE',
          siblings: [
            {
              selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
              siblingFirstName: '',
              siblingId: 'MOCK_SIBLING_ID',
              siblingLastName: '',
              siblingPlacementOrders: [
                {
                  placementOrderId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID',
                  placementOrderNumber: 'MOCK_SIBLING_PLACEMENT_ORDER_NUMBER',
                },
              ],
            },
          ],
        });
        expect(req.session.save).toHaveBeenCalled();
      });

      test('should redirect to correct screen', async () => {
        mockGetNextStepUrl.mockReturnValue('/MOCK_ENDPOINT');
        await controller.post(req, res);
        expect(mockGetNextStepUrl).toHaveBeenCalledWith(req, req.session.userCase);
        expect(res.redirect).toHaveBeenCalledWith('/MOCK_ENDPOINT');
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

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
      req = mockRequest({
        session: {
          userCase: {
            siblings: [
              {
                siblingId: 'MOCK_SIBLING_ID',
                siblingFirstName: '',
                siblingLastName: '',
                siblingPlacementOrders: [{ placementOrderId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID' }],
                selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
              },
            ],
            selectedSiblingId: 'MOCK_SIBLING_ID',
            selectedSiblingPoId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID',
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

  describe('when this.fields is a function', () => {
    beforeEach(() => {
      req = mockRequest({
        session: {
          userCase: {
            siblings: [
              {
                siblingId: 'MOCK_SIBLING_ID',
                siblingFirstName: '',
                siblingLastName: '',
                siblingPlacementOrders: [{ placementOrderId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID' }],
                selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
              },
            ],
            selectedSiblingId: 'MOCK_SIBLING_ID',
            selectedSiblingPoId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID',
          },
          save: jest.fn(done => done()),
        },
      });
      res = mockResponse();
      mockGetParsedBody.mockReturnValue({ placementOrderNumber: 'MOCK_SIBLING_PLACEMENT_ORDER_NUMBER' });
      mockGetErrors.mockReturnValue([]);
      controller = new SiblingPlacementOrderPostController((): FormFields => ({}));
      req.locals.api.triggerEvent.mockResolvedValue({
        siblings: [
          {
            siblingId: 'MOCK_SIBLING_ID',
            siblingFirstName: '',
            siblingLastName: '',
            siblingPlacementOrders: [
              {
                placementOrderId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID',
                placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
              },
            ],
            selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
          },
        ],
        selectedSiblingId: 'MOCK_SIBLING_ID',
        selectedSiblingPoId: 'MOCK_SIBLING_PLACEMENT_ORDER_NUMBER',
      });
    });

    test('should set the formData fields in userCase placementOrders session data', async () => {
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
          return {
            siblings: [
              {
                siblingId: 'MOCK_SIBLING_ID',
                siblingFirstName: '',
                siblingLastName: '',
                siblingPlacementOrders: [
                  {
                    placementOrderId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID',
                    placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
                  },
                ],
                selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
              },
            ],
            selectedSiblingId: 'MOCK_SIBLING_ID',
            selectedSiblingPoId: 'MOCK_SIBLING_PLACEMENT_ORDER_NUMBER',
          };
        }),
      };
      (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);
      await controller.post(req, res);
      expect(req.session.errors).toEqual([]);
      expect(req.session.userCase).toEqual({
        canPaymentIgnored: true,
        siblings: [
          {
            siblingId: 'MOCK_SIBLING_ID',
            siblingFirstName: '',
            siblingLastName: '',
            siblingPlacementOrders: [
              {
                placementOrderId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID',
                placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
              },
            ],
            selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
          },
        ],
        selectedSiblingId: 'MOCK_SIBLING_ID',
        selectedSiblingPoId: 'MOCK_SIBLING_PLACEMENT_ORDER_NUMBER',
      });
      expect(req.session.save).toHaveBeenCalled();
    });
  });
});
