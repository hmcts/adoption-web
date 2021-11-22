import { jointApplicant2CompleteCase } from '../../../test/functional/fixtures/jointApplicant2CompleteCase';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { ApplicationType, DivorceOrDissolution, State, YesOrNo } from '../../app/case/definition';
import {
  APPLICANT_2,
  APPLICATION_ENDED,
  APPLICATION_SUBMITTED,
  CHECK_ANSWERS_URL,
  CHECK_JOINT_APPLICATION,
  CONFIRM_JOINT_APPLICATION,
  HOW_DO_YOU_WANT_TO_RESPOND,
  HUB_PAGE,
  RESPONDENT,
  SENT_TO_APPLICANT2_FOR_REVIEW,
  YOUR_DETAILS_URL,
  YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from '../urls';

import { HomeGetController } from './get';

describe('HomeGetController', () => {
  const controller = new HomeGetController();

  test('redirects to the first question for new users', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          mockQuestion: 'mockExistingAnswer',
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(YOUR_DETAILS_URL);
  });

  test('redirects to the check your answers page for existing users', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          gender: 'male',
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CHECK_ANSWERS_URL);
  });

  test('throws an error if the user switches service type', () => {
    const req = mockRequest();
    const res = mockResponse({
      locals: { serviceType: DivorceOrDissolution.DISSOLUTION },
    });

    expect(() => controller.get(req, res)).toThrowError(new Error('Invalid case type'));
  });

  test("redirects to applicant 2's first question for new applicant 2 users", () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          mockQuestion: 'mockExistingAnswer',
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(`${APPLICANT_2}${YOU_NEED_TO_REVIEW_YOUR_APPLICATION}`);
  });

  test("redirects to applicant 2's check your answers page if first question has been answered", () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicant2ScreenHasUnionBroken: YesOrNo.YES,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(`${APPLICANT_2}${CHECK_ANSWERS_URL}`);
  });

  test('redirects to the check your joint application page for applicant 2 users if last question has been answered', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingApplicant2Response,
          ...jointApplicant2CompleteCase,
          applicant2WhoIsFinancialOrderFor: [],
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(`${APPLICANT_2}${CHECK_JOINT_APPLICATION}`);
  });

  test('redirects to your spouse needs to confirm page for applicant 2 users in applicant2Approved state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.Applicant2Approved,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(`${APPLICANT_2}${YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION}`);
  });

  test('redirects to the hub page for applicant 2 users in holding state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.Holding,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(`${APPLICANT_2}${HUB_PAGE}`);
  });

  test('redirects to application ended page for applicant 1 users if applicant2ScreenHasUnionBroken is No', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          applicant2ScreenHasUnionBroken: YesOrNo.NO,
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingApplicant1Response,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(APPLICATION_ENDED);
  });

  test('redirects to application sent for review page for applicant 1 users in awaitingApplicant2 state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
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
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
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
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
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
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.AwaitingApplicant1Response,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CHECK_ANSWERS_URL);
  });

  test('redirects to the hub page for applicant 1 users in holding state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          state: State.Holding,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(HUB_PAGE);
  });

  test('redirects to the check your answers page for respondent users in AosDrafted state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          disputeApplication: YesOrNo.NO,
          state: State.AosDrafted,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(`${RESPONDENT}${CHECK_ANSWERS_URL}`);
  });

  test('redirects to the hub page for respondent users in holding state', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.Holding,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(`${RESPONDENT}${HUB_PAGE}`);
  });

  test('redirects to the how do you want to respond page for respondent users if first question not complete', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          applicationType: ApplicationType.SOLE_APPLICATION,
          state: State.AosDrafted,
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(`${RESPONDENT}${HOW_DO_YOU_WANT_TO_RESPOND}`);
  });
});
