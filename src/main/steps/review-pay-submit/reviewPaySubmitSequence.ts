import { CaseWithId } from '../../app/case/case';
import { Sections, Step } from '../constants';
import * as Urls from '../urls';

export const reviewPaySubmitSequence: Step[] = [
  {
    url: Urls.EQUALITY,
    showInSection: Sections.ReviewPaySubmit,
    getNextStep: () => Urls.CHECK_ANSWERS_URL,
  },
  {
    url: Urls.CHECK_ANSWERS_URL,
    showInSection: Sections.ReviewPaySubmit,
    getNextStep: () => Urls.STATEMENT_OF_TRUTH,
  },
  {
    url: Urls.STATEMENT_OF_TRUTH,
    showInSection: Sections.ReviewPaySubmit,
    getNextStep: data => {
      const caseData = data as Partial<CaseWithId>;
      if (caseData.canPaymentIgnored) {
        return Urls.APPLICATION_SUBMITTED;
      } else if (caseData.redirectToSOT) {
        return Urls.STATEMENT_OF_TRUTH;
      } else {
        return Urls.PAY_AND_SUBMIT_URL;
      }
    }
  },
  {
    url: Urls.PAY_AND_SUBMIT_URL,
    showInSection: Sections.ReviewPaySubmit,
    getNextStep: () => Urls.PAY_YOUR_FEE,
  },
  {
    url: Urls.PAY_YOUR_FEE,
    showInSection: Sections.ReviewPaySubmit,
    getNextStep: () => Urls.PAYMENT_CALLBACK_URL,
  },
  {
    url: Urls.PAYMENT_CALLBACK_URL,
    showInSection: Sections.ReviewPaySubmit,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
];
