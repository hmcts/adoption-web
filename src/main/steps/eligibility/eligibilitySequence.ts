import { YesOrNo } from '../../app/case/definition';
import { Eligibility as appRequestEligibility } from '../../app/controller/AppRequest';
import {
  CHECK_ELIGIBILITY_URL_DOMICILE,
  CHECK_ELIGIBILITY_URL_LIVED_UK,
  CHECK_ELIGIBILITY_URL_MARRIED,
  CHECK_ELIGIBILITY_URL_UNDER_18,
  CHECK_ELIGIBILITY_URL_UNDER_21,
  INELIGIBLE_TO_ADOPT,
  PageLink,
  SIGN_IN_URL,
  START_ELIGIBILITY_URL,
} from '../urls';

export enum Sections {
  Eligibility = 'eligibility',
}

export interface Step {
  url: string;
  contentDir?: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: appRequestEligibility) => PageLink;
}

export const eligibilitySequence: Step[] = [
  {
    url: START_ELIGIBILITY_URL,
    showInSection: Sections.Eligibility,
    getNextStep: () => CHECK_ELIGIBILITY_URL_UNDER_18,
  },
  {
    url: CHECK_ELIGIBILITY_URL_UNDER_18,
    showInSection: Sections.Eligibility,
    getNextStep: data => (data.under18Eligible === YesOrNo.YES ? CHECK_ELIGIBILITY_URL_MARRIED : INELIGIBLE_TO_ADOPT),
  },
  {
    url: CHECK_ELIGIBILITY_URL_MARRIED,
    showInSection: Sections.Eligibility,
    getNextStep: data => (data.marriedEligible === YesOrNo.NO ? CHECK_ELIGIBILITY_URL_UNDER_21 : INELIGIBLE_TO_ADOPT),
  },
  {
    url: CHECK_ELIGIBILITY_URL_UNDER_21,
    showInSection: Sections.Eligibility,
    getNextStep: data => (data.under21Eligible === YesOrNo.NO ? INELIGIBLE_TO_ADOPT : CHECK_ELIGIBILITY_URL_DOMICILE),
  },
  {
    url: CHECK_ELIGIBILITY_URL_DOMICILE,
    showInSection: Sections.Eligibility,
    getNextStep: data => (data.domicileEligible === YesOrNo.NO ? INELIGIBLE_TO_ADOPT : CHECK_ELIGIBILITY_URL_LIVED_UK),
  },
  {
    url: CHECK_ELIGIBILITY_URL_LIVED_UK,
    showInSection: Sections.Eligibility,
    getNextStep: data => (data.livedUKEligible === YesOrNo.NO ? INELIGIBLE_TO_ADOPT : SIGN_IN_URL),
  },
  {
    url: INELIGIBLE_TO_ADOPT,
    showInSection: Sections.Eligibility,
    getNextStep: () => SIGN_IN_URL,
  },
];
