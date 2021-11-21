import { ChangedNameHow, YesOrNo } from '../app/case/definition';

import { Sections, Step } from './applicant1Sequence';
import {
  ADDRESS_PRIVATE,
  APPLICANT_2,
  APPLY_FINANCIAL_ORDER,
  APPLY_FINANCIAL_ORDER_DETAILS,
  CHANGES_TO_YOUR_NAME_URL,
  CHECK_ANSWERS_URL,
  CHECK_JOINT_APPLICATION,
  CONFIRM_JOINT_APPLICATION,
  DETAILS_OTHER_PROCEEDINGS,
  ENGLISH_OR_WELSH,
  ENTER_YOUR_ADDRESS,
  HAS_RELATIONSHIP_BROKEN_URL,
  HELP_PAYING_HAVE_YOU_APPLIED,
  HELP_PAYING_NEED_TO_APPLY,
  HELP_WITH_YOUR_FEE_URL,
  HOME_URL,
  HOW_DID_YOU_CHANGE_YOUR_NAME,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  HUB_PAGE,
  MONEY_PROPERTY,
  NOT_CONFIRMED_JOINT_APPLICATION,
  OTHER_COURT_CASES,
  RELATIONSHIP_NOT_BROKEN_URL,
  UPLOAD_YOUR_DOCUMENTS,
  YOUR_COMMENTS_SENT,
  YOUR_NAME,
  YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION,
  YOU_CANNOT_APPLY,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from './urls';

const sequences: Step[] = [
  {
    url: YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_URL,
  },
  {
    url: HAS_RELATIONSHIP_BROKEN_URL,
    showInSection: Sections.AboutPartnership,
    getNextStep: data =>
      data.applicant2ScreenHasUnionBroken === YesOrNo.NO
        ? YOU_CANNOT_APPLY
        : data.applicant1HelpPayingNeeded === YesOrNo.YES
        ? HELP_WITH_YOUR_FEE_URL
        : YOUR_NAME,
  },
  {
    url: YOU_CANNOT_APPLY,
    getNextStep: () => NOT_CONFIRMED_JOINT_APPLICATION,
  },
  {
    url: NOT_CONFIRMED_JOINT_APPLICATION,
    getNextStep: () => RELATIONSHIP_NOT_BROKEN_URL,
  },
  {
    url: HELP_WITH_YOUR_FEE_URL,
    getNextStep: data => (data.applicant2HelpPayingNeeded === YesOrNo.YES ? HELP_PAYING_HAVE_YOU_APPLIED : YOUR_NAME),
  },
  {
    url: HELP_PAYING_HAVE_YOU_APPLIED,
    showInSection: Sections.HelpWithFees,
    getNextStep: data =>
      data.applicant2AlreadyAppliedForHelpPaying === YesOrNo.NO ? HELP_PAYING_NEED_TO_APPLY : YOUR_NAME,
  },
  {
    url: HELP_PAYING_NEED_TO_APPLY,
    getNextStep: () => HELP_PAYING_HAVE_YOU_APPLIED,
  },
  {
    url: YOUR_NAME,
    showInCompleteSection: Sections.AboutApplicant2,
    showInSection: Sections.ContactYou,
    getNextStep: () => CHANGES_TO_YOUR_NAME_URL,
  },
  {
    url: CHANGES_TO_YOUR_NAME_URL,
    showInCompleteSection: Sections.AboutApplicant2,
    getNextStep: data =>
      data.applicant2LastNameChangedWhenRelationshipFormed === YesOrNo.YES ||
      data.applicant2NameChangedSinceRelationshipFormed === YesOrNo.YES
        ? HOW_DID_YOU_CHANGE_YOUR_NAME
        : HOW_THE_COURTS_WILL_CONTACT_YOU,
  },
  {
    url: HOW_DID_YOU_CHANGE_YOUR_NAME,
    showInSection: Sections.AboutPartners,
    showInCompleteSection: Sections.AboutApplicant2,
    getNextStep: () => HOW_THE_COURTS_WILL_CONTACT_YOU,
  },
  {
    url: HOW_THE_COURTS_WILL_CONTACT_YOU,
    showInSection: Sections.ContactYou,
    getNextStep: () => ENGLISH_OR_WELSH,
  },
  {
    url: ENGLISH_OR_WELSH,
    showInSection: Sections.ContactYou,
    getNextStep: () => ADDRESS_PRIVATE,
  },
  {
    url: ADDRESS_PRIVATE,
    showInSection: Sections.ContactYou,
    getNextStep: () => ENTER_YOUR_ADDRESS,
  },
  {
    url: ENTER_YOUR_ADDRESS,
    showInSection: Sections.ContactYou,
    getNextStep: () => OTHER_COURT_CASES,
  },
  {
    url: OTHER_COURT_CASES,
    showInSection: Sections.OtherCourtCases,
    showInCompleteSection: Sections.OtherCourtCases,
    getNextStep: data => (data.applicant2LegalProceedings === YesOrNo.YES ? DETAILS_OTHER_PROCEEDINGS : MONEY_PROPERTY),
  },
  {
    url: DETAILS_OTHER_PROCEEDINGS,
    showInSection: Sections.OtherCourtCases,
    showInCompleteSection: Sections.OtherCourtCases,
    getNextStep: () => MONEY_PROPERTY,
  },
  {
    url: MONEY_PROPERTY,
    getNextStep: () => APPLY_FINANCIAL_ORDER,
  },
  {
    url: APPLY_FINANCIAL_ORDER,
    showInSection: Sections.DividingAssets,
    showInCompleteSection: Sections.DividingAssets,
    getNextStep: data =>
      data.applicant2ApplyForFinancialOrder === YesOrNo.YES
        ? APPLY_FINANCIAL_ORDER_DETAILS
        : data.applicant2LastNameChangedWhenRelationshipFormed === YesOrNo.YES ||
          data.applicant2NameChangedSinceRelationshipFormed === YesOrNo.YES
        ? UPLOAD_YOUR_DOCUMENTS
        : CHECK_JOINT_APPLICATION,
  },
  {
    url: APPLY_FINANCIAL_ORDER_DETAILS,
    getNextStep: data =>
      data.applicant2NameChangedHow?.includes(ChangedNameHow.DEED_POLL) ||
      data.applicant2NameChangedHow?.includes(ChangedNameHow.OTHER)
        ? UPLOAD_YOUR_DOCUMENTS
        : CHECK_JOINT_APPLICATION,
  },
  {
    url: UPLOAD_YOUR_DOCUMENTS,
    showInSection: Sections.Documents,
    getNextStep: () => CHECK_JOINT_APPLICATION,
  },
  {
    url: CHECK_JOINT_APPLICATION,
    getNextStep: data => (data.applicant2Confirmation === YesOrNo.YES ? CHECK_ANSWERS_URL : YOUR_COMMENTS_SENT),
  },
  {
    url: YOUR_COMMENTS_SENT,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: CHECK_ANSWERS_URL,
    getNextStep: () => CONFIRM_JOINT_APPLICATION,
  },
  {
    url: CONFIRM_JOINT_APPLICATION,
    getNextStep: () => YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION,
  },
  {
    url: YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION,
    getNextStep: () => HOME_URL,
  },
  {
    url: HUB_PAGE,
    getNextStep: () => HOME_URL,
  },
];

export const applicant2Sequence = ((): Step[] => {
  return sequences.map(sequence => ({
    ...sequence,
    url: `${APPLICANT_2}${sequence.url}`,
    getNextStep: data => `${APPLICANT_2}${sequence.getNextStep(data)}`,
  }));
})();
