import { CaseWithId } from '../../app/case/case';
import { YesNoNotsure, YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import * as Urls from '../urls';

const getStepAfterSiblingExists = (data: Partial<CaseWithId>): Urls.PageLink => {
  if (data.hasSiblings === YesNoNotsure.NO || data.hasSiblings === YesNoNotsure.NOT_SURE) {
    return Urls.LA_PORTAL_TASK_LIST;
  }

  const count = data.siblings?.length;
  if (!count) {
    return Urls.LA_PORTAL_SIBLING_RELATION;
  }

  return Urls.LA_PORTAL_SIBLING_ORDER_SUMMARY;
};

const getStepAfterRemoveSibling = (data: Partial<CaseWithId>): Urls.PageLink => {
  const count = data.siblings?.length;

  if (count && count > 0) {
    return Urls.LA_PORTAL_SIBLING_ORDER_SUMMARY;
  }

  return Urls.LA_PORTAL_SIBLING_EXISTS;
};

export const siblingSequence: Step[] = [
  {
    url: Urls.LA_PORTAL_SIBLING_EXISTS,
    showInSection: Sections.AboutSibling,
    getNextStep: data => getStepAfterSiblingExists(data as Partial<CaseWithId>),
  },
  {
    url: Urls.LA_PORTAL_SIBLING_RELATION,
    showInSection: Sections.AboutSibling,
    getNextStep: () => Urls.LA_PORTAL_SIBLING_ORDER_TYPE,
  },
  {
    url: Urls.LA_PORTAL_SIBLING_ORDER_TYPE,
    showInSection: Sections.AboutSibling,
    getNextStep: () => Urls.LA_PORTAL_SIBLING_ORDER_CASE_NUMBER,
  },
  {
    url: Urls.LA_PORTAL_SIBLING_ORDER_CASE_NUMBER,
    showInSection: Sections.AboutSibling,
    getNextStep: () => Urls.LA_PORTAL_SIBLING_ORDER_SUMMARY,
  },
  {
    url: Urls.LA_PORTAL_SIBLING_ORDER_SUMMARY,
    showInSection: Sections.AboutSibling,
    getNextStep: data =>
      (data as Partial<CaseWithId>).addAnotherSiblingPlacementOrder === YesOrNo.YES
        ? `${Urls.LA_PORTAL_SIBLING_RELATION}?add=${Date.now()}`
        : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_SIBLING_ORDER_CHECK_YOUR_ANSWERS,
    showInSection: Sections.AboutSibling,
    getNextStep: () => `${Urls.LA_PORTAL_SIBLING_ORDER_SUMMARY}`,
  },
  {
    url: Urls.LA_PORTAL_SIBLING_REMOVE_PLACEMENT_ORDER,
    showInSection: Sections.AboutSibling,
    getNextStep: data => getStepAfterRemoveSibling(data as Partial<CaseWithId>),
  },
];
