import { CaseWithId } from '../../app/case/case';
import * as Urls from '../urls';

export enum Sections {
  AboutOtherParent = 'aboutOtherParent',
}

export interface Step {
  url: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId>) => Urls.PageLink;
}

export const otherParentSequence: Step[] = [
  {
    url: Urls.OTHER_PARENT_NAME,
    showInSection: Sections.AboutOtherParent,
    getNextStep: () => Urls.OTHER_PARENT_ADDRESS,
  },
  {
    url: Urls.OTHER_PARENT_ADDRESS,
    showInSection: Sections.AboutOtherParent,
    getNextStep: () => Urls.OTHER_PARENT_FIND_ADDRESS_POSTCODE,
  },
  {
    url: Urls.OTHER_PARENT_FIND_ADDRESS_POSTCODE,
    showInSection: Sections.AboutOtherParent,
    getNextStep: () => Urls.OTHER_PARENT_VERIFY_ADDRESS,
  },
  {
    url: Urls.OTHER_PARENT_VERIFY_ADDRESS,
    showInSection: Sections.AboutOtherParent,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
];
