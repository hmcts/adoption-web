import { CaseWithId } from '../../app/case/case';
import { YesOrNo } from '../../app/case/definition';
import { Step } from '../../steps/constants';
import {
  OTHER_PARENT_ADDRESS_KNOWN,
  OTHER_PARENT_EXISTS,
  OTHER_PARENT_INTERNATIONAL_ADDRESS,
  OTHER_PARENT_MANUAL_ADDRESS,
  OTHER_PARENT_NAME,
  OTHER_PARENT_POSTCODE_LOOKUP,
  OTHER_PARENT_RESPONSIBILITY_GRANTED,
  OTHER_PARENT_VERIFY_ADDRESS,
  TASK_LIST_URL,
} from '../../steps/urls';

export enum Sections {
  AboutOtherParent = 'aboutOtherParent',
}

export const otherParentSequence: Step[] = [
  {
    url: OTHER_PARENT_EXISTS,
    showInSection: Sections.AboutOtherParent,
    getNextStep: data =>
      (data as Partial<CaseWithId>).otherParentExists === YesOrNo.YES ? OTHER_PARENT_NAME : TASK_LIST_URL,
  },
  {
    url: OTHER_PARENT_NAME,
    showInSection: Sections.AboutOtherParent,
    getNextStep: () => OTHER_PARENT_RESPONSIBILITY_GRANTED,
  },
  {
    url: OTHER_PARENT_RESPONSIBILITY_GRANTED,
    showInSection: Sections.AboutOtherParent,
    getNextStep: () => OTHER_PARENT_ADDRESS_KNOWN,
  },
  {
    url: OTHER_PARENT_ADDRESS_KNOWN,
    showInSection: Sections.AboutOtherParent,
    getNextStep: data =>
      (data as Partial<CaseWithId>).otherParentAddressKnown === YesOrNo.YES
        ? OTHER_PARENT_POSTCODE_LOOKUP
        : TASK_LIST_URL,
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
