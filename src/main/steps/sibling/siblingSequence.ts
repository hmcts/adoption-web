import { CaseWithId } from '../../app/case/case';
import { YesNoNotsure, YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import * as Urls from '../urls';

const getStepAfterSiblingCourtOrderExists = (data: Partial<CaseWithId>): Urls.PageLink => {
  if (data.hasPoForSiblings === YesNoNotsure.NO || data.hasPoForSiblings === YesNoNotsure.NOT_SURE) {
    return Urls.TASK_LIST_URL;
  }

  const count = data.siblings?.length;
  if (!count || (count === 1 && (!data.siblings![0].siblingFirstName || !data.siblings![0].siblingLastNames))) {
    return Urls.SIBLING_NAME;
  }

  return Urls.SIBLING_ORDER_SUMMARY;
};

export const siblingSequence: Step[] = [
  {
    url: Urls.SIBLING_EXISTS,
    showInSection: Sections.AboutSibling,
    getNextStep: data => (data.hasSiblings === YesNoNotsure.YES ? Urls.SIBLING_COURT_ORDER_EXISTS : Urls.TASK_LIST_URL),
  },
  {
    url: Urls.SIBLING_COURT_ORDER_EXISTS,
    showInSection: Sections.AboutSibling,
    getNextStep: getStepAfterSiblingCourtOrderExists,
  },
  {
    url: Urls.SIBLING_NAME,
    showInSection: Sections.AboutSibling,
    getNextStep: () => Urls.SIBLING_ORDER_TYPE,
  },
  {
    url: Urls.SIBLING_ORDER_TYPE,
    showInSection: Sections.AboutSibling,
    getNextStep: () => Urls.SIBLING_ORDER_CASE_NUMBER,
  },
  {
    url: Urls.SIBLING_ORDER_CASE_NUMBER,
    showInSection: Sections.AboutSibling,
    getNextStep: () => Urls.SIBLING_ORDER_SUMMARY,
  },
  {
    url: Urls.SIBLING_ORDER_SUMMARY,
    showInSection: Sections.AboutSibling,
    getNextStep: data =>
      data.addAnotherSiblingPlacementOrder === YesOrNo.YES ? Urls.SIBLING_SELECT : Urls.TASK_LIST_URL,
  },
  {
    url: Urls.SIBLING_SELECT,
    showInSection: Sections.AboutSibling,
    getNextStep: () => `${Urls.SIBLING_ORDER_TYPE}?add=${Date.now()}`,
  },
  {
    url: Urls.SIBLING_ORDER_CHECK_YOUR_ANSWERS,
    showInSection: Sections.AboutSibling,
    getNextStep: () => `${Urls.SIBLING_ORDER_SUMMARY}`,
  },
  {
    url: Urls.SIBLING_REMOVE_PLACEMENT_ORDER,
    showInSection: Sections.AboutSibling,
    getNextStep: () => `${Urls.SIBLING_ORDER_SUMMARY}`,
  },
];
