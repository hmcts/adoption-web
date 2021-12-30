import { CaseWithId } from '../../app/case/case';
import * as Urls from '../urls';

export enum Sections {
  AboutChildren = 'aboutChildren',
}

export interface Step {
  url: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId>) => Urls.PageLink;
}

export const childrenSequence: Step[] = [
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
    getNextStep: () => Urls.TASK_LIST_URL,
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
];
