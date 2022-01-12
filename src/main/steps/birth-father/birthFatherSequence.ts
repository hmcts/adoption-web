import { CaseWithId } from '../../app/case/case';
import { YesNoNotsure, YesOrNo } from '../../app/case/definition';
import {
  BIRTH_FATHER_ADDRESS_INTERNATIONAL,
  BIRTH_FATHER_ADDRESS_KNOWN,
  BIRTH_FATHER_ADDRESS_LOOKUP,
  BIRTH_FATHER_ADDRESS_MANUAL,
  BIRTH_FATHER_ADDRESS_SELECT,
  BIRTH_FATHER_ALIVE,
  BIRTH_FATHER_FULL_NAME,
  BIRTH_FATHER_NAME_ON_CERTIFICATE,
  BIRTH_FATHER_NATIONALITY,
  BIRTH_FATHER_OCCUPATION,
  OTHER_PARENT_ANOTHER_RESPONSIBLE,
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
    url: BIRTH_FATHER_NAME_ON_CERTIFICATE,
    showInSection: Sections.AboutChildren,
    getNextStep: data =>
      data.birthFathersNameOnCertificate === YesOrNo.YES
        ? BIRTH_FATHER_FULL_NAME
        : // TODO update below URL when other parents changes in master
          OTHER_PARENT_ANOTHER_RESPONSIBLE,
  },
  {
    url: BIRTH_FATHER_FULL_NAME,
    showInSection: Sections.AboutChildren,
    getNextStep: () => BIRTH_FATHER_ALIVE,
  },
  {
    url: BIRTH_FATHER_ALIVE,
    showInSection: Sections.AboutChildren,
    getNextStep: data => (data.birthFatherStillAlive === YesNoNotsure.YES ? BIRTH_FATHER_NATIONALITY : TASK_LIST_URL),
  },
  {
    url: BIRTH_FATHER_NATIONALITY,
    showInSection: Sections.AboutChildren,
    getNextStep: () => BIRTH_FATHER_OCCUPATION,
  },
  {
    url: BIRTH_FATHER_OCCUPATION,
    showInSection: Sections.AboutChildren,
    getNextStep: () => BIRTH_FATHER_ADDRESS_KNOWN,
  },
  {
    url: BIRTH_FATHER_ADDRESS_KNOWN,
    showInSection: Sections.AboutChildren,
    getNextStep: data => (data.birthFatherAddressKnown === YesOrNo.YES ? BIRTH_FATHER_ADDRESS_LOOKUP : TASK_LIST_URL),
  },
  {
    url: BIRTH_FATHER_ADDRESS_LOOKUP,
    showInSection: Sections.AboutChildren,
    getNextStep: () => BIRTH_FATHER_ADDRESS_SELECT,
  },
  {
    url: BIRTH_FATHER_ADDRESS_SELECT,
    showInSection: Sections.AboutChildren,
    getNextStep: () => TASK_LIST_URL,
  },
  {
    url: BIRTH_FATHER_ADDRESS_MANUAL,
    showInSection: Sections.AboutChildren,
    getNextStep: () => TASK_LIST_URL,
  },
  {
    url: BIRTH_FATHER_ADDRESS_INTERNATIONAL,
    showInSection: Sections.AboutChildren,
    getNextStep: () => TASK_LIST_URL,
  },
];
