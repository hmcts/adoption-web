import { CaseWithId } from '../../app/case/case';
import * as Urls from '../urls';

export enum Sections {
  ReviewPaySubmit = 'reviewPaySubmit',
}

export interface Step {
  url: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId>) => Urls.PageLink;
}

export const reviewPaySubmitSequence: Step[] = [
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
