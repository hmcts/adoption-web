import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { generateContent } from '../placement-order-number/content';

import PlacementOrderGetController from './get';

describe('PlacementOrderGetController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    Date.now = jest.fn(() => +new Date('2021-01-01'));
    controller = new PlacementOrderGetController(__dirname + '../../common/template', generateContent);
    req = mockRequest({ session: { userCase: { placementOrders: [] } } });
    res = mockResponse();
  });

  describe('when there is no selectedPlacementOrderId in userCase', () => {
    test('should generate random placementOrderId', async () => {
      await controller.get(req, res);
      expect(req.session.userCase.selectedPlacementOrderId).toBe('1609459200000');
    });
  });

  describe('when there is a selectedPlacementOrderId in userCase', () => {
    test('should not generate random placementOrderId', async () => {
      req = mockRequest({ session: { userCase: { selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID' } } });
      await controller.get(req, res);
      expect(req.session.userCase.selectedPlacementOrderId).toBe('MOCK_PLACEMENT_ORDER_ID');
    });
  });

  describe('when there is no placementOrder with selectedPlacementOrderId in userCase', () => {
    test('should create a blank placementOrder with generated placementOrderId', async () => {
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
      await controller.get(req, res);
      expect(req.session.userCase.placementOrders).toEqual([{ placementOrderId: 'MOCK_ID' }]);
    });

    test('should reset the addAnotherPlacementOrder in userCase', async () => {
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
