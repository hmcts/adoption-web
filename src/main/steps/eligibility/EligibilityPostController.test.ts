import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../app/case/definition';
import { isFieldFilledIn } from '../../app/form/validation';
import * as steps from '../../steps';

import EligibilityPostController from './EligibilityPostController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextEligibilityStepUrl');

describe('EligibilityPostController', () => {
  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  test('Should redirect back to the current page with the form data on errors', async () => {
    const errors = [{ errorType: 'required', propertyName: 'field' }];
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
    const controller = new EligibilityPostController(mockForm.fields);

    const req = mockRequest({});
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
    expect(getNextStepUrlMock).not.toHaveBeenCalled();
    expect(res.redirect).toBeCalledWith(req.path);
    expect(req.session.errors).toEqual(errors);
  });

  // it('redirects back to the current page with a session error if there was an problem saving data', async () => {
  //   const mockForm = {
  //     fields: {
  //       field: {
  //         type: 'radios',
  //         values: [
  //           { label: l => l.no, value: YesOrNo.YES },
  //           { label: l => l.yes, value: YesOrNo.NO },
  //         ],
  //         validator: isFieldFilledIn,
  //       },
  //     },
  //     submit: {
  //       text: l => l.continue,
  //     },
  //     saveAsDraft: {
  //       text: '',
  //     },
  //   };
  //   const controller = new EligibilityPostController(mockForm.fields);
  //   const body = { marriedEligible: "You can only apply to adopt a child if they've not been married or in a civil partnership." };
  //   const req = mockRequest({body});
  //   const res = mockResponse();
  //   await controller.post(req, res);
  //   (req.locals.api.triggerEvent as jest.Mock).mockRejectedValueOnce('Error saving');
  //   await controller.post(req, res);
  //   expect(req.session.eligibility).toEqual({
  //     marriedEligible: "You can only apply to adopt a child if they've not been married or in a civil partnership."
  //   });
  //   // expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', { marriedEligible: "You can only apply to adopt a child if they've not been married or in a civil partnership." });

  //   expect(getNextStepUrlMock).not.toHaveBeenCalled();
  //   expect(res.redirect).toBeCalledWith('/request');
  //   expect(req.session.errors).toEqual([
  //     {
  //       errorType: 'required',
  //       propertyName: 'field',
  //     },
  //   ]);
  // });
});
