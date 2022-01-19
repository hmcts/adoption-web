import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import * as Urls from '../urls';

export const childrenSequence: Step[] = [
  {
    url: Urls.CHILDREN_PLACEMENT_ORDER_TYPE,
    showInSection: Sections.AboutChildren,
    getNextStep: () => Urls.CHILDREN_PLACEMENT_ORDER_NUMBER,
  },
  {
    url: Urls.CHILDREN_PLACEMENT_ORDER_NUMBER,
    showInSection: Sections.AboutChildren,
    getNextStep: () => Urls.CHILDREN_PLACEMENT_ORDER_COURT,
  },
  {
    url: Urls.CHILDREN_PLACEMENT_ORDER_COURT,
    showInSection: Sections.AboutChildren,
    getNextStep: () => Urls.CHILDREN_PLACEMENT_ORDER_DATE,
  },
  {
    url: Urls.CHILDREN_PLACEMENT_ORDER_DATE,
    showInSection: Sections.AboutChildren,
    getNextStep: () => Urls.CHILDREN_PLACEMENT_ORDER_SUMMARY,
  },
  {
    url: Urls.CHILDREN_PLACEMENT_ORDER_SUMMARY,
    showInSection: Sections.AboutChildren,
    getNextStep: userCase =>
      userCase.addAnotherPlacementOrder === YesOrNo.YES
        ? `${Urls.CHILDREN_PLACEMENT_ORDER_TYPE}?add=${Date.now()}`
        : Urls.TASK_LIST_URL,
  },
  {
    url: Urls.CHILDREN_PLACEMENT_ORDER_CHECK_YOUR_ANSWERS,
    showInSection: Sections.AboutChildren,
    getNextStep: () => Urls.CHILDREN_PLACEMENT_ORDER_SUMMARY,
  },
  {
    url: Urls.CHILDREN_FULL_NAME,
    showInSection: Sections.AboutChildren,
    getNextStep: () => Urls.CHILDREN_DATE_OF_BIRTH,
  },
  {
    url: Urls.CHILDREN_DATE_OF_BIRTH,
    showInSection: Sections.AboutChildren,
    getNextStep: () => Urls.CHILDREN_SEX_AT_BIRTH,
  },
  {
    url: Urls.CHILDREN_SEX_AT_BIRTH,
    showInSection: Sections.AboutChildren,
    getNextStep: () => Urls.CHILDREN_NATIONALITY,
  },
  {
    url: Urls.CHILDREN_NATIONALITY,
    showInSection: Sections.AboutChildren,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
  {
    url: Urls.CHILDREN_FULL_NAME_AFTER_ADOPTION,
    showInSection: Sections.AboutChildren,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
  {
    url: Urls.ADOPTION_AGENCY,
    showInSection: Sections.AboutChildren,
    getNextStep: () => Urls.OTHER_ADOPTION_AGENCY,
  },
  {
    url: Urls.OTHER_ADOPTION_AGENCY,
    showInSection: Sections.AboutChildren,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
];
