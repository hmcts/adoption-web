import { CaseWithId } from '../../app/case/case';
import { ApplyingWith } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import {
  APPLICANT_1_CHANGE_ADDRESS,
  APPLICANT_1_CONFIRM_CHANGE_ADDRESS,
  APPLICANT_1_CONTACT_DETAILS,
  APPLICANT_1_DOB,
  APPLICANT_1_FIND_ADDRESS,
  APPLICANT_1_FULL_NAME,
  APPLICANT_1_LANGUAGE_PREFERENCE,
  APPLICANT_1_MANUAL_ADDRESS,
  APPLICANT_1_OCCUPATION,
  APPLICANT_1_OTHER_NAMES,
  APPLICANT_1_SELECT_ADDRESS,
  CHECK_ANSWERS_URL,
  DATE_CHILD_MOVED_IN,
  PageLink,
  TASK_LIST_URL,
  UPLOAD_YOUR_DOCUMENTS,
} from '../urls';

const getStepAfterAddress = (data: Partial<CaseWithId>): PageLink => {
  if (data.checkYourAnswersReturn) {
    return (data as Partial<CaseWithId>).applyingWith === ApplyingWith.ALONE
      ? APPLICANT_1_CONFIRM_CHANGE_ADDRESS
      : APPLICANT_1_CHANGE_ADDRESS;
  }

  return APPLICANT_1_CONTACT_DETAILS;
};

export const applicant1Sequence: Step[] = [
  {
    url: DATE_CHILD_MOVED_IN,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => TASK_LIST_URL,
  },
  {
    url: APPLICANT_1_FULL_NAME,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => APPLICANT_1_OTHER_NAMES,
  },
  {
    url: APPLICANT_1_OTHER_NAMES,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => APPLICANT_1_DOB,
  },
  {
    url: APPLICANT_1_DOB,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => APPLICANT_1_OCCUPATION,
  },
  {
    url: APPLICANT_1_OCCUPATION,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => TASK_LIST_URL,
  },
  {
    url: APPLICANT_1_FIND_ADDRESS,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => APPLICANT_1_SELECT_ADDRESS,
  },
  {
    url: APPLICANT_1_SELECT_ADDRESS,
    showInSection: Sections.AboutApplicant1,
    getNextStep: data => getStepAfterAddress(data as Partial<CaseWithId>),
  },
  {
    url: APPLICANT_1_MANUAL_ADDRESS,
    showInSection: Sections.AboutApplicant1,
    getNextStep: data => getStepAfterAddress(data as Partial<CaseWithId>),
  },
  {
    url: APPLICANT_1_CHANGE_ADDRESS,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => APPLICANT_1_CONFIRM_CHANGE_ADDRESS,
  },
  {
    url: APPLICANT_1_CONFIRM_CHANGE_ADDRESS,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: APPLICANT_1_CONTACT_DETAILS,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => APPLICANT_1_LANGUAGE_PREFERENCE,
  },
  {
    url: APPLICANT_1_LANGUAGE_PREFERENCE,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => TASK_LIST_URL,
  },
  {
    url: UPLOAD_YOUR_DOCUMENTS,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => TASK_LIST_URL,
  },
];
