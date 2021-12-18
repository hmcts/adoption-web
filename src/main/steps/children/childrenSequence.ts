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
    getNextStep: () => Urls.TASK_LIST_URL,
  },
];
