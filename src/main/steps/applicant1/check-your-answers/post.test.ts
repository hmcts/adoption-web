import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import {
  APPLICANT_1_RESUBMIT,
  ApplicationType,
  CITIZEN_INVITE_APPLICANT_2,
  CITIZEN_SUBMIT,
  State,
} from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import CheckYourAnswersPostController from './post';

describe('CheckYourAnswersPostController', () => {
  const mockFormContent = {
    fields: {
      applicant1IConfirmPrayer: {},
      applicant1IBelieveApplicationIsTrue: {},
    },
  } as unknown as FormContent;

  it('triggers CITIZEN_SUBMIT when sole application', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_SUBMIT);
  });

  it('triggers CITIZEN_INVITE_APPLICANT_2 when joint application', async () => {
    const body = {
      applicationType: ApplicationType.JOINT_APPLICATION,
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_INVITE_APPLICANT_2);
  });

  it('triggers APPLICANT_1_RESUBMIT when applicant 1 resubmits', async () => {
    const body = {
      applicationType: ApplicationType.JOINT_APPLICATION,
      state: State.AwaitingApplicant1Response,
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, APPLICANT_1_RESUBMIT);
  });
});
