import { CaseWithId } from '../app/case/case';

import {
  APPLICANT_1_CONTACT_DETAILS,
  APPLICANT_1_DOB,
  APPLICANT_1_FIND_ADDRESS,
  APPLICANT_1_FULL_NAME,
  APPLICANT_1_IDENTITY_DOCUMENTS,
  APPLICANT_1_MANUAL_ADDRESS,
  APPLICANT_1_NATIONALITY,
  APPLICANT_1_OCCUPATION,
  APPLICANT_1_OTHER_NAMES,
  APPLICANT_1_SELECT_ADDRESS,
  APPLYING_WITH_URL,
  DATE_CHILD_MOVED_IN_URL,
  FEE_LOOKUP_URL,
  PageLink,
  TASK_LIST_URL,
} from './urls';

export enum Sections {
  AboutApplicant1 = 'aboutApplicant1',
  AboutApplicant2 = 'aboutApplicant2',
  AboutChildren = 'aboutChildren',
  AboutApplication = 'aboutApplication',
  AboutPartnership = 'aboutPartnership',
  AboutOtherParent = 'aboutOtherParent',
  HelpWithFees = 'helpWithFees',
  ConnectionsToEnglandWales = 'connectionsToEnglandWales',
  AboutPartners = 'aboutPartners',
  ContactYou = 'contactYou',
  ContactThem = 'contactThem',
  OtherCourtCases = 'otherCourtCases',
  DividingAssets = 'dividingAssets',
  Documents = 'documents',
}

export interface Step {
  url: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId>) => PageLink;
}

export const applicant1Sequence: Step[] = [
  {
    url: APPLYING_WITH_URL,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => TASK_LIST_URL,
  },
  {
    url: DATE_CHILD_MOVED_IN_URL,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => APPLICANT_1_FULL_NAME,
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
    getNextStep: () => APPLICANT_1_NATIONALITY,
  },
  {
    url: APPLICANT_1_NATIONALITY,
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
    url: APPLICANT_1_IDENTITY_DOCUMENTS,
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
    url: FEE_LOOKUP_URL,
    getNextStep: () => TASK_LIST_URL,
  },
];
