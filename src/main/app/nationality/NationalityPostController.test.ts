const mockGetParsedBody = jest.fn();
const mockGetErrors = jest.fn();
jest.mock('../form/Form', () => {
  return {
    Form: jest.fn().mockImplementation(() => {
      return { getParsedBody: mockGetParsedBody, getErrors: mockGetErrors };
    }),
  };
});

const mockGetNextStepUrl = jest.fn();
jest.mock('../../steps', () => {
  return { getNextStepUrl: mockGetNextStepUrl };
});

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../case/case';
import { FormFields } from '../form/Form';

import NationalityPostController from './NationalityPostController';

describe('NationalityPostController', () => {
  let req;
  let res;
  let controller;
  const formData = { birthMotherAdditionalNationalities: [] };

  beforeEach(() => {
    Date.now = jest.fn(() => +new Date('2021-01-01'));
    req = mockRequest({
      session: {
        userCase: {
          id: 'MOCK_ID',
          birthMotherAdditionalNationalities: [],
        },
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();
    controller = new NationalityPostController({}, FieldPrefix.BIRTH_MOTHER);
  });

  describe('when there are no form errors', () => {
    beforeEach(() => {
      mockGetParsedBody.mockReturnValue({});
      mockGetErrors.mockReturnValue([]);
      req.locals.api.triggerEvent.mockResolvedValue(formData);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('and when addButton is pressed', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({ addButton: 'addButton' });
        mockGetErrors.mockReturnValue([]);
        controller = new NationalityPostController({}, FieldPrefix.BIRTH_MOTHER);
      });

      describe('and when addAnotherNationality is present in formData', () => {
        beforeEach(() => {
          mockGetParsedBody.mockReturnValue({ addButton: 'addButton', addAnotherNationality: 'MOCK_COUNTRY' });
          mockGetErrors.mockReturnValue([]);
          controller = new NationalityPostController({}, FieldPrefix.BIRTH_MOTHER);
          req.locals.api.triggerEvent.mockResolvedValue({
            ...formData,
            birthMotherAdditionalNationalities: ['MOCK_COUNTRY'],
          });
        });

        test('should add the country in userCase birthMotherAdditionalNationalities session data', async () => {
          await controller.post(req, res);
          expect(req.session.errors).toEqual([]);
          expect(req.session.userCase.birthMotherAdditionalNationalities).toEqual(['MOCK_COUNTRY']);
          expect(req.session.save).toHaveBeenCalled();
        });

        test('should call save with correct params', async () => {
          await controller.post(req, res);
          expect(req.locals.api.triggerEvent).toHaveBeenCalledTimes(1);
          expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
            'MOCK_ID',
            { birthMotherAdditionalNationalities: [{ id: '1609459200000', country: 'MOCK_COUNTRY' }] },
            'citizen-update-application'
          );
        });
      });
    });

    describe('and when addButton is not clicked', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({});
        mockGetErrors.mockReturnValue([]);
        controller = new NationalityPostController({}, FieldPrefix.BIRTH_MOTHER);
        req.locals.api.triggerEvent.mockResolvedValue(formData);
      });

      test('should add the country in userCase birthMotherAdditionalNationalities session data', async () => {
        await controller.post(req, res);
        expect(req.session.errors).toEqual([]);
        expect(req.session.userCase.birthMotherAdditionalNationalities).toEqual([]);
        expect(req.session.save).toHaveBeenCalled();
        expect(mockGetNextStepUrl).toHaveBeenCalledWith(req, {
          birthMotherAdditionalNationalities: [],
        });
      });

      test('should show error for not pressing add button', async () => {
        mockGetParsedBody.mockReturnValue({ addButton: undefined, addAnotherNationality: 'MOCK_COUNTRY3' });
        await controller.post(req, res);
        expect(req.session.errors).toEqual([
          {
            errorType: 'addButtonNotClicked',
            propertyName: 'birthMotherNationality',
          },
        ]);
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
      mockGetParsedBody.mockReturnValue({ addButton: 'addButton', addAnotherNationality: 'MOCK_COUNTRY3' });
      mockGetErrors.mockReturnValue([]);
      controller = new NationalityPostController((): FormFields => ({}), FieldPrefix.BIRTH_MOTHER);
      req.locals.api.triggerEvent.mockResolvedValue({
        ...formData,
        birthMotherAdditionalNationalities: ['MOCK_COUNTRY'],
      });
    });

    test('should set the formData fields in userCase birthMotherAdditionalNationalities session data', async () => {
      await controller.post(req, res);
      expect(req.session.errors).toEqual([]);
      expect(req.session.userCase.birthMotherAdditionalNationalities).toEqual(['MOCK_COUNTRY']);
      expect(req.session.save).toHaveBeenCalled();
    });
  });
});
