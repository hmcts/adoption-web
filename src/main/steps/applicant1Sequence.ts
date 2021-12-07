import { CaseWithId } from '../app/case/case';
import { YesOrNo } from '../app/case/definition';
import { isLessThanAYear } from '../app/form/validation';

import {
  APPLICANT_1_CONTACT_DETAILS,
  APPLICANT_1_DOB,
  APPLICANT_1_FULL_NAME,
  APPLICANT_1_IDENTITY_DOCUMENTS,
  APPLICANT_1_NATIONALITY,
  APPLICANT_1_OCCUPATION,
  APPLICANT_1_OTHER_NAMES,
  APPLYING_WITH_URL,
  CERTIFICATE_URL,
  DATE_CHILD_MOVED_IN_URL,
  HAS_RELATIONSHIP_BROKEN_URL,
  PageLink,
  RELATIONSHIP_DATE_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
  RELATIONSHIP_NOT_LONG_ENOUGH_URL,
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
    showInSection: Sections.AboutPartnership,
    getNextStep: () => DATE_CHILD_MOVED_IN_URL,
  },
  {
    url: DATE_CHILD_MOVED_IN_URL,
    showInSection: Sections.AboutPartnership,
    getNextStep: () => APPLICANT_1_FULL_NAME,
  },
  {
    url: APPLICANT_1_FULL_NAME,
    showInSection: Sections.AboutPartnership,
    getNextStep: () => APPLICANT_1_OTHER_NAMES,
  },
  {
    url: APPLICANT_1_OTHER_NAMES,
    showInSection: Sections.AboutPartnership,
    getNextStep: () => APPLICANT_1_DOB,
  },
  {
    url: APPLICANT_1_DOB,
    showInSection: Sections.AboutPartnership,
    getNextStep: () => APPLICANT_1_NATIONALITY,
  },
  {
    url: APPLICANT_1_NATIONALITY,
    showInSection: Sections.AboutPartnership,
    getNextStep: () => APPLICANT_1_OCCUPATION,
  },
  {
    url: APPLICANT_1_OCCUPATION,
    showInSection: Sections.AboutPartnership,
    getNextStep: () => APPLICANT_1_CONTACT_DETAILS,
  },
  {
    url: APPLICANT_1_CONTACT_DETAILS,
    showInSection: Sections.AboutPartnership,
    getNextStep: () => APPLICANT_1_IDENTITY_DOCUMENTS,
  },
  {
    url: APPLICANT_1_IDENTITY_DOCUMENTS,
    showInSection: Sections.AboutPartnership,
    getNextStep: () => TASK_LIST_URL,
  },
  {
    url: HAS_RELATIONSHIP_BROKEN_URL,
    showInSection: Sections.AboutPartnership,
    showInCompleteSection: Sections.AboutPartnership,
    getNextStep: data =>
      data.applicant1ScreenHasUnionBroken === YesOrNo.NO ? RELATIONSHIP_NOT_BROKEN_URL : RELATIONSHIP_DATE_URL,
  },
  {
    url: RELATIONSHIP_NOT_BROKEN_URL,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_URL,
  },
  {
    url: RELATIONSHIP_DATE_URL,
    showInSection: Sections.AboutPartnership,
    showInCompleteSection: Sections.AboutPartnership,
    getNextStep: data =>
      isLessThanAYear(data.relationshipDate) === 'lessThanAYear' ? RELATIONSHIP_NOT_LONG_ENOUGH_URL : CERTIFICATE_URL,
  },
  {
    url: RELATIONSHIP_NOT_LONG_ENOUGH_URL,
    getNextStep: () => RELATIONSHIP_DATE_URL,
  },
];
