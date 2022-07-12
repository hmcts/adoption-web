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
import { FormFields } from '../../../app/form/Form';

import PlacementOrderPostController from './PlacementOrderPostController';

describe('PlacementOrderPostController', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({
      session: {
        userCase: {
          placementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID' }],
          selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
          selectedPlacementOrderType: 'MOCK_PLACEMENT_ORDER_TYPE',
        },
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();
    controller = new PlacementOrderPostController({});
  });

  describe('when there are no form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({});
      mockGetErrors.mockReturnValue([]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('and when there is a selectedPlacementOrderId', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({
          placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
          selectedPlacementOrderType: 'MOCK_PLACEMENT_ORDER_TYPE',
        });
        mockGetErrors.mockReturnValue([]);
        controller = new PlacementOrderPostController({});
        req.locals.api.triggerEvent.mockResolvedValue({
          selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
          selectedPlacementOrderType: 'MOCK_PLACEMENT_ORDER_TYPE',
          placementOrders: [
            {
              placementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
              placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
              placementOrderType: 'MOCK_PLACEMENT_ORDER_TYPE',
              otherPlacementOrderType: 'MOCK_PLACEMENT_OTHER_ORDER_TYPE',
            },
          ],
        });
      });

      test('should set the formData fields in userCase placementOrders session data', async () => {
        await controller.post(req, res);
        expect(req.session.errors).toEqual([]);
        expect(req.session.userCase.placementOrders).toEqual([
          {
            placementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
            placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
            placementOrderType: 'MOCK_PLACEMENT_ORDER_TYPE',
            otherPlacementOrderType: 'MOCK_PLACEMENT_OTHER_ORDER_TYPE',
          },
        ]);
        expect(req.session.save).toHaveBeenCalled();
      });

      test('should set the formData selectedPlacementOrderType in userCase placementOrders', async () => {
        req.selectedOtherPlacementOrderType = 'MOCK_PLACEMENT_ORDER_TYPE';
        await controller.post(req, res);
        expect(req.session.errors).toEqual([]);
        expect(req.session.userCase.placementOrders).toEqual([
          {
            placementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
            placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
            placementOrderType: 'MOCK_PLACEMENT_ORDER_TYPE',
            otherPlacementOrderType: 'MOCK_PLACEMENT_OTHER_ORDER_TYPE',
          },
        ]);
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
            placementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID' }],
            selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
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
            placementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID' }],
            selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
          },
          save: jest.fn(done => done()),
        },
      });
      res = mockResponse();
      mockGetParsedBody.mockReturnValue({ placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER' });
      mockGetErrors.mockReturnValue([]);
      controller = new PlacementOrderPostController((): FormFields => ({}));
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_NUMBER',
        placementOrders: [
          {
            placementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
            placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
            placementOrderType: 'MOCK_PLACEMENT_ORDER_TYPE',
            otherPlacementOrderType: 'MOCK_PLACEMENT_OTHER_ORDER_TYPE',
          },
        ],
      });
    });

    test('should set the formData fields in userCase placementOrders session data', async () => {
      await controller.post(req, res);
      expect(req.session.errors).toEqual([]);
      expect(req.session.userCase.placementOrders).toEqual([
        {
          placementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
          placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
          placementOrderType: 'MOCK_PLACEMENT_ORDER_TYPE',
          otherPlacementOrderType: 'MOCK_PLACEMENT_OTHER_ORDER_TYPE',
        },
      ]);
      expect(req.session.save).toHaveBeenCalled();
    });
  });
});
