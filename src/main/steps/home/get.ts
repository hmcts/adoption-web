import { Response } from 'express';

import { Case } from '../../app/case/case';
import { State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { Form, FormFields } from '../../app/form/Form';
import { form as applicant1FirstQuestionForm } from '../applicant1/applying-with/content';
import {
  APPLICATION_SUBMITTED,
  START_PLACEMENT_URL,
  CHECK_ANSWERS_URL,
  CONFIRM_JOINT_APPLICATION,
  HUB_PAGE,
  PAY_YOUR_FEE,
  SENT_TO_APPLICANT2_FOR_REVIEW,
  TASK_LIST_URL,
} from '../urls';

export class HomeGetController {
  public get(req: AppRequest, res: Response): void {
    const firstQuestionForm = getApplicantFirstQuestionForm();
    const isFirstQuestionComplete = firstQuestionForm.getErrors(req.session.userCase).length === 0;

    res.redirect(
      applicant1RedirectPageSwitch(req.session.userCase.state, req.session.userCase, isFirstQuestionComplete)
    );
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
      return isFirstQuestionComplete ? TASK_LIST_URL : START_PLACEMENT_URL;
    }
  }
};

const getApplicantFirstQuestionForm = () => {
  return new Form(<FormFields>applicant1FirstQuestionForm.fields);
};
