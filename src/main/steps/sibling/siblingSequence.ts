import { YesNoNotsure } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import * as Urls from '../urls';

export const siblingSequence: Step[] = [
  {
    url: Urls.SIBLING_EXISTS,
    showInSection: Sections.AboutSibling,
    getNextStep: data => (data.hasSiblings === YesNoNotsure.YES ? Urls.SIBLING_COURT_ORDER_EXISTS : Urls.TASK_LIST_URL),
  },
  {
    url: Urls.SIBLING_COURT_ORDER_EXISTS,
    showInSection: Sections.AboutSibling,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
];
