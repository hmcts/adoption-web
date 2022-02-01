import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { generateContent } from '../placement-order-number/content';

import SiblingPlacementOrderGetController from './get';

describe('SiblingPlacementOrderGetController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    Date.now = jest.fn(() => +new Date('2021-01-01'));
    controller = new SiblingPlacementOrderGetController(__dirname + '../../common/template', generateContent);
    req = mockRequest({ session: { userCase: { siblings: [] } } });
    res = mockResponse();
  });

  describe('when there is no selectedSiblingPoId in userCase', () => {
    test('should generate random placementOrderId', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedSiblingPoId: '1609459200000',
        siblings: [{ siblingPlacementOrders: [{ placementOrderId: '1609459200000' }] }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.selectedSiblingPoId).toBe('1609459200000');
    });
  });

  describe('when there is a selectedSiblingPoId in userCase', () => {
    test('should not generate random placementOrderId', async () => {
      req = mockRequest({ session: { userCase: { selectedSiblingPoId: 'MOCK_PLACEMENT_ORDER_ID' } } });
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedSiblingPoId: 'MOCK_PLACEMENT_ORDER_ID',
        siblings: [{ siblingPlacementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID' }] }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.selectedSiblingPoId).toBe('MOCK_PLACEMENT_ORDER_ID');
    });
  });

  describe('when there is no placementOrder with selectedSiblingPoId in userCase', () => {
    test('should create a blank placementOrder with generated placementOrderId', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedSiblingPoId: '1609459200000',
        siblings: [{ siblingPlacementOrders: [{ placementOrderId: '1609459200000' }] }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.siblings).toEqual([
        { siblingPlacementOrders: [{ placementOrderId: '1609459200000' }] },
      ]);
      expect(req.session.userCase.selectedSiblingPoId).toEqual('1609459200000');
    });
  });

  describe('when there is a placementOrder with selectedSiblingPoId in userCase', () => {
    test('should not create a blank placementOrder', async () => {
      req = mockRequest({
        session: {
          userCase: {
            selectedSiblingId: 'MOCK_SIBLING_ID',
            selectedSiblingPoId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID',
            siblings: [
              {
                siblingId: 'MOCK_SIBLING_ID',
                siblingPlacementOrders: [{ placementOrderId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID' }],
              },
            ],
          },
        },
      });
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedSiblingId: 'MOCK_SIBLING_ID',
        selectedSiblingPoId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID',
        siblings: [
          {
            siblingId: 'MOCK_SIBLING_ID',
            siblingPlacementOrders: [{ placementOrderId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID' }],
          },
        ],
      });

      await controller.get(req, res);
      expect(req.session.userCase.siblings).toEqual([
        {
          siblingId: 'MOCK_SIBLING_ID',
          siblingPlacementOrders: [{ placementOrderId: 'MOCK_SIBLING_PLACEMENT_ORDER_ID' }],
        },
      ]);
      expect(req.session.userCase.selectedSiblingPoId).toEqual('MOCK_SIBLING_PLACEMENT_ORDER_ID');
    });
  });

  describe('when there is "add" query param', () => {
    beforeEach(() => {
      req = mockRequest({
        query: { add: 'MOCK_ID' },
        session: { userCase: { siblings: [{ siblingPlacementOrders: [] }] } },
      });
      req.url = '/request?add=MOCK_ID';
    });

    test('should create a blank placementOrder with "add" query param\'s value as placementOrderId', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedSiblingPoId: 'MOCK_ID',
        siblings: [{ siblingPlacementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID' }] }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.selectedSiblingPoId).toEqual('MOCK_ID');
      expect(req.session.userCase.siblings).toEqual([
        { siblingPlacementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID' }] },
      ]);
    });

    test('should reset the addAnotherPlacementOrder in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({ selectedSiblingPoId: 'MOCK_ID' });
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

    test('should set the selectedSiblingPoId in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({ selectedSiblingPoId: 'MOCK_ID' });
      await controller.get(req, res);
      expect(req.session.userCase.selectedSiblingPoId).toBe('MOCK_ID');
    });
  });

  describe('when there is "remove" query param', () => {
    beforeEach(() => {
      req = mockRequest({
        query: { remove: 'MOCK_ID2' },
        session: {
          userCase: {
            addAnotherSiblingPlacementOrder: 'Yes',
            selectedSiblingPoId: 'MOCK_ID2',
            siblings: [
              {
                siblingPlacementOrders: [
                  { placementOrderId: 'MOCK_ID' },
                  { placementOrderId: 'MOCK_ID2' },
                  { placementOrderId: 'MOCK_ID3' },
                ],
              },
            ],
          },
        },
      });
      req.url = '/request?change=MOCK_ID2';
    });

    test('should remove the placementOrder from userCase placementOrders list', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({
        siblings: [{ siblingPlacementOrders: [{ placementOrderId: 'MOCK_ID' }, { placementOrderId: 'MOCK_ID3' }] }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.siblings).toEqual([
        {
          siblingPlacementOrders: [{ placementOrderId: 'MOCK_ID' }, { placementOrderId: 'MOCK_ID3' }],
        },
      ]);
    });

    test('should set the selectedSiblingPoId in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({ selectedSiblingPoId: 'MOCK_ID' });
      await controller.get(req, res);
      expect(req.session.userCase.selectedSiblingPoId).toBe('MOCK_ID');
    });
  });

  test('saves the placementOrders and selectedSiblingPoId in session', async () => {
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
