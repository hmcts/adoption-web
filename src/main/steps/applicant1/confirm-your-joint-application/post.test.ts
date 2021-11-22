import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { CITIZEN_SUBMIT } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import ConfirmYourJointApplicationPostController from './post';

describe('ConfirmYourAnswersPostController', () => {
  it('triggers CITIZEN_SUBMIT', async () => {
    const body = {
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
    };
    const mockFormContent = {
      fields: {
        applicant1IConfirmPrayer: {},
        applicant1IBelieveApplicationIsTrue: {},
      },
    } as unknown as FormContent;
    const confirmYourAnswerPostController = new ConfirmYourJointApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body, session: {} });
    const res = mockResponse();
    await confirmYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_SUBMIT);
  });
});
