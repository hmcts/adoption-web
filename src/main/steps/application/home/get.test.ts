import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import * as caseApi from '../../../app/case/CaseApi';
import { CaseWithId } from '../../../app/case/case';
import { ApplyingWith, State } from '../../../app/case/definition';
import {
  APPLICATION_SUBMITTED,
  APPLYING_WITH_URL,
  LA_PORTAL_CONFIRMATION_PAGE,
  LA_PORTAL_TASK_LIST,
  PAY_YOUR_FEE,
  START_ELIGIBILITY_URL,
  TASK_LIST_URL,
} from '../../urls';

import HomeGetController from './get';

const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');

describe('HomeGetController', () => {
  const controller = new HomeGetController();

  test('redirects to the first question for new users', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          mockQuestion: 'mockExistingAnswer',
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLYING_WITH_URL);
  });

  test('redirects to task list when applyingWith question has been answered', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applyingWith: ApplyingWith.ALONE,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(TASK_LIST_URL);
  });

  test('redirects to LA Portal Confirmation page for LA users in LaSubmitted state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.LaSubmitted,
        },
        user: {
          isSystemUser: true,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(LA_PORTAL_CONFIRMATION_PAGE);
  });

  test('redirects to LA Portal Task List page for LA users when not in LaSubmitted state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.Submitted,
        },
        user: {
          isSystemUser: true,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(LA_PORTAL_TASK_LIST);
  });

  test('redirects to application submitted page for applicant 1 users in submitted state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.Submitted,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLICATION_SUBMITTED);
  });

  test('redirects to application submitted page for applicant 1 users in LaSubmitted state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.LaSubmitted,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLICATION_SUBMITTED);
  });

  test('redirects to the pay your fee page for applicant 1 users for sole application in awaitingPayment state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.AwaitingPayment,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(PAY_YOUR_FEE);
  });

  test('redirects to eligibility start screen if usercase is null', async () => {
    const caseApiMockFn = {
      getCaseDetails: jest.fn(() => {
        return { userCase: null, cases: null };
      }),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequest();
    req.session.userCase = null as unknown as CaseWithId;
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(START_ELIGIBILITY_URL);
  });

  test('redirects to task list if usercase is found with applyingWith value set', async () => {
    const caseApiMockFn = {
      getCaseDetails: jest.fn(() => {
        return { userCase: { applyingWith: 'alone' }, cases: null };
      }),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequest();
    req.session.userCase = null as unknown as CaseWithId;
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(TASK_LIST_URL);
  });

  test('redirects to applying-with screen if usercase is not found', async () => {
    const caseApiMockFn = {
      getCaseDetails: jest.fn(() => {
        return { userCase: false, cases: null };
      }),
    };
    (getCaseApiMock as jest.Mock).mockReturnValue(caseApiMockFn);

    const req = mockRequest();
    req.session.userCase = null as unknown as CaseWithId;
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(APPLYING_WITH_URL);
  });
});
