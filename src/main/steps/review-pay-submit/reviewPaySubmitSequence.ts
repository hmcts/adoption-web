import { CaseWithId } from '../../app/case/case';
import { State } from '../../app/case/definition';
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
    getNextStep: data =>
      (data as Partial<CaseWithId>).state === State.AwaitingPayment ? Urls.PAY_AND_SUBMIT_URL : Urls.STATEMENT_OF_TRUTH,
  },
  {
    url: Urls.STATEMENT_OF_TRUTH,
    showInSection: Sections.ReviewPaySubmit,
    getNextStep: data =>
      (data as Partial<CaseWithId>).canPaymentIgnored
        ? Urls.APPLICATION_SUBMITTED
        : (data as Partial<CaseWithId>).redirectToSOT
        ? Urls.STATEMENT_OF_TRUTH
        : Urls.PAY_AND_SUBMIT_URL,
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
