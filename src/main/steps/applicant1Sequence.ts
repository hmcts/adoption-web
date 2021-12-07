import { CaseWithId } from '../app/case/case';

import {
  APPLICANT_1_ADDRESS,
  APPLICANT_1_CONTACT_DETAILS,
  APPLICANT_1_IDENTITY_DOCUMENTS,
  APPLICANT_1_PERSONAL_DETAILS,
  APPLYING_WITH_URL,
  DATE_CHILD_MOVED_IN_URL,
  PageLink,
  TASK_LIST_URL,
} from './urls';

export enum Sections {
  AboutApplicant1 = 'aboutApplicant1',
  AboutApplicant2 = 'aboutApplicant2',
  AboutApplication = 'aboutApplication',
  AboutPartnership = 'aboutPartnership',
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
    getNextStep: () => APPLICANT_1_ADDRESS,
  },
  {
    url: DATE_CHILD_MOVED_IN_URL,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => APPLICANT_1_PERSONAL_DETAILS,
  },
  {
    url: APPLICANT_1_PERSONAL_DETAILS,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => APPLICANT_1_CONTACT_DETAILS,
  },
  {
    url: APPLICANT_1_CONTACT_DETAILS,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => APPLICANT_1_IDENTITY_DOCUMENTS,
  },
  {
    url: APPLICANT_1_IDENTITY_DOCUMENTS,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => TASK_LIST_URL,
  },
  {
    url: APPLICANT_1_ADDRESS,
    showInSection: Sections.AboutApplicant1,
    getNextStep: () => TASK_LIST_URL,
  },
];
