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
    req = mockRequest({
      session: { userCase: { selectedSiblingId: 'MOCK_SIBLING_ID', siblings: [{ siblingId: 'MOCK_SIBLING_ID' }] } },
    });
    res = mockResponse();
  });

  describe('when there is a selectedSiblingId in userCase', () => {
    test('should not generate random placementOrderId', async () => {
      req = mockRequest({
        session: {
          userCase: {
            selectedSiblingId: 'MOCK_SIBLING_ID',
            siblings: [{ siblingId: 'MOCK_SIBLING_ID' }],
          },
        },
      });
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedSiblingId: 'MOCK_SIBLING_ID',
        siblings: [{ siblingPoId: 'MOCK_PLACEMENT_ORDER_ID' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.selectedSiblingId).toBe('MOCK_SIBLING_ID');
    });
  });

  describe('when there is "change" query param', () => {
    beforeEach(() => {
      req = mockRequest({
        query: { change: 'MOCK_SIBLING_ID' },
        session: { userCase: { selectedSiblingId: 'MOCK_SIBLING_ID', siblings: [{ siblingId: 'MOCK_SIBLING_ID' }] } },
      });
      req.url = '/request?change=MOCK_ID';
    });

    test('should set the selectedSiblingId in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({ selectedSiblingId: 'MOCK_ID' });
      await controller.get(req, res);
      expect(req.session.userCase.selectedSiblingId).toBe('MOCK_SIBLING_ID');
    });
  });

  describe('when there is "remove" query param', () => {
    beforeEach(() => {
      req = mockRequest({
        query: { remove: 'MOCK_SIBLING_ID' },
        session: { userCase: { selectedSiblingId: 'MOCK_SIBLING_ID', siblings: [{ siblingId: 'MOCK_SIBLING_ID' }] } },
      });
      req.url = '/request?remove=MOCK_ID';
    });

    test('should set the selectedSiblingId in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({ selectedSiblingId: 'MOCK_ID' });
      await controller.get(req, res);
      expect(req.session.userCase.selectedSiblingId).toBe('MOCK_ID');
    });
  });

  test('saves the placementOrders and selectedSiblingId in session', async () => {
    await controller.get(req, res);
    expect(req.session.save).toHaveBeenCalled();
  });
});
