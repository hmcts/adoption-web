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

import NationalityPostController from './post';

describe('applicant1 > NationalityPostController', () => {
  let req;
  let res;
  let controller;

  beforeEach(() => {
    req = mockRequest({
      session: {
        userCase: {
          applicant1AdditionalNationalities: [],
        },
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();
    controller = new NationalityPostController({});
  });

  describe('when there are no form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({});
      mockGetErrors.mockReturnValue([]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('and when addButton is pressed', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({ addButton: 'addButton' });
        mockGetErrors.mockReturnValue([]);
        controller = new NationalityPostController({});
      });

      describe('and when addAnotherNationality is present in formData', () => {
        beforeEach(() => {
          mockGetParsedBody.mockReturnValue({ addButton: 'addButton', addAnotherNationality: 'MOCK_COUNTRY' });
          mockGetErrors.mockReturnValue([]);
          controller = new NationalityPostController({});
        });

        test('should add the country in userCase applicant1AdditionalNationalities session data', async () => {
          await controller.post(req, res);
          expect(req.session.errors).toEqual([]);
          expect(req.session.userCase.applicant1AdditionalNationalities).toEqual(['MOCK_COUNTRY']);
          expect(req.session.save).toHaveBeenCalled();
        });
      });
    });

    describe('and when addButton is not pressed', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({});
        mockGetErrors.mockReturnValue([]);
        controller = new NationalityPostController({});
      });

      test('should add the country in userCase applicant1AdditionalNationalities session data', async () => {
        await controller.post(req, res);
        expect(req.session.errors).toEqual([]);
        expect(req.session.userCase.applicant1AdditionalNationalities).toEqual([]);
        expect(req.session.save).toHaveBeenCalled();
        expect(mockGetNextStepUrl).toHaveBeenCalledWith(req, { applicant1AdditionalNationalities: [] });
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
          userCase: {},
          save: jest.fn(done => done()),
        },
      });
      res = mockResponse();
      mockGetParsedBody.mockReturnValue({ addButton: 'addButton', addAnotherNationality: 'MOCK_COUNTRY' });
      mockGetErrors.mockReturnValue([]);
      controller = new NationalityPostController((): FormFields => ({}));
    });

    test('should set the formData fields in userCase applicant1AdditionalNationalities session data', async () => {
      await controller.post(req, res);
      expect(req.session.errors).toEqual([]);
      expect(req.session.userCase.applicant1AdditionalNationalities).toEqual(['MOCK_COUNTRY']);
      expect(req.session.save).toHaveBeenCalled();
    });
  });
});
