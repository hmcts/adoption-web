import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { APPLICANT_2_APPROVE, ApplicationType } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import ConfirmYourJointApplicationPostController from './post';

describe('ConfirmYourAnswersPostController', () => {
  it('triggers APPLICANT_2_APPROVED', async () => {
    const body = {
      applicant1IConfirmPrayer: '',
      applicant1IBelieveApplicationIsTrue: '',
      applicationType: ApplicationType.JOINT_APPLICATION,
      applicant2IConfirmPrayer: Checkbox.Checked,
      applicant2IBelieveApplicationIsTrue: Checkbox.Checked,
    };
    const mockFormContent = {
      fields: {
        applicant2IConfirmPrayer: {},
        applicant2IBelieveApplicationIsTrue: {},
      },
    } as unknown as FormContent;
    const confirmYourAnswerPostController = new ConfirmYourJointApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body, session: {} });
    const res = mockResponse();
    await confirmYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, APPLICANT_2_APPROVE);
  });
});
