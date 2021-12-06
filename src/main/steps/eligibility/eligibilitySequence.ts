import { CaseWithId } from '../../app/case/case';
import {
  CHECK_ELIGIBILITY_URL_MARRIED,
  CHECK_ELIGIBILITY_URL_UNDER_18,
  PageLink,
  SIGN_IN_URL,
  START_ELIGIBILITY_URL,
} from '../../steps/urls';

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

export const eligibilitySequence: Step[] = [
  {
    url: START_ELIGIBILITY_URL,
    showInSection: Sections.AboutPartnership,
    getNextStep: () => CHECK_ELIGIBILITY_URL_UNDER_18,
  },
  {
    url: CHECK_ELIGIBILITY_URL_UNDER_18,
    showInSection: Sections.AboutPartnership,
    getNextStep: () => CHECK_ELIGIBILITY_URL_MARRIED,
  },
  {
    url: CHECK_ELIGIBILITY_URL_MARRIED,
    showInSection: Sections.AboutPartnership,
    getNextStep: () => SIGN_IN_URL,
  },
];
