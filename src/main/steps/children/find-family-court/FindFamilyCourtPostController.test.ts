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

import FindFamilyCourtPostController from './FindFamilyCourtPostController';

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
    controller = new FindFamilyCourtPostController({});
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
        controller = new FindFamilyCourtPostController({});
        req.locals.api.triggerEvent.mockResolvedValue({
          placementOrderCourt: 'Chelmsford Family Court',
          findFamilyCourt: 'No',
          familyCourtName: 'Chelmsford Family Court',
          familyCourtEmailId: 'chelmsfordadoptionapplication@justice.gov.uk',
        });
      });

      test('should set the formData fields in userCase placementOrders session data', async () => {
        req.body.autoCompleteData = 'Chelmsford Family Court';
        await controller.post(req, res);
        expect(req.session.errors).toEqual([]);
        expect(req.session.userCase.placementOrderCourt).toEqual('Chelmsford Family Court');
        expect(req.session.save).toHaveBeenCalled();
      });

      test('should redirect to correct screen', async () => {
        mockGetNextStepUrl.mockReturnValue('/MOCK_ENDPOINT');
        req.body.autoCompleteData = 'MOCK';
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
      expect(req.session.errors).toEqual([
        'MOCK_ERROR',
        {
          errorType: 'required',
          propertyName: 'familyCourtName',
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

  describe('when this.fields is a function', () => {
    beforeEach(() => {
      req = mockRequest({
        session: {
          userCase: {
            placementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID' }],
          },
          save: jest.fn(done => done()),
        },
      });
      res = mockResponse();
      mockGetParsedBody.mockReturnValue({ adopAgencyOrLaName: 'MOCK_ADOPTION_AGENCY_NAME' });
      mockGetErrors.mockReturnValue([]);
      controller = new FindFamilyCourtPostController((): FormFields => ({}));
      req.locals.api.triggerEvent.mockResolvedValue({
        placementOrders: [
          { placementOrderId: 'MOCK_PLACEMENT_ORDER_ID', placementOrderCourt: 'Chelmsford Family Court' },
        ],
      });
    });

    test('should set the formData fields in userCase placementOrders session data', async () => {
      await controller.post(req, res);
      expect(req.session.errors).toEqual([]);
      expect(req.session.userCase.placementOrders).toEqual([
        { placementOrderCourt: 'Chelmsford Family Court', placementOrderId: 'MOCK_PLACEMENT_ORDER_ID' },
      ]);
      expect(req.session.save).toHaveBeenCalled();
    });
  });
});
