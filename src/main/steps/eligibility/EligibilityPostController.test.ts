import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../app/case/definition';
import { isFieldFilledIn } from '../../app/form/validation';
import * as steps from '../../steps';

import EligibilityPostController from './EligibilityPostController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');

describe('PostController', () => {
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
});
