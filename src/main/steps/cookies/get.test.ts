import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { DivorceOrDissolution } from '../../app/case/definition';
import { generatePageContent } from '../common/common.content';

import { generateContent } from './content';
import { CookiesGetController } from './get';

describe('CookiesGetController', () => {
  const controller = new CookiesGetController();
  const language = 'en';

  test('Should render the cookie page with divorce content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    const isDivorce = true;

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generatePageContent({ language, pageContent: generateContent, isDivorce, userEmail: 'test@example.com' }),
      ...defaultViewArgs,
      serviceName: 'Apply for a divorce',
      userCase: req.session.userCase,
    });
  });

  test('Should render the cookie page with civil content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = DivorceOrDissolution.DISSOLUTION;
    await controller.get(req, res);
    const isDivorce = false;

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generatePageContent({ language, pageContent: generateContent, isDivorce, userEmail: 'test@example.com' }),
      ...defaultViewArgs,
      serviceName: 'Apply to end a civil partnership',
      userCase: req.session.userCase,
    });
  });
});
