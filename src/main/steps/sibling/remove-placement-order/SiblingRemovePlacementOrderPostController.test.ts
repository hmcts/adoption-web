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
import { YesOrNo } from '../../../app/case/definition';

import SiblingRemovePlacementOrderPostController from './SiblingRemovePlacementOrderPostController';

describe('SiblingRemovePlacementOrderPostController', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({
      session: {
        userCase: {
          id: 'MOCK_ID',
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
    controller = new SiblingRemovePlacementOrderPostController({});
  });

  describe('when there are no form errors', () => {
    describe('and when there is a selectedSiblingId and selectedSiblingPoId', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({ confirm: YesOrNo.YES });
        mockGetErrors.mockReturnValue([]);
        controller = new SiblingRemovePlacementOrderPostController({});
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      test('should update the siblings array', async () => {
        await controller.post(req, res);
        expect(req.session.errors).toEqual([]);
        expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
          'MOCK_ID',
          { selectedSiblingId: undefined, selectedSiblingPoId: undefined, siblings: [] },
          'citizen-update-application'
        );
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
});
