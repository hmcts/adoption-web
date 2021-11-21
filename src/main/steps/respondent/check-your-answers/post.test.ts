import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { SUBMIT_AOS } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import CheckYourAnswersPostController from './post';

describe('CheckYourAnswersPostController', () => {
  it('triggers CITIZEN_SUBMIT', async () => {
    const body = {
      applicant2IBelieveApplicationIsTrue: Checkbox.Checked,
    };
    const mockFormContent = {
      fields: {
        applicant2IBelieveApplicationIsTrue: {},
      },
    } as unknown as FormContent;
    const checkYourAnswerPostController = new CheckYourAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, SUBMIT_AOS);
  });
});
