import { CaseWithId } from '../../app/case/case';
import { YesOrNo } from '../../app/case/definition';
import {
  BIRTH_FATHER_ADDRESS,
  BIRTH_FATHER_FULL_NAME,
  BIRTH_FATHER_IS_ADDRESS_KNOWN,
  BIRTH_FATHER_IS_ALIVE,
  BIRTH_FATHER_IS_NAME_ON_CERTIFICATE,
  BIRTH_FATHER_MANUAL_ADDRESS,
  BIRTH_FATHER_MANUAL_INTERNATIONAL_ADDRESS,
  BIRTH_FATHER_NATIONALITY,
  BIRTH_FATHER_OCCUPATION,
  OTHER_PARENT_IS_ANOTHER_RESPONSIBLE,
  PageLink,
  TASK_LIST_URL,
} from '../urls';

export enum Sections {
  AboutChildren = 'aboutChildren',
}

export interface Step {
  url: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId>) => PageLink;
}

export const birthFatherSequence: Step[] = [
  {
    url: BIRTH_FATHER_IS_NAME_ON_CERTIFICATE,
    showInSection: Sections.AboutChildren,
    getNextStep: data =>
      data.isFathersNameOnCertificate === YesOrNo.YES ? BIRTH_FATHER_FULL_NAME : OTHER_PARENT_IS_ANOTHER_RESPONSIBLE,
  },
  {
    url: BIRTH_FATHER_FULL_NAME,
    showInSection: Sections.AboutChildren,
    getNextStep: () => BIRTH_FATHER_IS_ALIVE,
  },
  {
    url: BIRTH_FATHER_IS_ALIVE,
    showInSection: Sections.AboutChildren,
    getNextStep: data => (data.isFatherStillAlive === YesOrNo.YES ? BIRTH_FATHER_NATIONALITY : TASK_LIST_URL),
  },
  {
    url: BIRTH_FATHER_NATIONALITY,
    showInSection: Sections.AboutChildren,
    getNextStep: () => BIRTH_FATHER_OCCUPATION,
  },
  {
    url: BIRTH_FATHER_OCCUPATION,
    showInSection: Sections.AboutChildren,
    getNextStep: () => BIRTH_FATHER_IS_ADDRESS_KNOWN,
  },
  {
    url: BIRTH_FATHER_IS_ADDRESS_KNOWN,
    showInSection: Sections.AboutChildren,
    getNextStep: data => (data.isFathersAddressKnown === YesOrNo.YES ? BIRTH_FATHER_ADDRESS : TASK_LIST_URL),
  },
  {
    url: BIRTH_FATHER_ADDRESS,
    showInSection: Sections.AboutChildren,
    getNextStep: () => TASK_LIST_URL,
  },
  {
    url: BIRTH_FATHER_MANUAL_ADDRESS,
    showInSection: Sections.AboutChildren,
    getNextStep: () => TASK_LIST_URL,
  },
  {
    url: BIRTH_FATHER_MANUAL_INTERNATIONAL_ADDRESS,
    showInSection: Sections.AboutChildren,
    getNextStep: () => TASK_LIST_URL,
  },
];
