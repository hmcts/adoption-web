import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { FormContent } from '../../app/form/Form';
import * as draftStoreMock from '../../modules/draft-store/draft-store-service';
import * as steps from '../../steps';
import { LA_PORTAL_CHECK_YOUR_ANSWERS, LA_PORTAL_STATEMENT_OF_TRUTH, SAVE_AND_SIGN_OUT } from '../../steps/urls';
import { ApplicationType, CITIZEN_SAVE_AND_CLOSE, CITIZEN_UPDATE, SYSTEM_USER_UPDATE, State } from '../case/definition';
import { isPhoneNoValid } from '../form/validation';

import { PostController } from './PostController';
jest.mock('../../modules/draft-store/draft-store-service');

import Mock = jest.Mock;

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');
const expectedUserCaseRedis = {
  id: '1234',
  state: State.Draft,
  documentsGenerated: [],
  applicationFeeOrderSummary: { Fees: [], PaymentTotal: '' },
};
const getDraftCaseFromStore = jest.spyOn(draftStoreMock, 'getDraftCaseFromStore');
const saveDraftCase = jest.spyOn(draftStoreMock, 'saveDraftCase');

describe('PostController', () => {
  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should redirect back to the current page with the form data on errors', async () => {
    const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    const body = { applicant1PhoneNumber: 'invalid phone number' };
    const mockPhoneNumberFormContent = {
      fields: {
        applicant1PhoneNumber: {
          type: 'tel',
          validator: isPhoneNoValid,
        },
      },
    } as unknown as FormContent;
    const controller = new PostController(mockPhoneNumberFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase).toEqual({
      id: '1234',
      applicant1PhoneNumber: 'invalid phone number',
    });

    expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
    expect(getNextStepUrlMock).not.toHaveBeenCalled();
    expect(res.redirect).toBeCalledWith(req.path);
    expect(req.session.errors).toEqual(errors);
  });

  test('Should save the users data, update session case from API response and redirect to the next page if the form is valid', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { MOCK_KEY: 'MOCK_VALUE' };
    const controller = new PostController(mockFormContent.fields);

    const expectedUserCase = {
      id: '1234',
      MOCK_KEY: 'MOCK_VALUE',
    };

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase).toEqual(expectedUserCase);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { ...body }, CITIZEN_UPDATE);

    expect(getNextStepUrlMock).toBeCalledWith(req, expectedUserCase);
    expect(res.redirect).toBeCalledWith('/next-step-url');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Saves the users prayer and statement of truth', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = {};

    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    req.session.user.isSystemUser = true;
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, SYSTEM_USER_UPDATE);
  });

  it('redirects back to the current page with a session error if there was an problem saving data', async () => {
    const body = { MOCK_KEY: 'MOCK_VALUE' };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockRejectedValueOnce('Error saving');
    const logger = req.locals.logger as unknown as MockedLogger;
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase).toEqual({
      id: '1234',
      MOCK_KEY: 'MOCK_VALUE',
    });
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { MOCK_KEY: 'MOCK_VALUE' }, CITIZEN_UPDATE);

    expect(getNextStepUrlMock).not.toHaveBeenCalled();
    expect(res.redirect).toBeCalledWith('/request');
    expect(logger.error).toBeCalledWith('Error saving', 'Error saving');

    expect(req.session.errors).toEqual([
      {
        errorType: 'errorSaving',
        propertyName: '*',
      },
    ]);
  });

  test('rejects with an error when unable to save session data', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { MOCK_KEY: 'MOCK_VALUE' };
    const controller = new PostController(mockFormContent.fields);

    const mockSave = jest.fn(done => done('An error while saving session'));
    const req = mockRequest({ body, session: { save: mockSave } });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({ MOCK_KEY: 'MOCK_VALUE' });
    const res = mockResponse();
    await expect(controller.post(req, res)).rejects.toEqual('An error while saving session');

    const userCase = {
      ...req.session.userCase,
      ...body,
    };
    expect(mockSave).toHaveBeenCalled();
    expect(getNextStepUrlMock).toBeCalledWith(req, userCase);
    expect(res.redirect).not.toHaveBeenCalled();
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should save the users data and redirect to the next page if the form is valid with parsed body', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { day: '1', month: '1', year: '2000' };
    const controller = new PostController(mockFormContent.fields);

    const expectedUserCase = {
      id: '1234',
      day: '1',
      month: '1',
      year: '2000',
    };

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase).toEqual(expectedUserCase);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { day: '1', month: '1', year: '2000' },
      CITIZEN_UPDATE
    );

    expect(getNextStepUrlMock).toBeCalledWith(req, expectedUserCase);
    expect(res.redirect).toBeCalledWith('/next-step-url');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Should save the users data and end response for session timeout', async () => {
    const body = { MOCK_KEY: 'MOCK_VALUE', saveBeforeSessionTimeout: true };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { MOCK_KEY: 'MOCK_VALUE' }, CITIZEN_UPDATE);

    expect(res.end).toBeCalled();
  });

  it('saves and signs out even if there are errors', async () => {
    const body = { MOCK_KEY: 'MOCK_VALUE', saveAndSignOut: true };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { user: { email: 'test@example.com' } } });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { MOCK_KEY: 'MOCK_VALUE' },
      CITIZEN_SAVE_AND_CLOSE
    );

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });

  it('saves and signs out even if was an error saving data', async () => {
    const body = { MOCK_KEY: 'MOCK_VALUE', saveAndSignOut: true };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { user: { email: 'test@example.com' } } });
    (req.locals.api.triggerEvent as jest.Mock).mockRejectedValue('Error saving');
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { MOCK_KEY: 'MOCK_VALUE' },
      CITIZEN_SAVE_AND_CLOSE
    );

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });

  test('triggers citizen-applicant2-update-application event if user is applicant2', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = {};
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_UPDATE);

    expect(res.redirect).toHaveBeenCalledWith('/next-step-url');
  });

  test('triggers citizen-draft-aos event if user is respondent', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = {};
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_UPDATE);

    expect(res.redirect).toHaveBeenCalledWith('/next-step-url');
  });

  test('triggers la-portal save request', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    saveDraftCase.mockResolvedValue(expectedUserCaseRedis);
    getDraftCaseFromStore.mockResolvedValue(expectedUserCaseRedis);
    const body = {};
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    req.url = '/la-portal/request';
    req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;
    const res = mockResponse();
    await controller.post(req, res);
    expect(req.session.userCase).toStrictEqual(expectedUserCaseRedis);
  });

  test('triggers la-portal save request check your answers', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = {};
    saveDraftCase.mockResolvedValue(expectedUserCaseRedis);
    getDraftCaseFromStore.mockResolvedValue(expectedUserCaseRedis);
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCaseRedis);
    req.url = LA_PORTAL_CHECK_YOUR_ANSWERS;
    req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;
    const res = mockResponse();
    await controller.post(req, res);
    expect(req.session.userCase).toStrictEqual(expectedUserCaseRedis);
  });

  test('triggers la-portal error response', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');

    getDraftCaseFromStore.mockRejectedValue(new Error('some error'));
    saveDraftCase.mockRejectedValue(expectedUserCaseRedis);
    jest.mock('../../modules/draft-store/draft-store-service', () => {
      jest.fn().mockRejectedValue({});
    });

    const body = {};
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    req.url = '/la-portal/request';
    req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;
    const res = mockResponse();
    await controller.post(req, res);
    expect(req.session.errors).toHaveLength(1);
  });

  test('triggers la-portal error in save request on LA_PORTAL_STATEMENT_OF_TRUTH', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    getDraftCaseFromStore.mockRejectedValue(new Error('some error'));
    saveDraftCase.mockResolvedValue(expectedUserCaseRedis);

    const body = {};
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    req.url = LA_PORTAL_STATEMENT_OF_TRUTH;
    req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;
    const res = mockResponse();
    await controller.post(req, res);
    expect(req.session.errors).toHaveLength(1);
  });

  test('removeCaseFromRedis is triggered on LA_PORTAL_STATEMENT_OF_TRUTH', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    saveDraftCase.mockResolvedValue(expectedUserCaseRedis);
    getDraftCaseFromStore.mockResolvedValue(expectedUserCaseRedis);
    const body = {};
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    req.url = LA_PORTAL_STATEMENT_OF_TRUTH;
    req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;
    const res = mockResponse();
    await controller.post(req, res);
    expect(req.session.errors).toHaveLength(0);
    expect(draftStoreMock.removeCaseFromRedis).toHaveBeenCalled();
  });
});

interface MockedLogger {
  info: Mock;
  error: Mock;
}
