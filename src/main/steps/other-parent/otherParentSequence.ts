import { CaseWithId } from '../../app/case/case';
import {
  OTHER_PARENT_ADDRESS_KNOWN,
  OTHER_PARENT_EXISTS,
  OTHER_PARENT_INTERNATIONAL_ADDRESS,
  OTHER_PARENT_MANUAL_ADDRESS,
  OTHER_PARENT_NAME,
  OTHER_PARENT_POSTCODE_LOOKUP,
  OTHER_PARENT_VERIFY_ADDRESS,
  PageLink,
  TASK_LIST_URL,
} from '../../steps/urls';

export enum Sections {
  AboutOtherParent = 'aboutOtherParent',
}

export interface Step {
  url: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId>) => PageLink;
}

export const otherParentSequence: Step[] = [
  {
    url: OTHER_PARENT_EXISTS,
    showInSection: Sections.AboutOtherParent,
    getNextStep: () => OTHER_PARENT_NAME,
  },
  {
    url: OTHER_PARENT_NAME,
    showInSection: Sections.AboutOtherParent,
    getNextStep: () => OTHER_PARENT_ADDRESS_KNOWN,
  },
  {
    url: OTHER_PARENT_ADDRESS_KNOWN,
    showInSection: Sections.AboutOtherParent,
    getNextStep: () => OTHER_PARENT_POSTCODE_LOOKUP,
  },
  {
    url: OTHER_PARENT_POSTCODE_LOOKUP,
    showInSection: Sections.AboutOtherParent,
    getNextStep: () => OTHER_PARENT_VERIFY_ADDRESS,
  },
  {
    url: OTHER_PARENT_VERIFY_ADDRESS,
    showInSection: Sections.AboutOtherParent,
    getNextStep: () => TASK_LIST_URL,
  },
  {
    url: OTHER_PARENT_MANUAL_ADDRESS,
    showInSection: Sections.AboutOtherParent,
    getNextStep: () => TASK_LIST_URL,
  },
  {
    url: OTHER_PARENT_INTERNATIONAL_ADDRESS,
    showInSection: Sections.AboutOtherParent,
    getNextStep: () => TASK_LIST_URL,
  },
];
