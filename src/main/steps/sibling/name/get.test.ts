import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { generateContent } from '../placement-order-number/content';

import SiblingGetController from './get';

describe('SiblingGetController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    Date.now = jest.fn(() => +new Date('2021-01-01'));
    controller = new SiblingGetController(__dirname + '../../common/template', generateContent);
    req = mockRequest({ session: { userCase: { placementOrders: [] } } });
    res = mockResponse();
  });

  describe('when there is no selectedPlacementOrderId in userCase', () => {
    test('should generate random placementOrderId', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedPlacementOrderId: '1609459200000',
        placementOrders: [{ placementOrderId: '1609459200000' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.selectedPlacementOrderId).toBe('1609459200000');
    });
  });

  describe('when there is a selectedPlacementOrderId in userCase', () => {
    test('should not generate random placementOrderId', async () => {
      req = mockRequest({ session: { userCase: { selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID' } } });
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
        placementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.selectedPlacementOrderId).toBe('MOCK_PLACEMENT_ORDER_ID');
    });
  });

  describe('when there is no placementOrder with selectedPlacementOrderId in userCase', () => {
    test('should create a blank placementOrder with generated placementOrderId', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedPlacementOrderId: '1609459200000',
        placementOrders: [{ placementOrderId: '1609459200000' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.placementOrders).toEqual([{ placementOrderId: '1609459200000' }]);
    });
  });

  describe('when there is a placementOrder with selectedPlacementOrderId in userCase', () => {
    test('should not create a blank placementOrder', async () => {
      req = mockRequest({
        session: {
          userCase: {
            selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
            placementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID' }],
          },
        },
      });
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
        placementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID' }],
      });

      await controller.get(req, res);
      expect(req.session.userCase.placementOrders).toEqual([{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID' }]);
    });
  });

  describe('when there is "add" query param', () => {
    beforeEach(() => {
      req = mockRequest({ query: { add: 'MOCK_ID' }, session: { userCase: { placementOrders: [] } } });
      req.url = '/request?add=MOCK_ID';
    });

    test('should create a blank placementOrder with "add" query param\'s value as placementOrderId', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedPlacementOrderId: 'MOCK_ID',
        placementOrders: [{ placementOrderId: 'MOCK_ID' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.placementOrders).toEqual([{ placementOrderId: 'MOCK_ID' }]);
    });

    test('should reset the addAnotherPlacementOrder in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({ selectedPlacementOrderId: 'MOCK_ID' });
      await controller.get(req, res);
      expect(req.session.userCase.addAnotherPlacementOrder).toBeUndefined();
    });

    test('should remove the query param and redirect', async () => {
      await controller.get(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });
  });

  describe('when there is "change" query param', () => {
    beforeEach(() => {
      req = mockRequest({ query: { change: 'MOCK_ID' }, session: { userCase: { placementOrders: [] } } });
      req.url = '/request?change=MOCK_ID';
    });

    test('should set the selectedPlacementOrderId in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({ selectedPlacementOrderId: 'MOCK_ID' });
      await controller.get(req, res);
      expect(req.session.userCase.selectedPlacementOrderId).toBe('MOCK_ID');
    });

    test('should remove the query param and redirect', async () => {
      await controller.get(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });
  });

  describe('when there is "remove" query param', () => {
    beforeEach(() => {
      req = mockRequest({
        query: { remove: 'MOCK_ID2' },
        session: {
          userCase: {
            addAnotherPlacementOrder: 'Yes',
            selectedPlacementOrderId: 'MOCK_ID2',
            placementOrders: [
              { placementOrderId: 'MOCK_ID' },
              { placementOrderId: 'MOCK_ID2' },
              { placementOrderId: 'MOCK_ID3' },
            ],
          },
        },
      });
      req.url = '/request?change=MOCK_ID2';
    });

    test('should remove the placementOrder from userCase placementOrders list', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({
        placementOrders: [{ placementOrderId: 'MOCK_ID' }, { placementOrderId: 'MOCK_ID3' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.placementOrders).toEqual([
        { placementOrderId: 'MOCK_ID' },
        { placementOrderId: 'MOCK_ID3' },
      ]);
    });

    test('should set the selectedPlacementOrderId in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({ selectedPlacementOrderId: 'MOCK_ID' });
      await controller.get(req, res);
      expect(req.session.userCase.selectedPlacementOrderId).toBe('MOCK_ID');
    });

    test('should reset the addAnotherPlacementOrder in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({});
      await controller.get(req, res);
      expect(req.session.userCase.addAnotherPlacementOrder).toBeUndefined();
    });

    test('should remove the query param and redirect', async () => {
      await controller.get(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });
  });

  test('saves the placementOrders and selectedPlacementOrderId in session', async () => {
    await controller.get(req, res);
    expect(req.session.save).toHaveBeenCalled();
  });

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
      req = mockRequest({
        session: {
          user: { email: 'test@example.com' },
          save: jest.fn(done => done('MOCK_ERROR')),
        },
      });
      try {
        await controller.get(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBe('MOCK_ERROR');
      }
    });
  });
});
