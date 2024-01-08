import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import * as caseApi from '../../app/case/CaseApi';

import { NewCaseRedirectController } from './NewCaseRedirectController';

const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');

describe('NewCaseRedirecController', () => {
  const controller = new NewCaseRedirectController();

  test('redirects to eligibility start screen if usercase is null', async () => {
    const caseApiMockFn = {
      getCaseDetails: jest.fn(() => {
        return { userCase: null, cases: null };
      }),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.redirect).toBeCalledWith('/eligibility/start');
  });

  test('redirects to home url if usercase is found and state is not Submitted or LaSubmitted', async () => {
    const caseApiMockFn = {
      getCaseDetails: jest.fn(() => {
        return { userCase: { state: 'draft' }, cases: null };
      }),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.redirect).toBeCalledWith('/');
  });

  test('redirects to multiple children eligibility description screen if usercase is found and state is Submitted', async () => {
    const caseApiMockFn = {
      getCaseDetails: jest.fn(() => {
        return { userCase: { state: 'Submitted' }, cases: null };
      }),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.redirect).toBeCalledWith('/eligibility/multiple-children-desc');
  });

  test('redirects to home url if there is no application for the user', async () => {
    const caseApiMockFn = {
      getCaseDetails: jest.fn(() => {
        return { userCase: false, cases: null };
      }),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.redirect).toBeCalledWith('/');
  });
});
