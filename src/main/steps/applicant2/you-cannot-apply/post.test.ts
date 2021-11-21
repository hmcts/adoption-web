import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { APPLICANT_2_NOT_BROKEN, YesOrNo } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import Applicant2IrretrievableBreakdownPostController from './post';

describe('Applicant2IrretrievableBreakdownPostController', () => {
  test('Should have no errors and trigger applicant2-not-broken event', async () => {
    const body = { applicant2ScreenHasUnionBroken: YesOrNo.NO };
    const mockFormContent = {
      fields: {
        applicant2ScreenHasUnionBroken: {},
      },
    } as unknown as FormContent;
    const controller = new Applicant2IrretrievableBreakdownPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        applicant2ScreenHasUnionBroken: YesOrNo.NO,
      },
      APPLICANT_2_NOT_BROKEN
    );
  });
});
