import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import SiblingGetController from './SiblingGetController';
import { generateContent } from './content';

describe('SiblingGetController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    Date.now = jest.fn(() => +new Date('2021-01-01'));
    controller = new SiblingGetController(__dirname + '../../common/template', generateContent);
    req = mockRequest({ session: { userCase: { siblings: [] } } });
    res = mockResponse();
  });

  describe('when there is no selectedSiblingId in userCase', () => {
    test('should generate random siblingId', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedSiblingId: '1609459200000',
        siblings: [{ siblingId: '1609459200000' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.selectedSiblingId).toBe('1609459200000');
    });
  });

  describe('when there is a selectedSiblingId in userCase', () => {
    test('should not generate random siblingId', async () => {
      req = mockRequest({ session: { userCase: { selectedSiblingId: 'MOCK_SIBLING_ID' } } });
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedSiblingId: 'MOCK_SIBLING_ID',
        siblings: [{ siblingId: 'MOCK_SIBLING_ID' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.selectedSiblingId).toBe('MOCK_SIBLING_ID');
    });
  });

  describe('when there is no sibling with selectedSiblingId in userCase', () => {
    test('should create a blank sibling with generated siblingId', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedSiblingId: '1609459200000',
        siblings: [{ siblingId: '1609459200000' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.siblings).toEqual([{ siblingId: '1609459200000' }]);
    });
  });

  describe('when there is a sibling with selectedSiblingId in userCase', () => {
    test('should not create a blank sibling', async () => {
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
        siblings: [{ siblingId: 'MOCK_SIBLING_ID' }],
      });

      await controller.get(req, res);
      expect(req.session.userCase.siblings).toEqual([{ siblingId: 'MOCK_SIBLING_ID' }]);
    });
  });

  describe('when there is "add" query param', () => {
    beforeEach(() => {
      req = mockRequest({ query: { add: 'MOCK_ID' }, session: { userCase: { siblings: [] } } });
      req.url = '/request?add=MOCK_ID';
    });

    test('should create a blank sibling with "add" query param\'s value as siblingId', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedSiblingId: 'MOCK_ID',
        siblings: [{ siblingId: 'MOCK_ID' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.siblings).toEqual([{ siblingId: 'MOCK_ID' }]);
    });

    test('should reset the addAnotherSibling in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({ selectedSiblingId: 'MOCK_ID' });
      await controller.get(req, res);
      expect(req.session.userCase.addAnotherSibling).toBeUndefined();
    });

    test('should remove the query param and redirect', async () => {
      await controller.get(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });
  });

  describe('when there is "change" query param', () => {
    beforeEach(() => {
      req = mockRequest({ query: { change: 'MOCK_ID' }, session: { userCase: { siblings: [] } } });
      req.url = '/request?change=MOCK_ID';
    });

    test('should set the selectedSiblingId in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({ selectedSiblingId: 'MOCK_ID' });
      await controller.get(req, res);
      expect(req.session.userCase.selectedSiblingId).toBe('MOCK_ID');
    });

    test('should remove the query param and redirect', async () => {
      await controller.get(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/request');
    });
  });

  test('saves the siblings and selectedSiblingId in session', async () => {
    await controller.get(req, res);
    expect(req.session.save).toHaveBeenCalled();
  });
});
