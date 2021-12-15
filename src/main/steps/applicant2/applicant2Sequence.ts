import { CaseWithId } from '../../app/case/case';
import { YesOrNo } from '../../app/case/definition';
import * as Urls from '../urls';

export enum Sections {
  AboutApplicant2 = 'aboutApplicant2',
}

export interface Step {
  url: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId>) => Urls.PageLink;
}

export const applicant2Sequence: Step[] = [
  {
    url: Urls.APPLICANT_2_SAME_ADDRESS,
    showInSection: Sections.AboutApplicant2,
    getNextStep: data =>
      data.applicant2AddressSameAsApplicant1 === YesOrNo.YES
        ? Urls.APPLICANT_2_CONTACT_DETAILS
        : Urls.APPLICANT_2_FIND_ADDRESS,
  },
  {
    url: Urls.APPLICANT_2_FIND_ADDRESS,
    showInSection: Sections.AboutApplicant2,
    getNextStep: () => Urls.APPLICANT_2_SELECT_ADDRESS,
  },
  {
    url: Urls.APPLICANT_2_SELECT_ADDRESS,
    showInSection: Sections.AboutApplicant2,
    getNextStep: () => Urls.APPLICANT_2_CONTACT_DETAILS,
  },
  {
    url: Urls.APPLICANT_2_MANUAL_ADDRESS,
    showInSection: Sections.AboutApplicant2,
    getNextStep: () => Urls.APPLICANT_2_CONTACT_DETAILS,
  },
  {
    url: Urls.APPLICANT_2_CONTACT_DETAILS,
    showInSection: Sections.AboutApplicant2,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
];
