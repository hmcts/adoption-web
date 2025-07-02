import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import * as caseApi from '../../app/case/CaseApi';
import { YesOrNo } from '../../app/case/definition';
import { isFieldFilledIn } from '../../app/form/validation';
import * as steps from '../../steps';

import EligibilityPostController from './EligibilityPostController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextEligibilityStepUrl');
const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');

describe('EligibilityPostController', () => {
  const mockForm = {
    fields: {
      field: {
        type: 'radios',
        values: [
          { label: l => l.no, value: YesOrNo.YES },
          { label: l => l.yes, value: YesOrNo.NO },
        ],
        validator: isFieldFilledIn,
      },
    },
    submit: {
      text: l => l.continue,
    },
    saveAsDraft: {
      text: '',
    },
  };

  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  test('should redirect to applying-with page when usercase is null', async () => {
    const controller = new EligibilityPostController(mockForm.fields);
    const caseApiMockFn = {
      getCaseDetails: jest.fn(() => {
        return { userCase: null, cases: null };
      }),
    };

    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequest({});
    req.url = '/login';
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/applying-with');
  });

  test('should redirect to applying-with page when usercase is in Submitted state', async () => {
    const controller = new EligibilityPostController(mockForm.fields);
    const caseApiMockFn = {
      getCaseDetails: jest.fn(() => {
        return { userCase: { state: 'Submitted' }, cases: null };
      }),
    };

    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequest({});
    req.url = '/login';
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/applying-with');
  });

  test('should redirect to applying-with page when usercase is in LaSubmitted state', async () => {
    const controller = new EligibilityPostController(mockForm.fields);
    const caseApiMockFn = {
      getCaseDetails: jest.fn(() => {
        return { userCase: { state: 'LaSubmitted' }, cases: null };
      }),
    };

    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequest({});
    req.url = '/login';
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/applying-with');
  });

  test('should redirect to home page when usercase is present', async () => {
    const controller = new EligibilityPostController(mockForm.fields);
    const caseApiMockFn = {
      getCaseDetails: jest.fn(() => {
        return { userCase: {}, cases: null };
      }),
    };

    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequest({});
    req.url = '/login';
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/');
  });

  test('Should redirect back to the current page with the form data on errors', async () => {
    const errors = [{ errorType: 'required', propertyName: 'field' }];

    const controller = new EligibilityPostController(mockForm.fields);

    const req = mockRequest({});
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
    expect(getNextStepUrlMock).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(req.path);
    expect(req.session.errors).toEqual(errors);
  });

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
      const controller = new EligibilityPostController({});
      const res = mockResponse();
      const req = mockRequest({
        session: {
          user: { email: 'test@example.com' },
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
});
