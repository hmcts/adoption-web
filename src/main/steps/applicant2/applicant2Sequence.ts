import { CaseWithId } from '../../app/case/case';
import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import * as Urls from '../urls';

const getStepAfterAddress = (data: Partial<CaseWithId>): Urls.PageLink => {
  if (data.checkYourAnswersReturn) {
    return Urls.APPLICANT_2_CHANGE_ADDRESS;
  }

  return Urls.APPLICANT_2_CONTACT_DETAILS;
};

export const applicant2Sequence: Step[] = [
  {
    url: Urls.APPLICANT_2_FULL_NAME,
    showInSection: Sections.AboutApplicant2,
    getNextStep: () => Urls.APPLICANT_2_OTHER_NAMES,
  },
  {
    url: Urls.APPLICANT_2_OTHER_NAMES,
    showInSection: Sections.AboutApplicant2,
    getNextStep: () => Urls.APPLICANT_2_DOB,
  },
  {
    url: Urls.APPLICANT_2_DOB,
    showInSection: Sections.AboutApplicant2,
    getNextStep: () => Urls.APPLICANT_2_OCCUPATION,
  },
  {
    url: Urls.APPLICANT_2_OCCUPATION,
    showInSection: Sections.AboutApplicant2,
    getNextStep: () => Urls.APPLICANT_2_EXTRA_SUPPORT,
  },
  {
    url: Urls.APPLICANT_2_EXTRA_SUPPORT,
    showInSection: Sections.AboutApplicant2,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
  {
    url: Urls.APPLICANT_2_SAME_ADDRESS,
    showInSection: Sections.AboutApplicant2,
    getNextStep: data =>
      (data as Partial<CaseWithId>).applicant2AddressSameAsApplicant1 === YesOrNo.YES
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
    getNextStep: data => getStepAfterAddress(data as Partial<CaseWithId>),
  },
  {
    url: Urls.APPLICANT_2_MANUAL_ADDRESS,
    showInSection: Sections.AboutApplicant2,
    getNextStep: data => getStepAfterAddress(data as Partial<CaseWithId>),
  },
  {
    url: Urls.APPLICANT_2_CHANGE_ADDRESS,
    showInSection: Sections.AboutApplicant2,
    getNextStep: () => Urls.APPLICANT_2_CONFIRM_CHANGE_ADDRESS,
  },
  {
    url: Urls.APPLICANT_2_CONFIRM_CHANGE_ADDRESS,
    showInSection: Sections.AboutApplicant2,
    getNextStep: () => Urls.CHECK_ANSWERS_URL,
  },
  {
    url: Urls.APPLICANT_2_CONTACT_DETAILS,
    showInSection: Sections.AboutApplicant2,
    getNextStep: () => Urls.APPLICANT_2_LANGUAGE_PREFERENCE,
  },
  {
    url: Urls.APPLICANT_2_LANGUAGE_PREFERENCE,
    showInSection: Sections.AboutApplicant2,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
];
