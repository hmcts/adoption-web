import { CaseWithId } from '../app/case/case';
import { LaPortalKBA } from '../app/controller/AppRequest';

import { PageLink } from './urls';

export enum Sections {
  AboutApplicant1 = 'aboutApplicant1',
  AboutApplicant2 = 'aboutApplicant2',
  AboutChildren = 'aboutChildren',
  AboutBirthMother = 'aboutBirthMother',
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
  AboutOtherParent = 'aboutOtherParent',
  ReviewPaySubmit = 'reviewPaySubmit',
  AboutSibling = 'aboutSibling',
}

export interface Step {
  url: string;
  contentDir?: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId> | LaPortalKBA) => PageLink;
}
