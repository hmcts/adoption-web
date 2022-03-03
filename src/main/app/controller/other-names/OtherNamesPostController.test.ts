const mockGetParsedBody = jest.fn();
const mockGetErrors = jest.fn();
jest.mock('../../form/Form', () => {
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

const v4Mock = jest.fn();
jest.mock('uuid', () => ({
  v4: v4Mock,
}));

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../../case/case';
import { FormFields } from '../../form/Form';

import OtherNamesPostController from './OtherNamesPostController';

describe('OtherNamesPostController', () => {
  let req;
  let res;
  let controller;
  const formData = { applicant1AdditionalNames: [] };

  beforeEach(() => {
    req = mockRequest({
      session: {
        userCase: {
          id: 'MOCK_ID',
          applicant1AdditionalNames: [],
        },
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();
    controller = new OtherNamesPostController({}, FieldPrefix.APPLICANT1);
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
        controller = new OtherNamesPostController({}, FieldPrefix.APPLICANT1);
      });

      describe('and when applicant1OtherFirstNames and applicant1OtherLastNames is present in formData', () => {
        beforeEach(() => {
          v4Mock.mockReturnValue('MOCK_V4_UUID');
          mockGetParsedBody.mockReturnValue({
            addButton: 'addButton',
            applicant1OtherFirstNames: 'MOCK_OTHER_FIRST_NAME',
            applicant1OtherLastNames: 'MOCK_OTHER_LAST_NAME',
          });
          mockGetErrors.mockReturnValue([]);
          controller = new OtherNamesPostController({}, FieldPrefix.APPLICANT1);
          req.locals.api.triggerEvent.mockResolvedValue({
            ...formData,
            applicant1AdditionalNames: [
              {
                firstNames: 'MOCK_OTHER_FIRST_NAME',
                id: 'MOCK_V4_UUID',
                lastNames: 'MOCK_OTHER_LAST_NAME',
              },
            ],
            applicant1OtherFirstNames: 'MOCK_OTHER_FIRST_NAME',
            applicant1OtherLastNames: 'MOCK_OTHER_LAST_NAME',
          });
        });

        test('should add the otherName object in userCase applicant1AdditionalNames session data', async () => {
          req.session.userCase.applicant1AdditionalNames = undefined;
          await controller.post(req, res);
          expect(req.session.errors).toEqual([]);
          expect(req.session.userCase.applicant1AdditionalNames).toEqual([
            {
              firstNames: 'MOCK_OTHER_FIRST_NAME',
              id: 'MOCK_V4_UUID',
              lastNames: 'MOCK_OTHER_LAST_NAME',
            },
          ]);
          expect(req.session.save).toHaveBeenCalled();
        });

        test('should call save with correct params', async () => {
          await controller.post(req, res);
          expect(req.locals.api.triggerEvent).toHaveBeenCalledTimes(1);
          expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
            'MOCK_ID',
            {
              applicant1AdditionalNames: [
                {
                  firstNames: 'MOCK_OTHER_FIRST_NAME',
                  id: 'MOCK_V4_UUID',
                  lastNames: 'MOCK_OTHER_LAST_NAME',
                },
              ],
              applicant1OtherFirstNames: 'MOCK_OTHER_FIRST_NAME',
              applicant1OtherLastNames: 'MOCK_OTHER_LAST_NAME',
            },
            'citizen-update-application'
          );
        });
      });
    });

    describe('and when addButton is not pressed', () => {
      beforeEach(() => {
        mockGetParsedBody.mockReturnValue({});
        mockGetErrors.mockReturnValue([]);
        controller = new OtherNamesPostController({}, FieldPrefix.APPLICANT1);
        req.locals.api.triggerEvent.mockResolvedValue(formData);
      });

      test('should not add the additionalNames in userCase applicant1AdditionalNames session data', async () => {
        await controller.post(req, res);
        expect(req.session.errors).toEqual([]);
        expect(req.session.userCase.applicant1AdditionalNames).toEqual([]);
        expect(req.session.save).toHaveBeenCalled();
        expect(mockGetNextStepUrl).toHaveBeenCalledWith(req, {
          applicant1AdditionalNames: [],
        });
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
      req.body.addButton = 'true';
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

  describe('when this.fields is a function', () => {
    beforeEach(() => {
      req = mockRequest({
        session: {
          userCase: {},
          save: jest.fn(done => done()),
        },
      });
      res = mockResponse();
      mockGetParsedBody.mockReturnValue({
        applicant1AdditionalNames: [
          {
            firstNames: 'MOCK_OTHER_FIRST_NAME',
            id: 'MOCK_V4_UUID',
            lastNames: 'MOCK_OTHER_LAST_NAME',
          },
        ],
        applicant1OtherFirstNames: 'MOCK_OTHER_FIRST_NAME',
        applicant1OtherLastNames: 'MOCK_OTHER_LAST_NAME',
      });
      mockGetErrors.mockReturnValue(['MOCK_ERROR']);
      controller = new OtherNamesPostController((): FormFields => ({}), FieldPrefix.APPLICANT1);
      req.locals.api.triggerEvent.mockResolvedValue({
        ...formData,
        applicant1AdditionalNames: [
          {
            firstNames: 'MOCK_OTHER_FIRST_NAME',
            id: 'MOCK_V4_UUID',
            lastNames: 'MOCK_OTHER_LAST_NAME',
          },
        ],
        applicant1OtherFirstNames: 'MOCK_OTHER_FIRST_NAME',
        applicant1OtherLastNames: 'MOCK_OTHER_LAST_NAME',
      });
    });

    test('should set the formData fields in userCase applicant1AdditionalNames session data', async () => {
      await controller.post(req, res);
      expect(req.session.errors).toEqual(['MOCK_ERROR']);
      expect(req.session.userCase.applicant1AdditionalNames).toEqual([
        {
          firstNames: 'MOCK_OTHER_FIRST_NAME',
          id: 'MOCK_V4_UUID',
          lastNames: 'MOCK_OTHER_LAST_NAME',
        },
      ]);
      expect(req.session.save).toHaveBeenCalled();
    });
  });
});
