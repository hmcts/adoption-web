import { CaseWithId } from '../../app/case/case';
import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import {
  BIRTH_FATHER_ADDRESS_KNOWN,
  BIRTH_FATHER_ADDRESS_LOOKUP,
  BIRTH_FATHER_ADDRESS_SELECT,
  BIRTH_FATHER_FULL_NAME,
  BIRTH_FATHER_INTERNATIONAL_ADDRESS,
  BIRTH_FATHER_MANUAL_ADDRESS,
  BIRTH_FATHER_NAME_ON_CERTIFICATE,
  BIRTH_FATHER_NATIONALITY,
  BIRTH_FATHER_NO_PARENTAL_RESPONSIBILITY,
  BIRTH_FATHER_OCCUPATION,
  BIRTH_FATHER_PARENTAL_RESPONSIBILITY,
  BIRTH_FATHER_PARENTAL_RESPONSIBILITY_GRANTED,
  BIRTH_FATHER_STILL_ALIVE,
  OTHER_PARENT_EXISTS,
  TASK_LIST_URL,
} from '../urls';

export const birthFatherSequence: Step[] = [
  {
    url: BIRTH_FATHER_NAME_ON_CERTIFICATE,
    showInSection: Sections.AboutChildren,
    getNextStep: data =>
      (data as Partial<CaseWithId>).birthFatherNameOnCertificate === YesOrNo.YES
        ? BIRTH_FATHER_FULL_NAME
        : OTHER_PARENT_EXISTS,
  },
  {
    url: BIRTH_FATHER_FULL_NAME,
    showInSection: Sections.AboutChildren,
    getNextStep: () => BIRTH_FATHER_STILL_ALIVE,
  },
  {
    url: BIRTH_FATHER_STILL_ALIVE,
    showInSection: Sections.AboutChildren,
    getNextStep: data =>
      (data as Partial<CaseWithId>).birthFatherStillAlive === YesOrNo.YES
        ? BIRTH_FATHER_PARENTAL_RESPONSIBILITY
        : TASK_LIST_URL,
  },
  {
    url: BIRTH_FATHER_PARENTAL_RESPONSIBILITY,
    showInSection: Sections.AboutChildren,
    getNextStep: data =>
      (data as Partial<CaseWithId>).birthFatherResponsibility === YesOrNo.YES
        ? BIRTH_FATHER_PARENTAL_RESPONSIBILITY_GRANTED
        : BIRTH_FATHER_NO_PARENTAL_RESPONSIBILITY,
  },
  {
    url: BIRTH_FATHER_PARENTAL_RESPONSIBILITY_GRANTED,
    showInSection: Sections.AboutChildren,
    getNextStep: () => BIRTH_FATHER_NATIONALITY,
  },
  {
    url: BIRTH_FATHER_NO_PARENTAL_RESPONSIBILITY,
    showInSection: Sections.AboutChildren,
    getNextStep: () => BIRTH_FATHER_NATIONALITY,
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
    getNextStep: data =>
      (data as Partial<CaseWithId>).birthFatherAddressKnown === YesOrNo.YES
        ? BIRTH_FATHER_ADDRESS_LOOKUP
        : TASK_LIST_URL,
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
    url: BIRTH_FATHER_MANUAL_ADDRESS,
    showInSection: Sections.AboutChildren,
    getNextStep: () => TASK_LIST_URL,
  },
  {
    url: BIRTH_FATHER_INTERNATIONAL_ADDRESS,
    showInSection: Sections.AboutChildren,
    getNextStep: () => TASK_LIST_URL,
  },
];
