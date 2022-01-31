import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import AdoptionAgencyGetController from './AdoptionAgencyGetController';
import { generateContent } from './content';

describe('AdoptionAgencyGetController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    Date.now = jest.fn(() => +new Date('2021-01-01'));
    controller = new AdoptionAgencyGetController(__dirname + '../../common/template', generateContent);
    req = mockRequest({ session: { userCase: { adopAgencyOrLAs: [] } } });
    res = mockResponse();
  });

  describe('when there is no selectedAdoptionAgencyId in userCase', () => {
    test('should generate random adopAgencyOrLaId', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedAdoptionAgencyId: '1609459200000',
        adopAgencyOrLAs: [{ adopAgencyOrLaId: '1609459200000' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.selectedAdoptionAgencyId).toBe('1609459200000');
    });
  });

  describe('when there is a selectedAdoptionAgencyId in userCase', () => {
    test('should not generate random adopAgencyOrLaId', async () => {
      req = mockRequest({ session: { userCase: { selectedAdoptionAgencyId: 'MOCK_ADOPTION_AGENCY_ID' } } });
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedAdoptionAgencyId: 'MOCK_ADOPTION_AGENCY_ID',
        adopAgencyOrLAs: [{ adopAgencyOrLaId: 'MOCK_ADOPTION_AGENCY_ID' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.selectedAdoptionAgencyId).toBe('MOCK_ADOPTION_AGENCY_ID');
    });
  });

  describe('when there is no adoptionAgency with selectedAdoptionAgencyId in userCase', () => {
    test('should create a blank adoptionAgency with generated adopAgencyOrLaId', async () => {
      req = mockRequest({ session: { userCase: { selectedAdoptionAgencyId: 'MOCK_ADOPTION_AGENCY_ID' } } });
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedAdoptionAgencyId: 'adopAgencyOrLaId',
        adopAgencyOrLAs: [{ adopAgencyOrLaId: 'adopAgencyOrLaId' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.adopAgencyOrLAs).toEqual([{ adopAgencyOrLaId: 'adopAgencyOrLaId' }]);
    });
  });

  describe('when there is a adoptionAgency with selectedAdoptionAgencyId in userCase', () => {
    test('should not create a blank adoptionAgency', async () => {
      req = mockRequest({
        session: {
          userCase: {
            selectedAdoptionAgencyId: 'MOCK_ADOPTION_AGENCY_ID',
            adopAgencyOrLAs: [{ adopAgencyOrLaId: 'MOCK_ADOPTION_AGENCY_ID' }],
          },
        },
      });
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedAdoptionAgencyId: 'MOCK_ADOPTION_AGENCY_ID',
        adopAgencyOrLAs: [{ adopAgencyOrLaId: 'MOCK_ADOPTION_AGENCY_ID' }],
      });

      await controller.get(req, res);
      expect(req.session.userCase.adopAgencyOrLAs).toEqual([{ adopAgencyOrLaId: 'MOCK_ADOPTION_AGENCY_ID' }]);
    });
  });

  describe('when there is "add" query param', () => {
    beforeEach(() => {
      req = mockRequest({ query: { add: 'MOCK_ID' }, session: { userCase: { adopAgencyOrLAs: [] } } });
      req.url = '/request?add=MOCK_ID';
    });

    test('should create a blank adoptionAgency with "add" query param\'s value as adopAgencyOrLaId', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({
        selectedAdoptionAgencyId: 'MOCK_ID',
        adopAgencyOrLAs: [{ adopAgencyOrLaId: 'MOCK_ID' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.adopAgencyOrLAs).toEqual([{ adopAgencyOrLaId: 'MOCK_ID' }]);
    });

    test('should reset the addAnotherPlacementOrder in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({ selectedAdoptionAgencyId: 'MOCK_ID' });
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
      req = mockRequest({ query: { change: 'MOCK_ID' }, session: { userCase: { adopAgencyOrLAs: [] } } });
      req.url = '/request?change=MOCK_ID';
    });

    test('should set the selectedAdoptionAgencyId in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({ selectedAdoptionAgencyId: 'MOCK_ID' });
      await controller.get(req, res);
      expect(req.session.userCase.selectedAdoptionAgencyId).toBe('MOCK_ID');
    });
  });

  describe('when there is "remove" query param', () => {
    beforeEach(() => {
      req = mockRequest({
        query: { remove: 'MOCK_ID2' },
        session: {
          userCase: {
            addAnotherPlacementOrder: 'Yes',
            selectedAdoptionAgencyId: 'MOCK_ID2',
            adopAgencyOrLAs: [
              { adopAgencyOrLaId: 'MOCK_ID' },
              { adopAgencyOrLaId: 'MOCK_ID2' },
              { adopAgencyOrLaId: 'MOCK_ID3' },
            ],
          },
        },
      });
      req.url = '/request?change=MOCK_ID2';
    });

    test('should remove the adoptionAgency from userCase adopAgencyOrLAs list', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({
        adopAgencyOrLAs: [{ adopAgencyOrLaId: 'MOCK_ID' }, { adopAgencyOrLaId: 'MOCK_ID3' }],
      });
      await controller.get(req, res);
      expect(req.session.userCase.adopAgencyOrLAs).toEqual([
        { adopAgencyOrLaId: 'MOCK_ID' },
        { adopAgencyOrLaId: 'MOCK_ID3' },
      ]);
    });

    test('should set the selectedAdoptionAgencyId in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({ selectedAdoptionAgencyId: 'MOCK_ID' });
      await controller.get(req, res);
      expect(req.session.userCase.selectedAdoptionAgencyId).toBe('MOCK_ID');
    });

    test('should reset the addAnotherPlacementOrder in userCase', async () => {
      req.locals.api.triggerEvent.mockResolvedValue({});
      await controller.get(req, res);
      expect(req.session.userCase.addAnotherPlacementOrder).toBeUndefined();
    });
  });

  test('saves the adopAgencyOrLAs and selectedAdoptionAgencyId in session', async () => {
    await controller.get(req, res);
    expect(req.session.save).toHaveBeenCalled();
  });
});
