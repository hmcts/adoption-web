import { defaultViewArgs } from '../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
import TimedOutGetController from './get';

describe('TimedOutGetController', () => {
  const controller = new TimedOutGetController();
  let req = mockRequest();
  const res = mockResponse();
  const language = 'en';
  const userCase = req.session.userCase;

  test('Should NOT destroy session and render timeout page', async () => {
    req.query.pageFrom = language;
    await controller.get(req, res);
    delete req.query.pageFrom;

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...generatePageContent({
        language,
        pageContent: generateContent,
        userCase,
        eligibilityPage: false,
        userEmail: 'test@example.com',
      }),
    });
  });

  describe('when there is an error in destroying session', () => {
    test('Should throw an error', async () => {
      req = mockRequest({ session: { destroy: jest.fn(done => done('MOCK_ERROR')) } });
      try {
        await controller.get(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBe('MOCK_ERROR');
      }
    });
  });
});
