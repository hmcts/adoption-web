import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { FormContent } from '../../app/form/Form';
import * as steps from '../../steps';
import { SAVE_AND_SIGN_OUT } from '../../steps/urls';
import { Checkbox } from '../case/case';
import { ApplicationType, CITIZEN_SAVE_AND_CLOSE, CITIZEN_UPDATE, Gender } from '../case/definition';
import { isPhoneNoValid } from '../form/validation';

import { PostController } from './PostController';

import Mock = jest.Mock;

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');

describe('PostController', () => {
  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  const mockFormContent = {
    fields: {
      sameSex: {
        type: 'checkboxes',
        values: [{ name: 'sameSex', value: Checkbox.Checked }],
      },
    },
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
      divorceOrDissolution: 'divorce',
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
    const body = { gender: Gender.FEMALE, sameSex: undefined };
    const controller = new PostController(mockFormContent.fields);

    const expectedUserCase = {
      id: '1234',
      divorceOrDissolution: 'divorce',
      gender: 'female',
      sameSex: undefined,
    };

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    await controller.post(req, res);

    console.log(req.session.userCase);
    expect(req.session.userCase).toEqual(expectedUserCase);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { ...body }, CITIZEN_UPDATE);

    expect(getNextStepUrlMock).toBeCalledWith(req, expectedUserCase);
    expect(res.redirect).toBeCalledWith('/next-step-url');
    expect(req.session.errors).toStrictEqual([]);
  });

  test('Saves the users prayer and statement of truth', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { applicant1IConfirmPrayer: Checkbox.Checked, applicant1IBelieveApplicationIsTrue: Checkbox.Checked };

    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_UPDATE);
  });

  it('redirects back to the current page with a session error if there was an problem saving data', async () => {
    const body = { gender: Gender.FEMALE };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockRejectedValueOnce('Error saving');
    const logger = req.locals.logger as unknown as MockedLogger;
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.session.userCase).toEqual({
      id: '1234',
      divorceOrDissolution: 'divorce',
      gender: 'female',
    });
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { gender: 'female' }, CITIZEN_UPDATE);

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
    const body = { gender: Gender.FEMALE };
    const controller = new PostController(mockFormContent.fields);

    const mockSave = jest.fn(done => done('An error while saving session'));
    const req = mockRequest({ body, session: { save: mockSave } });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({ gender: Gender.FEMALE });
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

  test('uses the last (not hidden) input for checkboxes', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { sameSex: [0, Checkbox.Checked] };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({ sameSex: Checkbox.Checked });

    await controller.post(req, res);

    expect(req.session.userCase.sameSex).toEqual(Checkbox.Checked);
  });

  test('Should save the users data and redirect to the next page if the form is valid with parsed body', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { day: '1', month: '1', year: '2000' };
    const controller = new PostController(mockFormContent.fields);

    const expectedUserCase = {
      id: '1234',
      divorceOrDissolution: 'divorce',
      day: '1',
      month: '1',
      year: '2000',
      sameSex: undefined,
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
    const body = { gender: Gender.FEMALE, saveBeforeSessionTimeout: true };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { gender: 'female' }, CITIZEN_UPDATE);

    expect(res.end).toBeCalled();
  });

  it('saves and signs out even if there are errors', async () => {
    const body = { gender: Gender.FEMALE, saveAndSignOut: true };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { user: { email: 'test@example.com' } } });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { gender: 'female', sameSex: null },
      CITIZEN_SAVE_AND_CLOSE
    );

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });

  it('saves and signs out even if was an error saving data', async () => {
    const body = { gender: Gender.FEMALE, saveAndSignOut: true };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { user: { email: 'test@example.com' } } });
    (req.locals.api.triggerEvent as jest.Mock).mockRejectedValue('Error saving');
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { gender: 'female', sameSex: null },
      CITIZEN_SAVE_AND_CLOSE
    );

    expect(res.redirect).toHaveBeenCalledWith(SAVE_AND_SIGN_OUT);
  });

  test('triggers citizen-applicant2-update-application event if user is applicant2', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { gender: Gender.FEMALE };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { gender: 'female' }, CITIZEN_UPDATE);

    expect(res.redirect).toHaveBeenCalledWith('/next-step-url');
  });

  test('triggers citizen-draft-aos event if user is respondent', async () => {
    getNextStepUrlMock.mockReturnValue('/next-step-url');
    const body = { gender: Gender.FEMALE };
    const controller = new PostController(mockFormContent.fields);

    const req = mockRequest({ body });
    req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { gender: 'female' }, CITIZEN_UPDATE);

    expect(res.redirect).toHaveBeenCalledWith('/next-step-url');
  });
});

interface MockedLogger {
  info: Mock;
  error: Mock;
}
