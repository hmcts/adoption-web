import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { generatePageContent } from '../../steps/common/common.content';
import { State } from '../case/definition';

import { GetController } from './GetController';

describe('GetController', () => {
  const languages = {
    en: {
      text: 'english',
    },
    cy: {
      text: 'welsh',
    },
  };
  const userEmail = 'test@example.com';
  const generateContent = content => languages[content.language];
  test('Should render the page', async () => {
    const controller = new GetController('page', generateContent);

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('page', {
      ...defaultViewArgs,
      language: 'en',
      serviceName: 'Apply for adoption',
      isDraft: true,
      text: 'english',
      userCase: req.session.userCase,
      userEmail,
    });
  });

  test('Detects when application is not in a draft state', async () => {
    const controller = new GetController('page', () => ({}));

    const req = mockRequest({ userCase: { state: State.AwaitingPayment } });
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('page', {
      ...defaultViewArgs,
      isDraft: false,
    });
  });

  describe('Getting the users preferred language', () => {
    test('Language via query string', async () => {
      const controller = new GetController('page', generateContent);

      const language = 'cy';
      const req = mockRequest();
      const res = mockResponse();
      req.query.lng = language;
      await controller.get(req, res);

      expect(res.render).toBeCalledWith('page', {
        ...defaultViewArgs,
        ...generatePageContent({ language, pageContent: generateContent, userEmail }),
        text: 'welsh',
        language: 'cy',
        htmlLang: 'cy',
        userCase: req.session.userCase,
        userEmail,
      });
    });

    test('Language via session', async () => {
      const controller = new GetController('page', generateContent);

      const language = 'cy';
      const req = mockRequest();
      const res = mockResponse();
      req.session.lang = language;
      await controller.get(req, res);

      expect(res.render).toBeCalledWith('page', {
        ...defaultViewArgs,
        ...generatePageContent({ language, pageContent: generateContent, userEmail }),
        text: 'welsh',
        language: 'cy',
        htmlLang: 'cy',
        userCase: req.session.userCase,
        userEmail,
      });
    });

    test('Language via browser settings', async () => {
      const controller = new GetController('page', generateContent);

      const language = 'cy';
      const req = mockRequest({ headers: { 'accept-language': language } });
      const res = mockResponse();
      req.query.lng = language;
      await controller.get(req, res);

      expect(res.render).toBeCalledWith('page', {
        ...defaultViewArgs,
        ...generatePageContent({ language, pageContent: generateContent, userEmail }),
        text: 'welsh',
        language: 'cy',
        htmlLang: 'cy',
        userCase: req.session.userCase,
        userEmail,
      });
    });
  });

  test("Doesn't call render if an error page has already been rendered upstream", async () => {
    const controller = new GetController('page', generateContent);

    const req = mockRequest();
    const res = mockResponse();
    res.locals.isError = true;
    await controller.get(req, res);

    expect(res.render).not.toHaveBeenCalled();
  });

  test("Doesn't call render if headers have already been sent already upstream", async () => {
    const controller = new GetController('page', generateContent);

    const req = mockRequest();
    const res = mockResponse();
    res.headersSent = true;
    await controller.get(req, res);

    expect(res.render).not.toHaveBeenCalled();
  });

  test('sends the current page form session state to the view', async () => {
    const controller = new GetController('page', generateContent);

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('page', {
      ...defaultViewArgs,
      userCase: {
        id: '1234',
      },
      text: 'english',
      userEmail,
    });
  });

  describe('generatePageContent()', () => {
    test('calls generatePageContent with correct arguments for new sessions', async () => {
      const getContentMock = jest.fn().mockReturnValue({});
      const controller = new GetController('page', getContentMock);

      const req = mockRequest({ userCase: { state: State.Draft } });
      const res = mockResponse();
      await controller.get(req, res);

      const commonContent = generatePageContent({ language: 'en', userEmail });

      expect(getContentMock).toHaveBeenCalledTimes(1);
      expect(getContentMock).toHaveBeenCalledWith({
        ...commonContent,
        language: 'en',
        userCase: req.session.userCase,
        userEmail,
      });
      expect(res.render).toBeCalledWith('page', {
        ...defaultViewArgs,
        isDraft: true,
        userCase: req.session.userCase,
        userEmail,
        htmlLang: 'en',
        language: 'en',
        serviceName: 'Apply for adoption',
        contactEmail: 'todo@test.com',
        sessionErrors: [],
      });
    });
  });
});
