import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { ApplyingWith, State } from '../../../app/case/definition';
import {
  APPLICATION_SUBMITTED,
  CHECK_ANSWERS_URL,
  CONFIRM_JOINT_APPLICATION,
  HUB_PAGE,
  PAY_YOUR_FEE,
  SENT_TO_APPLICANT2_FOR_REVIEW,
  TASK_LIST_URL,
} from '../../urls';

import HomeGetController from './get';

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

    expect(res.redirect).toBeCalledWith(APPLYING_WITH_URL);
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

    expect(res.redirect).toBeCalledWith(TASK_LIST_URL);
  });

  test('redirects to application sent for review page for applicant 1 users in awaitingApplicant2 state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.AwaitingApplicant2Response,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(SENT_TO_APPLICANT2_FOR_REVIEW);
  });

  test('redirects to confirmation page for applicant 1 users in applicant2Approved state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.Applicant2Approved,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CONFIRM_JOINT_APPLICATION);
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

    expect(res.redirect).toBeCalledWith(APPLICATION_SUBMITTED);
  });

  test('redirects to the check your answers page for applicant 1 users in awaitingApplicant1Response state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.AwaitingApplicant1Response,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CHECK_ANSWERS_URL);
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

    expect(res.redirect).toBeCalledWith(PAY_YOUR_FEE);
  });

  test('redirects to the hub page for applicant 1 users in holding state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.Holding,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(HUB_PAGE);
  });

  test('redirects to application AwaitingAos page for applicant 1 users in submitted state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.AwaitingAos,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(HUB_PAGE);
  });

  test('redirects to application AwaitingConditionalOrder page for applicant 1 users in submitted state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.AwaitingConditionalOrder,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(HUB_PAGE);
  });

  test('redirects to application AosDrafted page for applicant 1 users in submitted state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.AosDrafted,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(HUB_PAGE);
  });

  test('redirects to application AosOverdue page for applicant 1 users in submitted state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          state: State.AosOverdue,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(HUB_PAGE);
  });
});
