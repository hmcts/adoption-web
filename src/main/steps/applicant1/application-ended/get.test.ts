import { defaultViewArgs } from '../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import * as oidc from '../../../app/auth/user/oidc';
import * as caseApi from '../../../app/case/CaseApi';
import { generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
import ApplicationEndedGetController from './get';

const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');
const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');

describe('ApplicationEndedGetController', () => {
  beforeEach(() => {
    getSystemUserMock.mockResolvedValue({
      accessToken: 'token',
      id: '1234',
      email: 'user@caseworker.com',
      givenName: 'case',
      familyName: 'worker',
    });
  });

  afterEach(() => {
    getSystemUserMock.mockClear();
  });

  const controller = new ApplicationEndedGetController();
  const language = 'en';

  test('Should render the application ended page', async () => {
    (getCaseApiMock as jest.Mock).mockReturnValue({
      triggerEvent: jest.fn(),
      getOrCreateCase: jest.fn(),
    });

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    const isDivorce = true;

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...generatePageContent({ language, pageContent: generateContent, isDivorce, userEmail: 'test@example.com' }),
      userCase: req.session.userCase,
    });
  });

  test('Should throw an error when issue encountered switching to sole', async () => {
    (getCaseApiMock as jest.Mock).mockReturnValue({
      triggerEvent: jest.fn(() => {
        throw Error;
      }),
      getOrCreateCase: jest.fn(),
    });

    const req = mockRequest();
    const res = mockResponse();

    await expect(controller.get(req, res)).rejects.toThrow(
      'Error encountered whilst switching application type to sole.'
    );
    expect(req.locals.logger.error).toBeCalled();
  });
});
