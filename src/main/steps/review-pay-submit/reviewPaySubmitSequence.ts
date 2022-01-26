import { Sections, Step } from '../constants';
import * as Urls from '../urls';

export const reviewPaySubmitSequence: Step[] = [
  {
    url: Urls.STATEMENT_OF_TRUTH,
    showInSection: Sections.ReviewPaySubmit,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
  {
    url: Urls.CHECK_ANSWERS_URL,
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
