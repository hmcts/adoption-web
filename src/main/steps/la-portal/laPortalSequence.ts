import path from 'path';

import { YesNoNotsure, YesOrNo } from '../../app/case/definition';
import { Step } from '../constants';
import * as Urls from '../urls';

/***************************** CHILD *****************************/
const childSequence = [
  {
    url: Urls.LA_PORTAL_CHILDREN_FULL_NAME,
    contentDir: path.join(__dirname, '..', '/children/full-name'),
    getNextStep: () => Urls.LA_PORTAL_CHILD_DATE_OF_BIRTH,
  },
  {
    url: Urls.LA_PORTAL_CHILD_DATE_OF_BIRTH,
    contentDir: path.join(__dirname, '..', '/children/date-of-birth'),
    getNextStep: () => Urls.LA_PORTAL_CHILD_SEX_AT_BIRTH,
  },
  {
    url: Urls.LA_PORTAL_CHILD_SEX_AT_BIRTH,
    contentDir: path.join(__dirname, '..', '/children/sex-at-birth'),
    getNextStep: () => Urls.LA_PORTAL_CHILD_NATIONALITY,
  },
  {
    url: Urls.LA_PORTAL_CHILD_NATIONALITY,
    contentDir: path.join(__dirname, '..', '/children/nationality'),
    getNextStep: () => Urls.LA_PORTAL_TASK_LIST,
  },
];

/************************* BIRTH MOTHER **************************/
const birthMotherSequence = [
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_FULL_NAME,
    contentDir: path.join(__dirname, '..', '/birth-mother/full-name'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_MOTHER_STILL_ALIVE,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_STILL_ALIVE,
    contentDir: path.join(__dirname, '..', '/birth-mother/still-alive'),
    getNextStep: data =>
      data.birthMotherStillAlive === YesNoNotsure.YES
        ? Urls.LA_PORTAL_BIRTH_MOTHER_NATIONALITY
        : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_NATIONALITY,
    contentDir: path.join(__dirname, '..', '/birth-mother/nationality'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_MOTHER_OCCUPATION,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_OCCUPATION,
    contentDir: path.join(__dirname, '..', '/birth-mother/occupation'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_MOTHER_ADDRESS_KNOWN,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_ADDRESS_KNOWN,
    contentDir: path.join(__dirname, '..', '/birth-mother/address-known'),
    getNextStep: data =>
      data.birthMotherAddressKnown === YesOrNo.YES
        ? Urls.LA_PORTAL_BIRTH_MOTHER_FIND_ADDRESS
        : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_FIND_ADDRESS,
    contentDir: path.join(__dirname, '..', '/birth-mother/address/lookup'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_MOTHER_SELECT_ADDRESS,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_SELECT_ADDRESS,
    contentDir: path.join(__dirname, '..', '/birth-mother/address/select'),
    getNextStep: () => Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_MANUAL_ADDRESS,
    contentDir: path.join(__dirname, '..', '/birth-mother/address/manual'),
    getNextStep: () => Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_INTERNATIONAL_ADDRESS,
    contentDir: path.join(__dirname, '..', '/birth-mother/address/international'),
    getNextStep: () => Urls.LA_PORTAL_TASK_LIST,
  },
];

/************************* BIRTH FATHER **************************/
const birthFatherSequence = [
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_NAME_ON_CERTIFICATE,
    contentDir: path.join(__dirname, '..', '/birth-father/name-on-certificate'),
    getNextStep: data =>
      data.birthFatherNameOnCertificate === YesOrNo.YES
        ? Urls.LA_PORTAL_BIRTH_FATHER_FULL_NAME
        : Urls.LA_PORTAL_OTHER_PARENT_EXISTS,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_FULL_NAME,
    contentDir: path.join(__dirname, '..', '/birth-father/full-name'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_FATHER_STILL_ALIVE,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_STILL_ALIVE,
    contentDir: path.join(__dirname, '..', '/birth-father/alive'),
    getNextStep: data =>
      data.birthFatherStillAlive === YesNoNotsure.YES
        ? Urls.LA_PORTAL_BIRTH_FATHER_NATIONALITY
        : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_NATIONALITY,
    contentDir: path.join(__dirname, '..', '/birth-father/nationality'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_FATHER_OCCUPATION,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_OCCUPATION,
    contentDir: path.join(__dirname, '..', '/birth-father/occupation'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_FATHER_ADDRESS_KNOWN,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_ADDRESS_KNOWN,
    contentDir: path.join(__dirname, '..', '/birth-father/address-known'),
    getNextStep: data =>
      data.birthFatherAddressKnown === YesOrNo.YES
        ? Urls.LA_PORTAL_BIRTH_FATHER_FIND_ADDRESS
        : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_FIND_ADDRESS,
    contentDir: path.join(__dirname, '..', '/birth-father/address/lookup'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_FATHER_SELECT_ADDRESS,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_SELECT_ADDRESS,
    contentDir: path.join(__dirname, '..', '/birth-father/address/select'),
    getNextStep: () => Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_MANUAL_ADDRESS,
    contentDir: path.join(__dirname, '..', '/birth-father/address/manual'),
    getNextStep: () => Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_INTERNATIONAL_ADDRESS,
    contentDir: path.join(__dirname, '..', '/birth-father/address/international'),
    getNextStep: () => Urls.LA_PORTAL_TASK_LIST,
  },
];

/************************* OTHER PARENT **************************/
const otherParentSequence = [
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_EXISTS,
    contentDir: path.join(__dirname, '..', '/other-parent/exists'),
    getNextStep: data =>
      data.otherParentExists === YesOrNo.YES ? Urls.LA_PORTAL_OTHER_PARENT_FULL_NAME : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_FULL_NAME,
    contentDir: path.join(__dirname, '..', '/other-parent/full-name'),
    getNextStep: () => Urls.LA_PORTAL_OTHER_PARENT_ADDRESS_KNOWN,
  },
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_ADDRESS_KNOWN,
    contentDir: path.join(__dirname, '..', '/other-parent/address-known'),
    getNextStep: data =>
      data.otherParentAddressKnown === YesOrNo.YES
        ? Urls.LA_PORTAL_OTHER_PARENT_FIND_ADDRESS
        : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_FIND_ADDRESS,
    contentDir: path.join(__dirname, '..', '/other-parent/address/lookup'),
    getNextStep: () => Urls.LA_PORTAL_OTHER_PARENT_SELECT_ADDRESS,
  },
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_SELECT_ADDRESS,
    contentDir: path.join(__dirname, '..', '/other-parent/address/select'),
    getNextStep: () => Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_MANUAL_ADDRESS,
    contentDir: path.join(__dirname, '..', '/other-parent/address/manual'),
    getNextStep: () => Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_INTERNATIONAL_ADDRESS,
    contentDir: path.join(__dirname, '..', '/other-parent/address/international'),
    getNextStep: () => Urls.LA_PORTAL_TASK_LIST,
  },
];

export const laPortalSequence: Step[] = [
  {
    url: Urls.LA_PORTAL_TASK_LIST,
    getNextStep: () => Urls.HOME_URL,
  },
  ...childSequence,
  ...birthMotherSequence,
  ...birthFatherSequence,
  ...otherParentSequence,
];
