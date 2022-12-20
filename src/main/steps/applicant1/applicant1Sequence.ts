import { Sections, Step } from '../constants';
import {
  APPLICANT_1_CONTACT_DETAILS,
  APPLICANT_1_DOB,
  APPLICANT_1_FIND_ADDRESS,
  APPLICANT_1_FULL_NAME,
  APPLICANT_1_MANUAL_ADDRESS,
  APPLICANT_1_OCCUPATION,
  APPLICANT_1_OTHER_NAMES,
  APPLICANT_1_SELECT_ADDRESS,
  APPLYING_WITH_URL,
  DATE_CHILD_MOVED_IN,
  START_PLACEMENT_URL,
  TASK_LIST_URL,
  UPLOAD_YOUR_DOCUMENTS,
} from '../urls';

export const applicant1Sequence: Step[] = [
   {
     url: START_PLACEMENT_URL,
     showInSection: Sections.AboutApplicant1,
     getNextStep: () => TASK_LIST_URL,
   },
  {
    url: APPLYING_WITH_URL,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => TASK_LIST_URL,
  },
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
    url: APPLICANT_1_CONTACT_DETAILS,
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
    getNextStep: () => APPLICANT_1_CONTACT_DETAILS,
  },
  {
    url: APPLICANT_1_MANUAL_ADDRESS,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => APPLICANT_1_CONTACT_DETAILS,
  },
  {
    url: UPLOAD_YOUR_DOCUMENTS,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => TASK_LIST_URL,
  },
];
