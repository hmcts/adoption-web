import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { DivorceOrDissolution } from '../../app/case/definition';
import { generatePageContent } from '../common/common.content';

import { generateContent } from './content';
import { AccessibilityStatementGetController } from './get';

describe('AccessibilityStatementGetController', () => {
  const controller = new AccessibilityStatementGetController();
  const language = 'en';

  test('Should render the accessibility statement page for divorce service', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    const isDivorce = true;
    const userCase = req.session.userCase;

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generatePageContent({
        language,
        pageContent: generateContent,
        isDivorce,
        userCase,
        userEmail: 'test@example.com',
      }),
      ...defaultViewArgs,
      userCase: req.session.userCase,
    });
  });

  test('Should render the accessibility statement page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = DivorceOrDissolution.DISSOLUTION;

    await controller.get(req, res);
    const isDivorce = false;
    const userCase = req.session.userCase;

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generatePageContent({
        language,
        pageContent: generateContent,
        isDivorce,
        userCase,
        userEmail: 'test@example.com',
      }),
      ...defaultViewArgs,
      userCase: req.session.userCase,
    });
  });
});
