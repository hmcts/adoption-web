import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCaseApi } from '../../../app/case/CaseApi';
import { Case } from '../../../app/case/case';
import { State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { Form, FormFields } from '../../../app/form/Form';
import {
  APPLICATION_SUBMITTED,
  APPLYING_WITH_URL,
  CHECK_ANSWERS_URL,
  CONFIRM_JOINT_APPLICATION,
  HUB_PAGE,
  PAY_YOUR_FEE,
  SENT_TO_APPLICANT2_FOR_REVIEW,
  START_ELIGIBILITY_URL,
  TASK_LIST_URL,
} from '../../urls';
import { form as applicant1FirstQuestionForm } from '../applying-with/content';

@autobind
export default class HomeGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.userCase) {
      req.locals.api = getCaseApi(req.session.user, req.locals.logger);
      const userCase = (await req.locals.api.getCaseDetails()).userCase;
      if (userCase === null) {
        res.redirect(START_ELIGIBILITY_URL);
      } else if (userCase) {
        req.session.userCase = userCase;
        const firstQuestionForm = getApplicantFirstQuestionForm();
        const isFirstQuestionComplete = firstQuestionForm.getErrors(req.session.userCase).length === 0;
        res.redirect(multipleChildrenRedirectPageSwitch(isFirstQuestionComplete));
      } else {
        res.redirect(multipleChildrenRedirectPageSwitch(false));
      }
    } else {
      const firstQuestionForm = getApplicantFirstQuestionForm();
      const isFirstQuestionComplete = firstQuestionForm.getErrors(req.session.userCase).length === 0;
      res.redirect(
        applicant1RedirectPageSwitch(req.session.userCase.state, req.session.userCase, isFirstQuestionComplete)
      );
    }
  }
}

const applicant1RedirectPageSwitch = (caseState: State, userCase: Partial<Case>, isFirstQuestionComplete: boolean) => {
  switch (caseState) {
    case State.AwaitingApplicant1Response: {
      return CHECK_ANSWERS_URL;
    }
    case State.AwaitingApplicant2Response: {
      return SENT_TO_APPLICANT2_FOR_REVIEW;
    }
    case State.Applicant2Approved: {
      return CONFIRM_JOINT_APPLICATION;
    }
    case State.LaSubmitted:
    case State.Submitted: {
      return APPLICATION_SUBMITTED;
    }
    case State.AwaitingPayment: {
      return PAY_YOUR_FEE;
    }
    case State.AwaitingAos:
    case State.AwaitingConditionalOrder:
    case State.AosDrafted:
    case State.AosOverdue:
    case State.Holding:
    case State.PendingDispute:
    case State.Disputed: {
      return HUB_PAGE;
    }
    default: {
      return isFirstQuestionComplete ? TASK_LIST_URL : APPLYING_WITH_URL;
    }
  }
};

const multipleChildrenRedirectPageSwitch = (isFirstQuestionComplete: boolean) => {
  return isFirstQuestionComplete ? TASK_LIST_URL : APPLYING_WITH_URL;
};

const getApplicantFirstQuestionForm = () => {
  return new Form(<FormFields>applicant1FirstQuestionForm.fields);
};
