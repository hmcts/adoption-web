import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { generatePageContent } from '../common/common.content';

import { generateContent } from './content';
import { TimedOutGetController } from './get';

describe('TimedOutGetController', () => {
  const controller = new TimedOutGetController();

  test('Should destroy session and render timeout page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    const language = 'en';
    const isDivorce = true;
    const userCase = req.session.userCase;

    expect(req.session.destroy).toBeCalled();
    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generatePageContent({
        language,
        pageContent: generateContent,
        isDivorce,
        userCase,
        userEmail: 'test@example.com',
      }),
      ...defaultViewArgs,
    });
  });
});
