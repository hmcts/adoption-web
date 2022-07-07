import path from 'path';

import { CaseWithId } from '../../app/case/case';
import { YesNoNotsure, YesOrNo } from '../../app/case/definition';
import { Step } from '../constants';
import * as Urls from '../urls';

/***************************** CHILD *****************************/
const childSequence = [
  {
    url: Urls.LA_PORTAL_CHILD_SEX_AT_BIRTH,
    contentDir: path.join(__dirname, '..', 'children', 'sex-at-birth'),
    getNextStep: () => Urls.LA_PORTAL_CHILD_NATIONALITY,
  },
  {
    url: Urls.LA_PORTAL_CHILD_NATIONALITY,
    contentDir: path.join(__dirname, '..', 'children', 'nationality'),
    getNextStep: () => Urls.LA_PORTAL_TASK_LIST,
  },
];

/************************* BIRTH MOTHER **************************/
const birthMotherSequence = [
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_FULL_NAME,
    contentDir: path.join(__dirname, '..', 'birth-mother', 'full-name'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_MOTHER_STILL_ALIVE,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_STILL_ALIVE,
    contentDir: path.join(__dirname, '..', 'birth-mother', 'still-alive'),
    getNextStep: data =>
      data.birthMotherStillAlive === YesNoNotsure.YES
        ? Urls.LA_PORTAL_BIRTH_MOTHER_NATIONALITY
        : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_NATIONALITY,
    contentDir: path.join(__dirname, '..', 'birth-mother', 'nationality'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_MOTHER_OCCUPATION,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_OCCUPATION,
    contentDir: path.join(__dirname, '..', 'birth-mother', 'occupation'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_MOTHER_ADDRESS_KNOWN,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_ADDRESS_KNOWN,
    contentDir: path.join(__dirname, '..', 'birth-mother', 'address-known'),
    getNextStep: data =>
      data.birthMotherAddressKnown === YesOrNo.YES
        ? Urls.LA_PORTAL_BIRTH_MOTHER_FIND_ADDRESS
        : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_FIND_ADDRESS,
    contentDir: path.join(__dirname, '..', 'birth-mother', 'address', 'lookup'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_MOTHER_SELECT_ADDRESS,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_SELECT_ADDRESS,
    contentDir: path.join(__dirname, '..', 'birth-mother', 'address', 'select'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_MOTER_LAST_ADDRESS_CONFIRMED,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_MANUAL_ADDRESS,
    contentDir: path.join(__dirname, '..', 'birth-mother', 'address', 'manual'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_MOTER_LAST_ADDRESS_CONFIRMED,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTHER_INTERNATIONAL_ADDRESS,
    contentDir: path.join(__dirname, '..', 'birth-mother', 'address', 'international'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_MOTER_LAST_ADDRESS_CONFIRMED,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_MOTER_LAST_ADDRESS_CONFIRMED,
    contentDir: path.join(__dirname, '..', 'birth-mother', 'last-address-confirmed'),
    getNextStep: () => Urls.LA_PORTAL_TASK_LIST,
  },
];

/************************* BIRTH FATHER **************************/
const birthFatherSequence = [
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_NAME_ON_CERTIFICATE,
    contentDir: path.join(__dirname, '..', 'birth-father', 'name-on-certificate'),
    getNextStep: data =>
      data.birthFatherNameOnCertificate === YesOrNo.YES
        ? Urls.LA_PORTAL_BIRTH_FATHER_FULL_NAME
        : Urls.LA_PORTAL_BIRTH_FATHER_IDENTITY_KNOWN,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_IDENTITY_KNOWN,
    contentDir: path.join(__dirname, '..', 'birth-father', 'identity-known'),
    getNextStep: data =>
      data.birthFatherIdentityKnown === YesOrNo.YES ? Urls.LA_PORTAL_BIRTH_FATHER_FULL_NAME : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_FULL_NAME,
    contentDir: path.join(__dirname, '..', 'birth-father', 'full-name'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_FATHER_STILL_ALIVE,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_STILL_ALIVE,
    contentDir: path.join(__dirname, '..', 'birth-father', 'alive'),
    getNextStep: data =>
      data.birthFatherStillAlive === YesNoNotsure.YES
        ? Urls.LA_PORTAL_BIRTH_FATHER_NATIONALITY
        : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_NATIONALITY,
    contentDir: path.join(__dirname, '..', 'birth-father', 'nationality'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_FATHER_OCCUPATION,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_OCCUPATION,
    contentDir: path.join(__dirname, '..', 'birth-father', 'occupation'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_FATHER_ADDRESS_KNOWN,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_ADDRESS_KNOWN,
    contentDir: path.join(__dirname, '..', 'birth-father', 'address-known'),
    getNextStep: data =>
      data.birthFatherAddressKnown === YesOrNo.YES
        ? Urls.LA_PORTAL_BIRTH_FATHER_FIND_ADDRESS
        : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_FIND_ADDRESS,
    contentDir: path.join(__dirname, '..', 'birth-father', 'address', 'lookup'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_FATHER_SELECT_ADDRESS,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_SELECT_ADDRESS,
    contentDir: path.join(__dirname, '..', 'birth-father', 'address', 'select'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_FATHER_LAST_ADDRESS_CONFIRMED,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_MANUAL_ADDRESS,
    contentDir: path.join(__dirname, '..', 'birth-father', 'address', 'manual'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_FATHER_LAST_ADDRESS_CONFIRMED,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_INTERNATIONAL_ADDRESS,
    contentDir: path.join(__dirname, '..', 'birth-father', 'address', 'international'),
    getNextStep: () => Urls.LA_PORTAL_BIRTH_FATHER_LAST_ADDRESS_CONFIRMED,
  },
  {
    url: Urls.LA_PORTAL_BIRTH_FATHER_LAST_ADDRESS_CONFIRMED,
    contentDir: path.join(__dirname, '..', 'birth-father', 'last-address-confirmed'),
    getNextStep: () => Urls.LA_PORTAL_TASK_LIST,
  },
];

/************************* OTHER PARENT **************************/
const otherParentSequence = [
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_EXISTS,
    contentDir: path.join(__dirname, '..', 'other-parent', 'exists'),
    getNextStep: data =>
      data.otherParentExists === YesOrNo.YES ? Urls.LA_PORTAL_OTHER_PARENT_FULL_NAME : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_FULL_NAME,
    contentDir: path.join(__dirname, '..', 'other-parent', 'full-name'),
    getNextStep: () => Urls.LA_PORTAL_OTHER_PARENT_ADDRESS_KNOWN,
  },
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_ADDRESS_KNOWN,
    contentDir: path.join(__dirname, '..', 'other-parent', 'address-known'),
    getNextStep: data =>
      data.otherParentAddressKnown === YesOrNo.YES
        ? Urls.LA_PORTAL_OTHER_PARENT_FIND_ADDRESS
        : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_FIND_ADDRESS,
    contentDir: path.join(__dirname, '..', 'other-parent', 'address', 'lookup'),
    getNextStep: () => Urls.LA_PORTAL_OTHER_PARENT_SELECT_ADDRESS,
  },
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_SELECT_ADDRESS,
    contentDir: path.join(__dirname, '..', 'other-parent', 'address', 'select'),
    getNextStep: () => Urls.LA_PORTAL_OTHER_PARENT_LAST_ADDRESS_CONFIRMED,
  },
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_MANUAL_ADDRESS,
    contentDir: path.join(__dirname, '..', 'other-parent', 'address', 'manual'),
    getNextStep: () => Urls.LA_PORTAL_OTHER_PARENT_LAST_ADDRESS_CONFIRMED,
  },
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_INTERNATIONAL_ADDRESS,
    contentDir: path.join(__dirname, '..', 'other-parent', 'address', 'international'),
    getNextStep: () => Urls.LA_PORTAL_OTHER_PARENT_LAST_ADDRESS_CONFIRMED,
  },
  {
    url: Urls.LA_PORTAL_OTHER_PARENT_LAST_ADDRESS_CONFIRMED,
    contentDir: path.join(__dirname, '..', 'other-parent', 'last-address-confirmed'),
    getNextStep: () => Urls.LA_PORTAL_TASK_LIST,
  },
];

/*********************** PLACEMENT ORDER *************************/
const placementOrderSequence = [
  {
    url: Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_TYPE,
    contentDir: path.join(__dirname, '..', 'children', 'placement-order-type'),
    getNextStep: () => Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_NUMBER,
  },
  {
    url: Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_NUMBER,
    contentDir: path.join(__dirname, '..', 'children', 'placement-order-number'),
    getNextStep: () => Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_DATE,
  },
  {
    url: Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_COURT,
    contentDir: path.join(__dirname, '..', 'children', 'placement-order-court'),
    getNextStep: () => Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_DATE,
  },
  {
    url: Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_DATE,
    contentDir: path.join(__dirname, '..', 'children', 'placement-order-date'),
    getNextStep: () => Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_SUMMARY,
  },
  {
    url: Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_SUMMARY,
    contentDir: path.join(__dirname, '..', 'children', 'placement-order-summary'),
    getNextStep: data =>
      data.addAnotherPlacementOrder === YesOrNo.YES
        ? (`${Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_TYPE}?add=${Date.now()}` as Urls.PageLink)
        : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_CHECK_YOUR_ANSWERS,
    contentDir: path.join(__dirname, '..', 'children', 'placement-order-check-your-answers'),
    getNextStep: () => Urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_SUMMARY,
  },
];

const getStepAfterSiblingExists = (data): Urls.PageLink => {
  if (data.hasSiblings === YesNoNotsure.NO || data.hasSiblings === YesNoNotsure.NOT_SURE) {
    return Urls.LA_PORTAL_TASK_LIST;
  }

  const count = data.siblings?.length;
  if (!count) {
    return Urls.LA_PORTAL_SIBLING_RELATION;
  }

  return Urls.LA_PORTAL_SIBLING_ORDER_SUMMARY;
};

/******************** SIBLING PLACEMENT ORDER *********************/
const siblingSequence: Step[] = [
  {
    url: Urls.LA_PORTAL_SIBLING_EXISTS,
    contentDir: path.join(__dirname, '..', 'sibling', 'exists'),
    getNextStep: getStepAfterSiblingExists,
  },
  {
    url: Urls.LA_PORTAL_SIBLING_RELATION,
    contentDir: path.join(__dirname, '..', 'sibling', 'relation'),
    getNextStep: () => Urls.LA_PORTAL_SIBLING_ORDER_TYPE,
  },
  {
    url: Urls.LA_PORTAL_SIBLING_ORDER_TYPE,
    contentDir: path.join(__dirname, '..', 'sibling', 'placement-order-type'),
    getNextStep: () => Urls.LA_PORTAL_SIBLING_ORDER_CASE_NUMBER,
  },
  {
    url: Urls.LA_PORTAL_SIBLING_ORDER_CASE_NUMBER,
    contentDir: path.join(__dirname, '..', 'sibling', 'placement-order-number'),
    getNextStep: () => Urls.LA_PORTAL_SIBLING_ORDER_SUMMARY,
  },
  {
    url: Urls.LA_PORTAL_SIBLING_ORDER_SUMMARY,
    contentDir: path.join(__dirname, '..', 'sibling', 'summary'),
    getNextStep: data =>
      (data as Partial<CaseWithId>).addAnotherSiblingPlacementOrder === YesOrNo.YES
        ? `${Urls.LA_PORTAL_SIBLING_RELATION}?add=${Date.now()}`
        : Urls.LA_PORTAL_TASK_LIST,
  },
  {
    url: Urls.LA_PORTAL_SIBLING_ORDER_CHECK_YOUR_ANSWERS,
    contentDir: path.join(__dirname, '..', 'sibling', 'placement-order-check-your-answers'),
    getNextStep: () => `${Urls.LA_PORTAL_SIBLING_ORDER_SUMMARY}`,
  },
  {
    url: Urls.LA_PORTAL_SIBLING_REMOVE_PLACEMENT_ORDER,
    contentDir: path.join(__dirname, '..', 'sibling', 'remove-placement-order'),
    getNextStep: () => Urls.LA_PORTAL_SIBLING_ORDER_SUMMARY,
  },
];

/******************** FOOTER LINKS *********************/
const footerLinkSequence: Step[] = [
  {
    url: Urls.LA_PORTAL_COOKIES_PAGE,
    contentDir: path.join(__dirname, '..', 'application', 'cookies'),
    getNextStep: () => Urls.LA_PORTAL_KBA_CASE_REF,
  },
  {
    url: Urls.LA_PORTAL_PRIVACY_POLICY,
    contentDir: path.join(__dirname, '..', 'application', 'privacy-policy'),
    getNextStep: () => Urls.LA_PORTAL_KBA_CASE_REF,
  },
  {
    url: Urls.LA_PORTAL_ACCESSIBILITY_STATEMENT,
    contentDir: path.join(__dirname, '..', 'application', 'accessibility-statement'),
    getNextStep: () => Urls.LA_PORTAL_KBA_CASE_REF,
  },
  {
    url: Urls.LA_PORTAL_TERMS_AND_CONDITIONS,
    contentDir: path.join(__dirname, '..', 'application', 'terms-and-conditions'),
    getNextStep: () => Urls.LA_PORTAL_KBA_CASE_REF,
  },
  {
    url: Urls.LA_PORTAL_CONTACT_US,
    contentDir: path.join(__dirname, '..', 'application', 'contact-us'),
    getNextStep: () => Urls.LA_PORTAL_KBA_CASE_REF,
  },
];

export const laPortalSequence: Step[] = [
  {
    url: Urls.LA_PORTAL_KBA_CASE_REF,
    getNextStep: () => Urls.LA_PORTAL_KBA_CALLBACK,
  },
  {
    url: Urls.LA_PORTAL_TASK_LIST,
    getNextStep: () => Urls.HOME_URL,
  },
  ...childSequence,
  ...birthMotherSequence,
  ...birthFatherSequence,
  ...otherParentSequence,
  ...placementOrderSequence,
  ...siblingSequence,
  ...footerLinkSequence,
];
