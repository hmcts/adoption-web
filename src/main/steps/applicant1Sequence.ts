import { CaseWithId, Checkbox } from '../app/case/case';
import { ApplicationType, YesOrNo } from '../app/case/definition';
import { isLessThanAYear } from '../app/form/validation';
import {
  allowedToAnswerResidualJurisdiction,
  previousConnectionMadeUptoLastHabituallyResident,
} from '../app/jurisdiction/connections';

import {
  ADDRESS_PRIVATE,
  APPLICATION_ENDED,
  APPLICATION_SUBMITTED,
  APPLY_FINANCIAL_ORDER,
  APPLY_FINANCIAL_ORDER_DETAILS,
  CERTIFICATE_IN_ENGLISH,
  CERTIFICATE_NAME,
  CERTIFICATE_URL,
  CERTIFIED_TRANSLATION,
  CHANGES_TO_YOUR_NAME_URL,
  CHECK_ANSWERS_URL,
  CHECK_JURISDICTION,
  CONFIRM_JOINT_APPLICATION,
  COUNTRY_AND_PLACE,
  DETAILS_OTHER_PROCEEDINGS,
  DO_YOU_HAVE_ADDRESS,
  ENGLISH_OR_WELSH,
  ENTER_THEIR_ADDRESS,
  ENTER_YOUR_ADDRESS,
  EQUALITY,
  GET_CERTIFIED_TRANSLATION,
  HABITUALLY_RESIDENT_ENGLAND_WALES,
  HAS_RELATIONSHIP_BROKEN_URL,
  HELP_PAYING_HAVE_YOU_APPLIED,
  HELP_PAYING_NEED_TO_APPLY,
  HELP_WITH_YOUR_FEE_URL,
  HOME_URL,
  HOW_DID_YOU_CHANGE_YOUR_NAME,
  HOW_DO_YOU_WANT_TO_APPLY,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  HOW_TO_APPLY_TO_SERVE,
  HOW_YOU_CAN_PROCEED,
  HUB_PAGE,
  IN_THE_UK,
  JURISDICTION_CONNECTION_SUMMARY,
  JURISDICTION_DOMICILE,
  JURISDICTION_INTERSTITIAL_URL,
  JURISDICTION_LAST_TWELVE_MONTHS,
  JURISDICTION_MAY_NOT_BE_ABLE_TO,
  LIVING_ENGLAND_WALES_SIX_MONTHS,
  MONEY_PROPERTY,
  NEED_TO_GET_ADDRESS,
  NO_CERTIFICATE_URL,
  NO_RESPONSE_YET,
  OTHER_COURT_CASES,
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PageLink,
  RELATIONSHIP_DATE_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
  RELATIONSHIP_NOT_LONG_ENOUGH_URL,
  RESIDUAL_JURISDICTION,
  REVIEW_THE_APPLICATION,
  SENT_TO_APPLICANT2_FOR_REVIEW,
  SWITCH_TO_SOLE_APPLICATION,
  THEIR_EMAIL_ADDRESS,
  THEIR_NAME,
  UPLOAD_YOUR_DOCUMENTS,
  WHERE_YOUR_LIVES_ARE_BASED_URL,
  YOUR_DETAILS_URL,
  YOUR_NAME,
  YOU_CANNOT_APPLY,
  YOU_NEED_THEIR_EMAIL_ADDRESS,
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
    url: YOUR_DETAILS_URL,
    showInSection: Sections.AboutPartnership,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_URL,
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
  {
    url: CERTIFICATE_URL,
    showInSection: Sections.AboutPartnership,
    getNextStep: data => (data.hasCertificate === YesOrNo.NO ? NO_CERTIFICATE_URL : HELP_WITH_YOUR_FEE_URL),
  },
  {
    url: NO_CERTIFICATE_URL,
    getNextStep: () => CERTIFICATE_URL,
  },
  {
    url: HELP_WITH_YOUR_FEE_URL,
    showInSection: Sections.HelpWithFees,
    showInCompleteSection: Sections.HelpWithFees,
    getNextStep: data =>
      data.applicant1HelpPayingNeeded === YesOrNo.YES ? HELP_PAYING_HAVE_YOU_APPLIED : HOW_DO_YOU_WANT_TO_APPLY,
  },
  {
    url: HELP_PAYING_HAVE_YOU_APPLIED,
    showInSection: Sections.HelpWithFees,
    getNextStep: data =>
      data.applicant1AlreadyAppliedForHelpPaying === YesOrNo.NO ? HELP_PAYING_NEED_TO_APPLY : HOW_DO_YOU_WANT_TO_APPLY,
  },
  {
    url: HELP_PAYING_NEED_TO_APPLY,
    getNextStep: () => HELP_PAYING_HAVE_YOU_APPLIED,
  },
  {
    url: HOW_DO_YOU_WANT_TO_APPLY,
    showInSection: Sections.AboutPartnership,
    showInCompleteSection: Sections.AboutPartnership,
    getNextStep: data => (data.applicationType === ApplicationType.JOINT_APPLICATION ? THEIR_EMAIL_ADDRESS : IN_THE_UK),
  },
  {
    url: IN_THE_UK,
    showInSection: Sections.ConnectionsToEnglandWales,
    showInCompleteSection: Sections.ConnectionsToEnglandWales,
    getNextStep: data => (data.inTheUk === YesOrNo.NO ? CERTIFICATE_IN_ENGLISH : CHECK_JURISDICTION),
  },
  {
    url: CERTIFICATE_IN_ENGLISH,
    showInSection: Sections.ConnectionsToEnglandWales,
    showInCompleteSection: Sections.ConnectionsToEnglandWales,
    getNextStep: data => (data.certificateInEnglish === YesOrNo.NO ? CERTIFIED_TRANSLATION : COUNTRY_AND_PLACE),
  },
  {
    url: CERTIFIED_TRANSLATION,
    showInSection: Sections.ConnectionsToEnglandWales,
    showInCompleteSection: Sections.ConnectionsToEnglandWales,
    getNextStep: data => (data.certifiedTranslation === YesOrNo.NO ? GET_CERTIFIED_TRANSLATION : COUNTRY_AND_PLACE),
  },
  {
    url: GET_CERTIFIED_TRANSLATION,
    getNextStep: () => CERTIFIED_TRANSLATION,
  },
  {
    url: COUNTRY_AND_PLACE,
    showInSection: Sections.ConnectionsToEnglandWales,
    showInCompleteSection: Sections.ConnectionsToEnglandWales,
    getNextStep: () => CHECK_JURISDICTION,
  },
  {
    url: CHECK_JURISDICTION,
    getNextStep: () => WHERE_YOUR_LIVES_ARE_BASED_URL,
  },
  {
    url: WHERE_YOUR_LIVES_ARE_BASED_URL,
    showInSection: Sections.ConnectionsToEnglandWales,
    showInCompleteSection: Sections.ConnectionsToEnglandWales,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      const YES = YesOrNo.YES;
      const NO = YesOrNo.NO;
      switch (`${data.applicant1LifeBasedInEnglandAndWales}${data.applicant2LifeBasedInEnglandAndWales}`) {
        case `${YES}${YES}`:
          return JURISDICTION_INTERSTITIAL_URL;
        case `${NO}${YES}`:
          return data.sameSex === Checkbox.Checked ? JURISDICTION_DOMICILE : JURISDICTION_INTERSTITIAL_URL;
        case `${YES}${NO}`:
          return data.applicationType === ApplicationType.JOINT_APPLICATION
            ? JURISDICTION_INTERSTITIAL_URL
            : JURISDICTION_LAST_TWELVE_MONTHS;
        default:
          return JURISDICTION_DOMICILE;
      }
    },
  },
  {
    url: JURISDICTION_DOMICILE,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      const YES = YesOrNo.YES;
      const NO = YesOrNo.NO;
      switch (`${data.applicant1DomicileInEnglandWales}${data.applicant2DomicileInEnglandWales}`) {
        case `${YES}${YES}`:
          return data.sameSex === Checkbox.Checked ? HABITUALLY_RESIDENT_ENGLAND_WALES : JURISDICTION_INTERSTITIAL_URL;
        case `${YES}${NO}`:
          return data.applicant1LifeBasedInEnglandAndWales === YES
            ? LIVING_ENGLAND_WALES_SIX_MONTHS
            : HABITUALLY_RESIDENT_ENGLAND_WALES;
        default:
          return HABITUALLY_RESIDENT_ENGLAND_WALES;
      }
    },
  },
  {
    url: HABITUALLY_RESIDENT_ENGLAND_WALES,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      if (allowedToAnswerResidualJurisdiction(data)) {
        return RESIDUAL_JURISDICTION;
      } else if (previousConnectionMadeUptoLastHabituallyResident(data)) {
        return JURISDICTION_CONNECTION_SUMMARY;
      } else if (data.bothLastHabituallyResident === YesOrNo.YES) {
        return JURISDICTION_INTERSTITIAL_URL;
      } else {
        return JURISDICTION_MAY_NOT_BE_ABLE_TO;
      }
    },
  },
  {
    url: JURISDICTION_LAST_TWELVE_MONTHS,
    getNextStep: data =>
      data.applicant1LivingInEnglandWalesTwelveMonths === YesOrNo.NO
        ? JURISDICTION_DOMICILE
        : JURISDICTION_INTERSTITIAL_URL,
  },
  {
    url: LIVING_ENGLAND_WALES_SIX_MONTHS,
    getNextStep: () => HABITUALLY_RESIDENT_ENGLAND_WALES,
  },
  {
    url: RESIDUAL_JURISDICTION,
    getNextStep: data =>
      data.jurisdictionResidualEligible === Checkbox.Checked
        ? JURISDICTION_CONNECTION_SUMMARY
        : JURISDICTION_MAY_NOT_BE_ABLE_TO,
  },
  {
    url: JURISDICTION_MAY_NOT_BE_ABLE_TO,
    getNextStep: () => CHECK_JURISDICTION,
  },
  {
    url: JURISDICTION_INTERSTITIAL_URL,
    showInSection: Sections.ConnectionsToEnglandWales,
    showInCompleteSection: Sections.ConnectionsToEnglandWales,
    getNextStep: () => YOUR_NAME,
  },
  {
    url: YOUR_NAME,
    showInSection: Sections.ContactYou,
    showInCompleteSection: Sections.AboutApplicant1,
    getNextStep: data => (data.applicationType === ApplicationType.JOINT_APPLICATION ? CERTIFICATE_NAME : THEIR_NAME),
  },
  {
    url: THEIR_NAME,
    showInSection: Sections.ContactThem,
    getNextStep: () => CERTIFICATE_NAME,
  },
  {
    url: CERTIFICATE_NAME,
    showInSection: Sections.AboutPartners,
    getNextStep: () => CHANGES_TO_YOUR_NAME_URL,
  },
  {
    url: CHANGES_TO_YOUR_NAME_URL,
    showInSection: Sections.AboutPartners,
    showInCompleteSection: Sections.AboutApplicant1,
    getNextStep: data =>
      data.applicant1LastNameChangedWhenRelationshipFormed === YesOrNo.YES ||
      data.applicant1NameChangedSinceRelationshipFormed === YesOrNo.YES
        ? HOW_DID_YOU_CHANGE_YOUR_NAME
        : HOW_THE_COURTS_WILL_CONTACT_YOU,
  },
  {
    url: HOW_DID_YOU_CHANGE_YOUR_NAME,
    showInSection: Sections.AboutPartners,
    showInCompleteSection: Sections.AboutApplicant1,
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
    url: YOU_CANNOT_APPLY,
    getNextStep: () => CHECK_JURISDICTION,
  },
  {
    url: ENTER_YOUR_ADDRESS,
    showInSection: Sections.ContactYou,
    getNextStep: data =>
      data.applicationType === ApplicationType.JOINT_APPLICATION ? OTHER_COURT_CASES : THEIR_EMAIL_ADDRESS,
  },
  {
    url: THEIR_EMAIL_ADDRESS,
    showInSection: Sections.ContactThem,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      if (data.applicationType === ApplicationType.JOINT_APPLICATION) {
        return data.applicant1DoesNotKnowApplicant2EmailAddress ? YOU_NEED_THEIR_EMAIL_ADDRESS : IN_THE_UK;
      } else {
        return DO_YOU_HAVE_ADDRESS;
      }
    },
  },
  {
    url: YOU_NEED_THEIR_EMAIL_ADDRESS,
    getNextStep: () => THEIR_EMAIL_ADDRESS,
  },
  {
    url: DO_YOU_HAVE_ADDRESS,
    showInSection: Sections.ContactThem,
    getNextStep: data =>
      data.applicant1KnowsApplicant2Address === YesOrNo.NO ? NEED_TO_GET_ADDRESS : ENTER_THEIR_ADDRESS,
  },
  {
    url: NEED_TO_GET_ADDRESS,
    showInSection: Sections.ContactThem,
    excludeFromContinueApplication: true,
    getNextStep: data =>
      data.iWantToHavePapersServedAnotherWay === Checkbox.Checked ? HOW_TO_APPLY_TO_SERVE : ENTER_THEIR_ADDRESS,
  },
  {
    url: ENTER_THEIR_ADDRESS,
    showInSection: Sections.ContactThem,
    getNextStep: () => OTHER_COURT_CASES,
  },
  {
    url: HOW_TO_APPLY_TO_SERVE,
    getNextStep: () => OTHER_COURT_CASES,
  },
  {
    url: OTHER_COURT_CASES,
    showInSection: Sections.OtherCourtCases,
    showInCompleteSection: Sections.OtherCourtCases,
    getNextStep: data => (data.applicant1LegalProceedings === YesOrNo.YES ? DETAILS_OTHER_PROCEEDINGS : MONEY_PROPERTY),
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
      data.applyForFinancialOrder === YesOrNo.YES ? APPLY_FINANCIAL_ORDER_DETAILS : UPLOAD_YOUR_DOCUMENTS,
  },
  {
    url: APPLY_FINANCIAL_ORDER_DETAILS,
    getNextStep: () => UPLOAD_YOUR_DOCUMENTS,
  },
  {
    url: UPLOAD_YOUR_DOCUMENTS,
    showInSection: Sections.Documents,
    getNextStep: () => EQUALITY,
  },
  {
    url: EQUALITY,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: CHECK_ANSWERS_URL,
    getNextStep: data =>
      data.applicationType === ApplicationType.JOINT_APPLICATION
        ? SENT_TO_APPLICANT2_FOR_REVIEW
        : data.applicant1HelpWithFeesRefNo
        ? APPLICATION_SUBMITTED
        : PAY_YOUR_FEE,
  },
  {
    url: SENT_TO_APPLICANT2_FOR_REVIEW,
    getNextStep: () => HOME_URL,
  },
  {
    url: CONFIRM_JOINT_APPLICATION,
    getNextStep: () => PAY_AND_SUBMIT,
  },
  {
    url: PAY_YOUR_FEE,
    getNextStep: () => PAYMENT_CALLBACK_URL,
  },
  {
    url: PAY_AND_SUBMIT,
    getNextStep: () => PAYMENT_CALLBACK_URL,
  },
  {
    url: JURISDICTION_CONNECTION_SUMMARY,
    getNextStep: () => YOUR_NAME,
  },
  {
    url: PAYMENT_CALLBACK_URL,
    getNextStep: () => APPLICATION_SUBMITTED,
  },
  {
    url: APPLICATION_SUBMITTED,
    getNextStep: () => HOME_URL,
  },
  {
    url: APPLICATION_ENDED,
    getNextStep: () => HOME_URL,
  },
  {
    url: HUB_PAGE,
    getNextStep: () => HOME_URL,
  },
  {
    url: SWITCH_TO_SOLE_APPLICATION,
    getNextStep: () => YOUR_DETAILS_URL,
  },
  {
    url: NO_RESPONSE_YET,
    getNextStep: () => HOME_URL,
  },
  {
    url: REVIEW_THE_APPLICATION,
    getNextStep: () => HOME_URL,
  },
  {
    url: HOW_YOU_CAN_PROCEED,
    getNextStep: () => HOME_URL,
  },
];
