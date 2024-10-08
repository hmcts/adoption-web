/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.33.956 on 2021-11-12 15:28:24.

import { CaseDate } from './case';

export interface Address {
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  PostTown: string;
  County: string;
  PostCode: string;
  Country: string;
}

export interface AddressGlobal extends Address {}

export interface AddressGlobalUK extends Address {}

export interface AddressUK extends Address {}

export interface CaseLink {
  CaseReference: string;
}

export interface Document {
  document_url: string;
  document_filename: string;
  document_binary_url: string;
}

export interface DynamicElementIndicator {}

export interface DynamicList {
  value: DynamicListElement;
  list_items: DynamicListElement[];
  valueLabel: string;
  valueCode: string;
}

export interface DynamicListElement {
  code: string;
  label: string;
}

export interface Fee {
  FeeAmount: string;
  FeeCode: string;
  FeeDescription: string;
  FeeVersion: string;
}

export interface ListValue<T> {
  id: string;
  value: T;
}

export interface OrderSummary {
  PaymentReference?: string;
  Fees: ListValue<Fee>[];
  PaymentTotal: string;
}

export interface Organisation {
  OrganisationName: string;
  OrganisationID: string;
  OrganisationId: string;
}

export interface OrganisationPolicy<R> {
  Organisation: Organisation;
  PreviousOrganisations: PreviousOrganisation[];
  OrgPolicyReference: string;
  PrepopulateToUsersOrganisation: YesOrNo;
  OrgPolicyCaseAssignedRole: R;
}

export interface PreviousOrganisation {
  FromTimeStamp: DateAsString;
  ToTimeStamp: DateAsString;
  OrganisationName: string;
  OrganisationAddress: string;
}

export interface CaseNote {
  author: string;
  date: DateAsString;
  note: string;
}

export interface AcknowledgementOfService {
  jurisdictionDisagreeReason: string;
  dateAosSubmitted: DateAsString;
  digitalNoticeOfProceedings: YesOrNo;
  noticeOfProceedingsEmail: string;
  noticeOfProceedingsSolicitorFirm: string;
  statementOfTruth: YesOrNo;
  prayerHasBeenGiven: YesOrNo;
}

export interface AlternativeService {
  receivedServiceApplicationDate: DateAsString;
  alternativeServiceType: AlternativeServiceType;
  receivedServiceAddedDate: DateAsString;
  serviceApplicationGranted: YesOrNo;
  serviceApplicationRefusalReason: string;
  serviceApplicationDecisionDate: DateAsString;
  deemedServiceDate: DateAsString;
  dateOfPayment: DateAsString;
  paymentMethod: ServicePaymentMethod;
  feeAccountNumber: string;
  feeAccountReferenceNumber: string;
  helpWithFeesReferenceNumber: string;
  servicePaymentFeeOrderSummary: OrderSummary;
  localCourtName: string;
  localCourtEmail: string;
  certificateOfServiceDocument: AdoptionDocument;
  certificateOfServiceDate: DateAsString;
  successfulServedByBailiff: YesOrNo;
  reasonFailureToServeByBailiff: string;
}

export interface Applicant {
  FirstName: string;
  LastName: string;
  Email: string;
  FullName: string;
  HasOtherNames: YesOrNo;
  AdditionalNames: ListValue<OtherName>[];
  DateOfBirth: DateAsString;
  Occupation: string;
  EmailAddress: string;
  PhoneNumber: string;
  Nationality: Nationality[];
  AdditionalNationality: ListValue<OtherName>[];
  Address1: string;
  Address2: string;
  AddressTown: string;
  AddressCountry: string;
  AddressPostCode: string;
  AddressSameAsApplicant1: string;
  contactDetails: ContactDetails[];

  AgreedToReceiveEmails: YesOrNo;
  ConfirmReceipt: YesOrNo;
  LanguagePreferenceWelsh: YesOrNo;
  LastNameChangedWhenMarried: YesOrNo;
  NameDifferentToMarriageCertificate: YesOrNo;
  NameChangedHowOtherDetails: string;
  HomeAddress: AddressGlobalUK;
  KeepContactDetailsConfidential: YesOrNo;
  Gender: Gender;
  CorrespondenceAddress: AddressGlobalUK;
  SolicitorRepresented: YesOrNo;
  SolicitorName: string;
  SolicitorReference: string;
  SolicitorPhone: string;
  SolicitorEmail: string;
  SolicitorAddress: string;
  SolicitorAgreeToReceiveEmails: YesOrNo;
  SolicitorOrganisationPolicy: OrganisationPolicy<UserRole>;
  FinancialOrder: YesOrNo;
  FinancialOrderFor: FinancialOrderFor[];
  LegalProceedings: YesOrNo;
  LegalProceedingsDetails: string;
}

export interface Application {
  applicant1ScreenHasMarriageBroken: YesOrNo;
  applicant2ScreenHasMarriageBroken: YesOrNo;
  screenHasMarriageCert: YesOrNo;
  marriageApplicant1Name: string;
  marriageApplicant2Name: string;
  marriageMarriedInUk: YesOrNo;
  marriageCertificateInEnglish: YesOrNo;
  marriageCertifiedTranslation: YesOrNo;
  marriageCountryOfMarriage: string;
  marriagePlaceOfMarriage: string;
  marriageDate: DateAsString;
  marriageIsSameSexCouple: YesOrNo;
  marriageCertifyMarriageCertificateIsCorrect: YesOrNo;
  marriageMarriageCertificateIsIncorrectDetails: string;
  marriageIssueApplicationWithoutMarriageCertificate: YesOrNo;
  jurisdictionApplicant1Residence: YesOrNo;
  jurisdictionApplicant2Residence: YesOrNo;
  jurisdictionApplicant1Domicile: YesOrNo;
  jurisdictionApplicant2Domicile: YesOrNo;
  jurisdictionApp1HabituallyResLastTwelveMonths: YesOrNo;
  jurisdictionApp1HabituallyResLastSixMonths: YesOrNo;
  jurisdictionBothLastHabituallyResident: YesOrNo;
  solServiceDateOfService: DateAsString;
  solServiceDocumentsServed: string;
  solServiceOnWhomServed: string;
  solServiceHowServed: DocumentsServedHow;
  solServiceServiceDetails: string;
  solServiceAddressServed: string;
  solServiceBeingThe: DocumentsServedBeingThe;
  solServiceLocationServed: DocumentsServedWhere;
  solServiceSpecifyLocationServed: string;
  solServiceServiceSotName: string;
  solServiceServiceSotFirm: string;
  solServiceTruthStatement: string;
  applicant1HWFReferenceNumber: string;
  applicant1HWFNeedHelp: YesOrNo;
  applicant1HWFAppliedForFees: YesOrNo;
  applicant2HWFReferenceNumber: string;
  applicant2HWFNeedHelp: YesOrNo;
  applicant2HWFAppliedForFees: YesOrNo;
  solUrgentCase: YesOrNo;
  solUrgentCaseSupportingInformation: string;
  applicant1WantsToHavePapersServedAnotherWay: YesOrNo;
  solServiceMethod: ServiceMethod;
  solStatementOfReconciliationCertify: YesOrNo;
  solStatementOfReconciliationDiscussed: YesOrNo;
  applicant1PrayerHasBeenGivenCheckbox: ThePrayer[];
  applicant2PrayerHasBeenGiven: YesOrNo;
  applicant1StatementOfTruth: YesOrNo;
  applicant2StatementOfTruth: YesOrNo;
  solSignStatementOfTruth: YesOrNo;
  solStatementOfReconciliationName: string;
  solStatementOfReconciliationFirm: string;
  statementOfReconciliationComments: string;
  solApplicationFeeInPounds: string;
  solPaymentHowToPay: SolicitorPaymentMethod;
  pbaNumbers: DynamicList;
  feeAccountReference: string;
  applicationFeeOrderSummary: OrderSummary;
  applicant1KnowsApplicant2EmailAddress: YesOrNo;
  app2ContactMethodIsDigital: YesOrNo;
  miniApplicationLink: Document;
  dateSubmitted: DateAsString;
  applicant2ConfirmApplicant1Information: YesOrNo;
  applicant2ExplainsApplicant1IncorrectInformation: string;
  reissueDate: DateAsString;
  createdDate: DateAsString;
  rejectReason: RejectReason;
  previousState: State;
  applicationPayments: ListValue<Payment>[];
  overdueNotificationSent: YesOrNo;
  applicant1ReminderSent: YesOrNo;
  applicant2ReminderSent: YesOrNo;
  applicant1NotifiedCanApplyForConditionalOrder: YesOrNo;
  reissueOption: ReissueOption;
}

export interface Bailiff {
  localCourtName: string;
  localCourtEmail: string;
  certificateOfServiceDocument: AdoptionDocument;
  certificateOfServiceDate: DateAsString;
  successfulServedByBailiff: YesOrNo;
  reasonFailureToServeByBailiff: string;
}

export const enum Nationality {
  BRITHISH = 'British',
  IRISH = 'Irish',
  OTHER = 'Other',
  NOT_SURE = 'Not sure',
}

export const enum ResponsibilityReasons {
  BIRTH_CERTIFICATE = 'Birth certificate',
  COURT_ORDER = 'Court order',
  RESPONSIBILITY_ORDER = 'Parental responsibility order',
  RESPONSIBILITY_AGREEMENT = 'Parental responsibility agreement',
  REMOVED_BY_COURT = 'Parental responsibility removed by court',
  NEVER_OBTAINED = 'Parental responsibility never obtained',
  OTHER = 'Other',
}

export const enum ContactDetails {
  EMAIL = 'email',
  PHONE = 'phone',
}

export interface Children {
  FirstName: string;
  LastName: string;
  DateOfBirth: DateAsString;
  Nationality: Nationality[];
  AdditionalNationality: ListValue<OtherName>[];
  FirstNameAfterAdoption: string;
  LastNameAfterAdoption: string;
  SexAtBirth: Gender;
}

export interface OtherName {
  id?: string;
  firstNames: string;
  lastNames: string;
}

export interface AdditionalNationality {
  id?: string;
  country: string;
}

export const enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NOT_GIVEN = 'notGiven',
  OTHER = 'other',
}

export interface PlacementOrder {
  placementOrderId: string;
  placementOrderType?: PlacementOrderTypeEnum;
  placementOrderNumber?: string;
  placementOrderCourt?: string;
  placementOrderDate?: CaseDate | string;
  otherPlacementOrderType?: string;
}

export interface CaseData {
  applyingWith: ApplyingWith;
  otherApplicantRelation: string;
  dateChildMovedIn?: DateAsString;
  applicant1FirstName: string;
  applicant1LastName: string;
  applicant1Email: string;
  applicant1HasOtherNames: YesOrNo;
  applicant1AdditionalNames: ListValue<OtherName>[];
  applicant1DateOfBirth: DateAsString;
  applicant1Occupation: string;
  applicant1EmailAddress: string;
  applicant1PhoneNumber: string;
  applicant1Address1: string;
  applicant1Address2: string;
  applicant1AddressTown: string;
  applicant1AddressCountry: string;
  applicant1AddressPostCode: string;
  applicant1ContactDetails: ContactDetails[];
  applicant1ContactDetailsConsent: YesOrNo;
  applicant1LanguagePreference?: LanguagePreference;
  applicant1HasReasonableAdjustment: YesOrNo;
  applicant1ReasonableAdjustmentDetails: string;

  applicant2FirstName: string;
  applicant2LastName: string;
  applicant2Email: string;
  applicant2HasOtherNames: YesOrNo;
  applicant2AdditionalNames: ListValue<OtherName>[];
  applicant2DateOfBirth: DateAsString;
  applicant2Occupation: string;
  applicant2EmailAddress: string;
  applicant2PhoneNumber: string;
  applicant2Address1: string;
  applicant2Address2: string;
  applicant2AddressTown: string;
  applicant2AddressCountry: string;
  applicant2AddressPostCode: string;
  applicant2AddressSameAsApplicant1: string;
  applicant2ContactDetails: ContactDetails[];
  applicant2ContactDetailsConsent: YesOrNo;
  applicant2LanguagePreference?: LanguagePreference;
  applicant2HasReasonableAdjustment: YesOrNo;
  applicant2ReasonableAdjustmentDetails: string;

  childrenFirstName: string;
  childrenLastName: string;
  childrenDateOfBirth: DateAsString;
  childrenNationality: Nationality[];
  childrenAdditionalNationalities: ListValue<AdditionalNationality>[];
  childrenFirstNameAfterAdoption: string;
  childrenLastNameAfterAdoption: string;
  childrenSexAtBirth: Gender;
  childrenOtherSexAtBirth: string;
  placementOrders: ListValue<PlacementOrder>[];
  addAnotherPlacementOrder: YesOrNo;
  selectedPlacementOrderId: string;
  hyphenatedCaseRef: string;

  birthMotherFirstName: string;
  birthMotherLastName: string;
  birthMotherStillAlive: string;
  birthMotherNotAliveReason: string;
  birthMotherNationality: Nationality[];
  birthMotherOtherNationalities: ListValue<AdditionalNationality>[];
  birthMotherOccupation: string;
  birthMotherAddressKnown: YesOrNo;
  birthMotherAddress1: string;
  birthMotherAddress2: string;
  birthMotherAddress3: string;
  birthMotherAddressTown: string;
  birthMotherAddressCounty: string;
  birthMotherAddressPostCode: string;
  birthMotherAddressCountry: string;
  birthMotherNameOnCertificate: string;
  birthMotherAddressNotKnownReason: string;
  birthMotherLastAddressDate: string;
  birthMotherServedWith: YesOrNo;
  birthMotherNotServedWithReason: string;

  birthFatherFirstName: string;
  birthFatherLastName: string;
  birthFatherStillAlive: string;
  birthFatherNotAliveReason: string;
  birthFatherResponsibility: string;
  birthFatherResponsibilityReason: ResponsibilityReasons[];
  birthFatherOtherResponsibilityReason: string;
  birthFatherNationality: Nationality[];
  birthFatherOtherNationalities: ListValue<AdditionalNationality>[];
  birthFatherOccupation: string;
  birthFatherAddressKnown: YesOrNo;
  birthFatherAddress1: string;
  birthFatherAddress2: string;
  birthFatherAddress3: string;
  birthFatherAddressTown: string;
  birthFatherAddressCounty: string;
  birthFatherAddressPostCode: string;
  birthFatherAddressCountry: string;
  birthFatherNameOnCertificate: string;
  birthFatherAddressNotKnownReason: string;
  birthFatherLastAddressDate: string;
  birthFatherIdentityKnown: string;
  birthFatherServedWith: YesOrNo;
  birthFatherNotServedWithReason: string;

  otherParentFirstName: string;
  otherParentLastName: string;
  otherParentStillAlive: string;
  otherParentNotAliveReason: string;
  otherParentResponsibilityReason: ResponsibilityReasons[];
  otherParentOtherResponsibilityReason: string;
  otherParentOccupation: string;
  otherParentAddressKnown: YesOrNo;
  otherParentAddress1: string;
  otherParentAddress2: string;
  otherParentAddress3: string;
  otherParentAddressTown: string;
  otherParentAddressCounty: string;
  otherParentAddressPostCode: string;
  otherParentAddressCountry: string;
  otherParentNameOnCertificate: string;
  otherParentAddressNotKnownReason: string;
  otherParentLastAddressDate: string;
  otherParentServedWith: YesOrNo;
  otherParentNotServedWithReason: string;

  childSocialWorkerName: string;
  childSocialWorkerPhoneNumber: string;
  childSocialWorkerEmail: string;
  childLocalAuthority: string;
  childLocalAuthorityEmail: string;

  applicantSocialWorkerName: string;
  applicantSocialWorkerPhoneNumber: string;
  applicantSocialWorkerEmail: string;
  applicantLocalAuthority: string;
  applicantLocalAuthorityEmail: string;

  solicitorFirm: string;
  solicitorName: string;
  solicitorPhoneNumber: string;
  solicitorEmail: string;
  solicitorHelpingWithApplication: YesOrNo;

  localAuthorityName: string;
  localAuthorityContactName: string;
  localAuthorityPhoneNumber: string;
  localAuthorityContactEmail: string;

  adopAgencyOrLaName: string;
  adopAgencyOrLaContactName: string;
  adopAgencyOrLaPhoneNumber: string;
  adopAgencyAddressLine1: string;
  adopAgencyTown: string;
  adopAgencyPostcode: string;
  adopAgencyOrLaContactEmail: string;

  siblings: ListValue<Sibling>[];
  payments: ListValue<Payment>[];
  hasAnotherAdopAgencyOrLA: YesOrNo;
  hasSiblings: YesNoNotsure;
  hasSiblingNotSureReason: string;
  addAnotherSiblingPlacementOrder: YesOrNo;
  selectedSiblingId: string;
  selectedSiblingRelation: string;
  selectedSiblingPoType: string;

  applicant1StatementOfTruth: YesOrNo;
  applicant2StatementOfTruth: YesOrNo;
  applicant1SotFullName: string;
  applicant2SotFullName: string;
  pcqId: string;
  applicant1DocumentsUploaded: ListValue<AdoptionDocument>[];
  laDocumentsUploaded: ListValue<AdoptionDocument>[];
  applicant1CannotUploadSupportingDocument: DocumentType[];
  laCannotUploadSupportingDocument: DocumentType[];
  applicant1CannotUpload: string;
  laCannotUpload: string;

  placementOrderCourt: string;
  findFamilyCourt: YesOrNo;
  familyCourtName: string;
  familyCourtEmailId: string;

  applicationType: ApplicationType;
  labelContentApplicant2: string;
  labelContentTheApplicant2: string;
  labelContentTheApplicant2UC: string;
  labelContentApplicant2UC: string;
  labelContentUnionType: string;
  labelContentUnionTypeUC: string;
  labelContentApplicationType: ApplicationType;

  applicant1AgreedToReceiveEmails: YesOrNo;
  applicant1LanguagePreferenceWelsh: YesOrNo;
  applicant1LastNameChangedWhenMarried: YesOrNo;
  applicant1NameDifferentToMarriageCertificate: YesOrNo;
  applicant1NameChangedHowOtherDetails: string;
  applicant1HomeAddress: AddressGlobalUK;
  applicant1KeepContactDetailsConfidential: YesOrNo;
  applicant1Gender: Gender;
  applicant1CorrespondenceAddress: AddressGlobalUK;
  applicant1SolicitorRepresented: YesOrNo;
  applicant1SolicitorName: string;
  applicant1SolicitorReference: string;
  applicant1SolicitorPhone: string;
  applicant1SolicitorEmail: string;
  applicant1SolicitorAgreeToReceiveEmails: YesOrNo;
  applicant1SolicitorOrganisationPolicy: OrganisationPolicy<UserRole>;
  applicant1FinancialOrder: YesOrNo;
  applicant1FinancialOrderFor: FinancialOrderFor[];

  applicant2MiddleName: string;
  applicant2AgreedToReceiveEmails: YesOrNo;
  applicant2LanguagePreferenceWelsh: YesOrNo;
  applicant2LastNameChangedWhenMarried: YesOrNo;
  applicant2NameDifferentToMarriageCertificate: YesOrNo;
  applicant2NameChangedHowOtherDetails: string;
  applicant2HomeAddress: AddressGlobalUK;
  applicant2KeepContactDetailsConfidential: YesOrNo;
  applicant2Gender: Gender;
  applicant2CorrespondenceAddress: AddressGlobalUK;
  applicant2SolicitorRepresented: YesOrNo;
  applicant2SolicitorName: string;
  applicant2SolicitorReference: string;
  applicant2SolicitorPhone: string;
  applicant2SolicitorEmail: string;
  applicant2SolicitorAgreeToReceiveEmails: YesOrNo;
  applicant2SolicitorOrganisationPolicy: OrganisationPolicy<UserRole>;
  applicant2FinancialOrder: YesOrNo;
  applicant2FinancialOrderFor: FinancialOrderFor[];
  applicant1ScreenHasMarriageBroken: YesOrNo;
  applicant2ScreenHasMarriageBroken: YesOrNo;
  screenHasMarriageCert: YesOrNo;
  marriageApplicant1Name: string;
  marriageApplicant2Name: string;
  marriageMarriedInUk: YesOrNo;
  marriageCertificateInEnglish: YesOrNo;
  marriageCertifiedTranslation: YesOrNo;
  marriageCountryOfMarriage: string;
  marriagePlaceOfMarriage: string;
  marriageDate: DateAsString;
  marriageIsSameSexCouple: YesOrNo;
  marriageCertifyMarriageCertificateIsCorrect: YesOrNo;
  marriageMarriageCertificateIsIncorrectDetails: string;
  marriageIssueApplicationWithoutMarriageCertificate: YesOrNo;
  jurisdictionApplicant1Residence: YesOrNo;
  jurisdictionApplicant2Residence: YesOrNo;
  jurisdictionApplicant1Domicile: YesOrNo;
  jurisdictionApplicant2Domicile: YesOrNo;
  jurisdictionApp1HabituallyResLastTwelveMonths: YesOrNo;
  jurisdictionApp1HabituallyResLastSixMonths: YesOrNo;
  jurisdictionBothLastHabituallyResident: YesOrNo;
  solServiceDateOfService: DateAsString;
  solServiceDocumentsServed: string;
  solServiceOnWhomServed: string;
  solServiceHowServed: DocumentsServedHow;
  solServiceServiceDetails: string;
  solServiceAddressServed: string;
  solServiceBeingThe: DocumentsServedBeingThe;
  solServiceLocationServed: DocumentsServedWhere;
  solServiceSpecifyLocationServed: string;
  solServiceServiceSotName: string;
  solServiceServiceSotFirm: string;
  solServiceTruthStatement: string;
  applicant1HWFReferenceNumber: string;
  applicant1HWFNeedHelp: YesOrNo;
  applicant1HWFAppliedForFees: YesOrNo;
  applicant2HWFReferenceNumber: string;
  applicant2HWFNeedHelp: YesOrNo;
  applicant2HWFAppliedForFees: YesOrNo;
  solUrgentCase: YesOrNo;
  solUrgentCaseSupportingInformation: string;
  applicant1WantsToHavePapersServedAnotherWay: YesOrNo;
  solServiceMethod: ServiceMethod;
  solStatementOfReconciliationCertify: YesOrNo;
  solStatementOfReconciliationDiscussed: YesOrNo;
  applicant1PrayerHasBeenGivenCheckbox: ThePrayer[];
  applicant2PrayerHasBeenGiven: YesOrNo;
  solSignStatementOfTruth: YesOrNo;
  solStatementOfReconciliationName: string;
  solStatementOfReconciliationFirm: string;
  statementOfReconciliationComments: string;
  solApplicationFeeInPounds: string;
  solPaymentHowToPay: SolicitorPaymentMethod;
  pbaNumbers: DynamicList;
  feeAccountReference: string;
  applicationFeeOrderSummary: OrderSummary;
  applicant1KnowsApplicant2EmailAddress: YesOrNo;
  app2ContactMethodIsDigital: YesOrNo;
  applicant2CannotUploadSupportingDocument: DocumentType[];
  documentUploadComplete: YesOrNo;
  miniApplicationLink: Document;
  dateSubmitted: DateAsString;
  applicant2ConfirmApplicant1Information: YesOrNo;
  applicant2ExplainsApplicant1IncorrectInformation: string;
  reissueDate: DateAsString;
  createdDate: DateAsString;
  rejectReason: RejectReason;
  previousState: State;
  applicationPayments: ListValue<Payment>[];
  overdueNotificationSent: YesOrNo;
  applicant1ReminderSent: YesOrNo;
  applicant2ReminderSent: YesOrNo;
  applicant1NotifiedCanApplyForConditionalOrder: YesOrNo;
  reissueOption: ReissueOption;
  applicant2InviteEmailAddress: string;
  applicant2UserId: string;
  jurisdictionDisagreeReason: string;
  dateAosSubmitted: DateAsString;
  digitalNoticeOfProceedings: YesOrNo;
  noticeOfProceedingsEmail: string;
  noticeOfProceedingsSolicitorFirm: string;
  statementOfTruth: YesOrNo;
  prayerHasBeenGiven: YesOrNo;
  coDateSubmitted: DateAsString;
  coRespondentAnswersLink: Document;
  coApplyForConditionalOrder: YesOrNo;
  coOnlinePetitionLink: Document;
  coChangeOrAddToApplication: YesOrNo;
  coIsEverythingInApplicationTrue: YesOrNo;
  coSolicitorName: string;
  coSolicitorFirm: string;
  coSolicitorAdditionalComments: string;
  coGranted: YesOrNo;
  coClaimsGranted: YesOrNo;
  coClaimsCostsOrderInformation: string;
  coDecisionDate: DateAsString;
  coGrantedDate: DateAsString;
  coRefusalDecision: RefusalOption;
  coRefusalAdminErrorInfo: string;
  coRefusalRejectionReason: RejectionReason;
  coRefusalRejectionAdditionalInfo: string;
  coRefusalClarificationReason: ClarificationReason;
  coRefusalClarificationAdditionalInfo: string;
  coClarificationResponse: string;
  coClarificationUploadDocuments: ListValue<AdoptionDocument>[];
  coOutcomeCase: YesOrNo;
  coCourt: ConditionalOrderCourt;
  coDateAndTimeOfHearing: DateAsString;
  coPronouncementJudge: string;
  coJudgeCostsClaimGranted: JudgeCostsClaimGranted;
  coJudgeCostsOrderAdditionalInfo: string;
  coCertificateOfEntitlementDocument: AdoptionDocument;
  coApplicantStatementOfTruth: YesOrNo;
  dateFinalOrderSubmitted: DateAsString;
  dateFinalOrderEligibleFrom: DateAsString;
  generalOrderDate: DateAsString;
  generalOrderDivorceParties: GeneralOrderDivorceParties[];
  generalOrderRecitals: string;
  generalOrderJudgeType: GeneralOrderJudge;
  generalOrderJudgeName: string;
  generalOrderLegalAdvisorName: string;
  generalOrderDetails: string;
  generalOrderDraft: Document;
  generalEmailParties: GeneralParties;
  generalEmailOtherRecipientEmail: string;
  generalEmailOtherRecipientName: string;
  generalEmailDetails: string;
  generalReferralReason: GeneralReferralReason;
  generalApplicationFrom: GeneralParties;
  generalApplicationReferralDate: DateAsString;
  generalApplicationAddedDate: DateAsString;
  generalReferralType: GeneralReferralType;
  alternativeServiceMedium: AlternativeServiceMediumType;
  generalReferralJudgeDetails: string;
  generalReferralLegalAdvisorDetails: string;
  generalReferralFeeRequired: YesOrNo;
  alternativeServiceApplications: ListValue<AlternativeService>[];
  receivedServiceApplicationDate: DateAsString;
  alternativeServiceType: AlternativeServiceType;
  receivedServiceAddedDate: DateAsString;
  serviceApplicationGranted: YesOrNo;
  serviceApplicationRefusalReason: string;
  serviceApplicationDecisionDate: DateAsString;
  deemedServiceDate: DateAsString;
  dateOfPayment: DateAsString;
  paymentMethod: ServicePaymentMethod;
  feeAccountNumber: string;
  feeAccountReferenceNumber: string;
  helpWithFeesReferenceNumber: string;
  servicePaymentFeeOrderSummary: OrderSummary;
  localCourtName: string;
  localCourtEmail: string;
  certificateOfServiceDocument: AdoptionDocument;
  certificateOfServiceDate: DateAsString;
  successfulServedByBailiff: YesOrNo;
  reasonFailureToServeByBailiff: string;
  applicant2DocumentsUploaded: ListValue<AdoptionDocument>[];
  documentsGenerated: ListValue<AdoptionDocument>[];
  documentsUploaded: ListValue<AdoptionDocument>[];
  confidentialDocumentsUploaded: ListValue<ConfidentialDivorceDocument>[];
  generalOrders: ListValue<DivorceGeneralOrder>[];
  previousCaseId: CaseLink;
  notes: ListValue<CaseNote>[];
  note: string;
  bulkListCaseReference: string;
  dataVersion: number;
  exampleRetiredField: string;
  applicant1ContactDetailsConfidential: ConfidentialAddress;
  applicant2ContactDetailsConfidential: ConfidentialAddress;
  applicant1LegalProceedingsRelated: LegalProceedingsRelated[];
  applicant2LegalProceedingsRelated: LegalProceedingsRelated[];
  dateConditionalOrderSubmitted: DateAsString;
  coWhoPaysCosts: WhoPaysCostOrder;
  coJudgeWhoPaysCosts: WhoPaysCostOrder;
  coJudgeTypeCostsDecision: CostOrderList;
  selectedDivorceCentreSiteId: string;
  coTypeCostsDecision: CostOrderList;
  legalProceedingsExist: YesOrNo;
  legalProceedingsDescription: string;
  doYouAgreeCourtHasJurisdiction: YesOrNo;
  serviceApplicationType: AlternativeServiceType;
  coCourtName: Court;
  courtName: Court;
  applicant1PrayerHasBeenGiven: YesOrNo;
  coAddNewDocuments: YesOrNo;
  coDocumentsUploaded: ListValue<AdoptionDocument>[];
  coIsEverythingInPetitionTrue: YesOrNo;
  otherPlacementOrderType: string;
  checkYourAnswersReturn: false;
  changeAddressBothApplicants: YesOrNo;
  status: State;
  laSotFullName: string;
  laSotJobtitle: string;
  laNameSot: string;
}

export interface Children {
  FirstName: string;
  LastName: string;
  DateOfBirth: DateAsString;
  Nationality: Nationality[];
  FirstNameAfterAdoption: string;
  LastNameAfterAdoption: string;
  SexAtBirth: Gender;
}

export interface Parent {
  FirstName: string;
  LastName: string;
  StillAlive: string;
  NotAliveReason: string;
  Nationality: Nationality[];
  Occupation: string;
  AddressKnown: YesOrNo;
  Address1: string;
  Address2: string;
  Address3: string;
  AddressTown: string;
  AddressCounty: string;
  AddressPostCode: string;
  AddressCountry: string;
  OtherNationalities: ListValue<AdditionalNationality>[];
  NameOnCertificate: string;
}

export interface LocalAuthority {
  localAuthorityName: string;
  localAuthorityContactName: string;
  localAuthorityPhoneNumber: string;
  localAuthorityContactEmail: string;
}

export interface AdoptionAgencyOrLocalAuthority {
  adopAgencyOrLaName?: string;
  adopAgencyOrLaContactName?: string;
  adopAgencyOrLaPhoneNumber?: string;
  adopAgencyAddressLine1?: string;
  adopAgencyTown?: string;
  adopAgencyPostcode?: string;
  adopAgencyOrLaContactEmail?: string;
}

export interface Sibling {
  siblingId: string;
  siblingRelation?: SiblingRelationships;
  siblingPoType?: SiblingPOType;
  siblingPoNumber?: string;
  siblingPlacementOtherType?: string;
}

export interface SocialWorker {
  socialWorkerName: string;
  socialWorkerPhoneNumber: string;
  socialWorkerEmail: string;
  localAuthority: string;
  localAuthorityEmail: string;
}

export interface Solicitor {
  solicitorFirm: string;
  solicitorName: string;
  solicitorPhoneNumber: string;
  solicitorEmail: string;
  solicitorHelpingWithApplication: YesOrNo;
}

export const enum PaymentMethod {
  PAY_BY_CARD = 'payByCard',
  PAY_BY_HWF = 'payByHWF',
  APPLY_FOR_HWF = 'applyForHWF',
}
export interface CaseInvite {
  applicant2InviteEmailAddress: string;
  accessCode: string;
  applicant2UserId: string;
}

export interface ConditionalOrder {
  DateSubmitted: DateAsString;
  RespondentAnswersLink: Document;
  ApplyForConditionalOrder: YesOrNo;
  OnlinePetitionLink: Document;
  ChangeOrAddToApplication: YesOrNo;
  IsEverythingInApplicationTrue: YesOrNo;
  SolicitorName: string;
  SolicitorFirm: string;
  SolicitorAdditionalComments: string;
  Granted: YesOrNo;
  ClaimsGranted: YesOrNo;
  ClaimsCostsOrderInformation: string;
  DecisionDate: DateAsString;
  GrantedDate: DateAsString;
  RefusalDecision: RefusalOption;
  RefusalAdminErrorInfo: string;
  RefusalRejectionReason: RejectionReason;
  RefusalRejectionAdditionalInfo: string;
  RefusalClarificationReason: ClarificationReason;
  RefusalClarificationAdditionalInfo: string;
  ClarificationResponse: string;
  ClarificationUploadDocuments: ListValue<AdoptionDocument>[];
  OutcomeCase: YesOrNo;
  Court: ConditionalOrderCourt;
  DateAndTimeOfHearing: DateAsString;
  PronouncementJudge: string;
  JudgeCostsClaimGranted: JudgeCostsClaimGranted;
  JudgeCostsOrderAdditionalInfo: string;
  CertificateOfEntitlementDocument: AdoptionDocument;
  ApplicantStatementOfTruth: YesOrNo;
}

export interface CtscContactDetails {
  serviceCentre: string;
  centreName: string;
  poBox: string;
  town: string;
  postcode: string;
  emailAddress: string;
  phoneNumber: string;
}

export interface DivorceGeneralOrder {
  generalOrderDocument: AdoptionDocument;
  generalOrderDivorceParties: GeneralOrderDivorceParties[];
}

export interface FinalOrder {
  dateFinalOrderSubmitted: DateAsString;
  dateFinalOrderEligibleFrom: DateAsString;
}

export interface GeneralEmail {
  generalEmailParties: GeneralParties;
  generalEmailOtherRecipientEmail: string;
  generalEmailOtherRecipientName: string;
  generalEmailDetails: string;
}

export interface GeneralOrder {
  generalOrderDate: DateAsString;
  generalOrderDivorceParties: GeneralOrderDivorceParties[];
  generalOrderRecitals: string;
  generalOrderJudgeType: GeneralOrderJudge;
  generalOrderJudgeName: string;
  generalOrderLegalAdvisorName: string;
  generalOrderDetails: string;
  generalOrderDraft: Document;
}

export interface GeneralReferral {
  generalReferralReason: GeneralReferralReason;
  generalApplicationFrom: GeneralParties;
  generalApplicationReferralDate: DateAsString;
  generalApplicationAddedDate: DateAsString;
  generalReferralType: GeneralReferralType;
  alternativeServiceMedium: AlternativeServiceMediumType;
  generalReferralJudgeDetails: string;
  generalReferralLegalAdvisorDetails: string;
  generalReferralFeeRequired: YesOrNo;
}

export interface HelpWithFees {
  ReferenceNumber: string;
  NeedHelp: YesOrNo;
  AppliedForFees: YesOrNo;
}

export interface Jurisdiction {
  Applicant1Residence: YesOrNo;
  Applicant2Residence: YesOrNo;
  Applicant1Domicile: YesOrNo;
  Applicant2Domicile: YesOrNo;
  App1HabituallyResLastTwelveMonths: YesOrNo;
  App1HabituallyResLastSixMonths: YesOrNo;
  ResidualEligible: YesOrNo;
  BothLastHabituallyResident: YesOrNo;
}

export interface LabelContent {
  Applicant2: string;
  TheApplicant2: string;
  TheApplicant2UC: string;
  Applicant2UC: string;
  UnionType: string;
  UnionTypeUC: string;
  ApplicationType: ApplicationType;
}

export interface MarriageDetails {
  Applicant1Name: string;
  Applicant2Name: string;
  MarriedInUk: YesOrNo;
  CertificateInEnglish: YesOrNo;
  CertifiedTranslation: YesOrNo;
  CountryOfMarriage: string;
  PlaceOfMarriage: string;
  Date: DateAsString;
  IsSameSexCouple: YesOrNo;
  CertifyMarriageCertificateIsCorrect: YesOrNo;
  MarriageCertificateIsIncorrectDetails: string;
  IssueApplicationWithoutMarriageCertificate: YesOrNo;
}

export interface RejectReason {
  rejectReasonType: RejectReasonType;
  rejectDetails: string;
}

export interface RetiredFields {
  dataVersion: number;
  exampleRetiredField: string;
  applicant1ContactDetailsConfidential: ConfidentialAddress;
  applicant2ContactDetailsConfidential: ConfidentialAddress;
  applicant1LegalProceedingsRelated: LegalProceedingsRelated[];
  applicant2LegalProceedingsRelated: LegalProceedingsRelated[];
  dateConditionalOrderSubmitted: DateAsString;
  coWhoPaysCosts: WhoPaysCostOrder;
  coJudgeWhoPaysCosts: WhoPaysCostOrder;
  coJudgeTypeCostsDecision: CostOrderList;
  selectedDivorceCentreSiteId: string;
  coTypeCostsDecision: CostOrderList;
  legalProceedingsExist: YesOrNo;
  legalProceedingsDescription: string;
  doYouAgreeCourtHasJurisdiction: YesOrNo;
  serviceApplicationType: AlternativeServiceType;
  coCourtName: Court;
  courtName: Court;
  applicant1PrayerHasBeenGiven: YesOrNo;
  coAddNewDocuments: YesOrNo;
  coDocumentsUploaded: ListValue<AdoptionDocument>[];
  coIsEverythingInPetitionTrue: YesOrNo;
}

export interface Solicitor {
  Name: string;
  Reference: string;
  Phone: string;
  Email: string;
  Address: string;
  AgreeToReceiveEmails: YesOrNo;
  OrganisationPolicy: OrganisationPolicy<UserRole>;
}

export interface SolicitorService {
  DateOfService: DateAsString;
  DocumentsServed: string;
  OnWhomServed: string;
  HowServed: DocumentsServedHow;
  ServiceDetails: string;
  AddressServed: string;
  BeingThe: DocumentsServedBeingThe;
  LocationServed: DocumentsServedWhere;
  SpecifyLocationServed: string;
  ServiceSotName: string;
  ServiceSotFirm: string;
  TruthStatement: string;
}

export interface ConfidentialDivorceDocument {
  confidentialDocumentsReceived: ConfidentialDocumentsReceived;
  documentLink: Document;
  documentDateAdded: DateAsString;
  documentComment: string;
  documentFileName: string;
}

export interface AdoptionDocument {
  documentDateAdded: DateAsString;
  documentComment: string;
  documentFileName: string;
  documentFileId: string;
  documentType: DocumentType;
  documentLink: Document;
}

export interface DocAssemblyRequest {
  templateId: string;
  outputType: string;
  formPayload: any;
  outputFilename: string;
}

export interface DocAssemblyResponse {
  renditionOutputLocation: string;
  binaryFilePath: string;
}

export interface DocumentInfo {
  url: string;
  filename: string;
  binaryUrl: string;
}

export interface Letter {
  adoptionDocument: AdoptionDocument;
  count: number;
}

export interface Print {
  letters: Letter[];
  caseId: string;
  caseRef: string;
  letterType: string;
}

export interface CreditAccountPaymentRequest {
  ccd_case_number: string;
  account_number: string;
  amount: string;
  fees: PaymentItem[];
  service: string;
  customer_reference: string;
  site_id: string;
  case_type: string;
  description: string;
  currency: string;
  organisation_name: string;
}

export interface CreditAccountPaymentResponse {
  account_number: string;
  ccd_case_number: string;
  amount: number;
  fees: Fee[];
  date_updated: string;
  method: string;
  status_histories: StatusHistoriesItem[];
  date_created: string;
  service_name: string;
  channel: string;
  description: string;
  organisation_name: string;
  payment_reference: string;
  external_provider: string;
  reference: string;
  case_reference: string;
  customer_reference: string;
  external_reference: string;
  site_id: string;
  payment_group_reference: string;
  currency: string;
  id: string;
  status: string;
}

/**
 * The response from retrieving a fee from fees and payments service
 */
export interface FeeResponse {
  version: number;
  description: string;
  code: string;
  fee_amount: number;
}

export interface Payment {
  created: DateAsString;
  updated: DateAsString;
  feeCode: string;
  amount: number;
  status: PaymentStatus;
  channel: string;
  reference: string;
  transactionId: string;
}

export interface PaymentItem {
  reference: string;
  volume: string;
  ccd_case_number: string;
  memo_line: string;
  natural_account_code: string;
  code: string;
  calculated_amount: string;
  version: string;
}

export interface PbaResponse {
  httpStatus: HttpStatus;
  errorMessage: string;
  paymentReference: string;
}

export interface StatusHistoriesItem {
  date_updated: string;
  date_created: string;
  external_status: string;
  status: string;
  error_code: string;
  error_message: string;
}

export type DateAsString = string;

export const enum FieldType {
  Unspecified = 'Unspecified',
  Email = 'Email',
  PhoneUK = 'PhoneUK',
  Date = 'Date',
  Document = 'Document',
  Schedule = 'Schedule',
  TextArea = 'TextArea',
  FixedList = 'FixedList',
  FixedRadioList = 'FixedRadioList',
  YesOrNo = 'YesOrNo',
  Address = 'Address',
  CaseLink = 'CaseLink',
  OrderSummary = 'OrderSummary',
  MultiSelectList = 'MultiSelectList',
  Collection = 'Collection',
  Label = 'Label',
}

export const enum YesOrNo {
  YES = 'Yes',
  NO = 'No',
}

export const enum YesNoNotsure {
  YES = 'Yes',
  NO = 'No',
  NOT_SURE = 'NotSure',
}

export const enum SectionStatus {
  CAN_NOT_START_YET = 'CAN_NOT_START_YET',
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export const enum AlternativeServiceMediumType {
  TEXT = 'text',
  EMAIL = 'email',
  SOCIAL_MEDIA = 'socialMedia',
  OTHER = 'other',
}

export const enum AlternativeServiceType {
  DEEMED = 'deemed',
  DISPENSED = 'dispensed',
  BAILIFF = 'bailiff',
}

export const enum ApplicationType {
  SOLE_APPLICATION = 'soleApplication',
  JOINT_APPLICATION = 'jointApplication',
}

export const enum ApplyingWith {
  ALONE = 'alone',
  WITH_SPOUSE_OR_CIVIL_PARTNER = 'withSpouseOrCivilPartner',
  WITH_SOME_ONE_ELSE = 'withSomeoneElse',
}

export const enum ClarificationReason {
  JURISDICTION_DETAILS = 'jurisdictionDetails',
  MARRIAGE_CERTIFICATE_TRANSLATION = 'marriageCertTranslation',
  MARRIAGE_CERTIFICATE = 'marriageCertificate',
  PREVIOUS_PROCEEDINGS_DETAILS = 'previousProceedingDetails',
  STATEMENT_OF_CASE_DETAILS = 'caseDetailsStatement',
  OTHER = 'other',
}

export const enum ConditionalOrderCourt {
  BIRMIGHAM = 'birmingham',
  BURY_ST_EDMUNDS = 'buryStEdmunds',
}

export const enum ConfidentialAddress {
  SHARE = 'share',
  KEEP = 'keep',
}

export const enum CostOrderList {
  ADDITIONAL_INFO = 'additionalInformation',
  SUBJECT_TO_DETAILED_ASSESSMENT = 'subjectToDetailedAssessment',
  HALF_COSTS = 'half',
  ALL_COSTS = 'all',
}

export const enum Court {
  SERVICE_CENTRE = 'serviceCentre',
  EAST_MIDLANDS = 'eastMidlands',
  WEST_MIDLANDS = 'westMidlands',
  SOUTH_WEST = 'southWest',
  NORTH_WEST = 'northWest',
  BURY_ST_EDMUNDS = 'buryStEdmunds',
}

export const enum Adoption {
  ADOPTION = 'adoption',
}

export const enum DocumentsServedBeingThe {
  LITIGATION_FRIEND = 'litigationFriend',
  SOLICITOR = 'solicitors',
  RESPONDENT = 'respondents',
  APPLICANT = 'applicants',
}

export const enum DocumentsServedHow {
  COURT_PERMITTED = 'courtPermitted',
  HANDED_TO = 'handedTo',
  DELIVERED_TO = 'deliveredTo',
  POSTED_TO = 'postedTo',
}

export const enum DocumentsServedWhere {
  OTHER_SPECIFY = 'otherSpecify',
  PLACE_BUSINESS_COMPANY = 'placeOfBusinessOfCompany',
  PRINCIPAL_OFFICE_COMPANY = 'principalOfficeCompany',
  PRINCIPAL_OFFICE_CORPORATION = 'principalOfficeCorporation',
  PRINCIPAL_OFFICE_PARTNERSHIP = 'principalOfficePartnership',
  LAST_KNOWN_PRINCIPAL_BUSINESS_PLACE = 'lastKnownPricipalBusinessPlace',
  LAST_KNOWN_BUSINESS_PLACE = 'lastKnownBusinessPlace',
  PRINCIPAL_PLACE_BUSINESS = 'principalPlaceBusiness',
  PLACE_BUSINESS = 'placeBusiness',
  LAST_KNOWN_RESIDENCE = 'lastKnownResidence',
  USUAL_RESIDENCE = 'usualResidence',
}

export const enum FinancialOrderFor {
  APPLICANT = 'applicant',
  CHILDREN = 'children',
}

export const enum GeneralOrderDivorceParties {
  APPLICANT = 'applicant',
  RESPONDENT = 'respondent',
}

export const enum GeneralOrderJudge {
  DISTRICT_JUDGE = 'districtJudge',
  DEPUTY_DISTRICT_JUDGE = 'deputyDistrictJudge',
  HIS_HONOUR_JUDGE = 'hisHonourJudge',
  HER_HONOUR_JUDGE = 'herHonourJudge',
  RECORDER = 'recorder',
}

export const enum GeneralParties {
  APPLICANT = 'applicant',
  RESPONDENT = 'respondent',
  OTHER = 'other',
}

export const enum GeneralReferralReason {
  CASEWORKER_REFERRAL = 'caseworkerReferral',
  GENERAL_APPLICATION_REFERRAL = 'generalApplicationReferral',
}

export const enum GeneralReferralType {
  CASEWORKER_REFERRAL = 'alternativeServiceApplication',
  ORDER_APPLICATION_WITHOUT_MC = 'orderApplicationWithoutMc',
  ORDER_ON_FILLING_OF_ANSWERS = 'orderOnFilingOfAnswers',
  PERMISSION_ON_DA_OOT = 'permissionOnDaOot',
  DISCLOSURE_VIA_DWP = 'disclosureViaDwp',
  OTHER = 'other',
}

export const enum JudgeCostsClaimGranted {
  YES = 'Yes',
  NO = 'No',
  ADJOURN = 'Adjourn',
}

export const enum LanguagePreference {
  ENGLISH = 'ENGLISH',
  WELSH = 'WELSH',
}

export const enum LegalProceedingsRelated {
  MARRIAGE = 'marriage',
  PROPERTY = 'property',
  CHILDREN = 'children',
}

export const enum PlacementOrderTypeEnum {
  AdoptionOrder = 'Adoption order',
  CareOrder = 'Care order',
  CHILD_ARRANGEMENT_ORDER = 'Child arrangements order',
  PlacementOrder = 'Placement order',
  SupervisionOrder = 'Supervision order',
  Other = 'Other',
}

export const enum RefusalOption {
  REJECT = 'reject',
  MORE_INFO = 'moreInfo',
  ADMIN_ERROR = 'adminError',
}

export const enum ReissueOption {
  DIGITAL_AOS = 'digitalAos',
  OFFLINE_AOS = 'offlineAos',
  REISSUE_CASE = 'reissueCase',
}

export const enum RejectReasonType {
  NO_INFO = 'noInfo',
  INCORRECT_INFO = 'incorrectInfo',
  OTHER = 'Other',
}

export const enum RejectionReason {
  NO_JURISDICTION = 'noJurisdiction',
  NO_CRITERIA = 'noCriteria',
  INSUFFICIENT_DETAILS = 'insufficentDetails',
  OTHER = 'other',
}

export const enum ServiceMethod {
  SOLICITOR_SERVICE = 'solicitorService',
  COURT_SERVICE = 'courtService',
}

export const enum ServicePaymentMethod {
  FEE_PAY_BY_ACCOUNT = 'feePayByAccount',
  FEE_PAY_BY_HWF = 'feePayByHelp',
  FEE_PAY_BY_PHONE = 'feePayByTelephone',
  FEE_PAY_BY_CHEQUE = 'feePayByCheque',
}

export const enum SiblingRelationships {
  SISTER = 'Sister',
  HALF_SISTER = 'Half-sister',
  STEP_SISTER = 'Step-sister',
  BROTHER = 'Brother',
  HALF_BROTHER = 'Half-brother',
  STEP_BROTHER = 'Step-brother',
}

export const enum SiblingPOType {
  ADOPTION_ORDER = 'Adoption order',
  CARE_ORDER = 'Care order',
  CHILD_ARRANGEMENT_ORDER = 'Child arrangements order',
  PLACEMENT_ORDER = 'Placement order',
  SUPERVIS_ORDER = 'Supervision order',
  OTHER = 'Other',
}

export const enum SolicitorPaymentMethod {
  FEE_PAY_BY_ACCOUNT = 'feePayByAccount',
  FEES_HELP_WITH = 'feesHelpWith',
}

export const enum State {
  Holding = 'Holding',
  AwaitingAos = 'AwaitingAos',
  AosDrafted = 'AosDrafted',
  AosOverdue = 'AosOverdue',
  Applicant2Approved = 'Applicant2Approved',
  AwaitingPayment = 'AwaitingPayment',
  AwaitingAdminChecks = 'AwaitingAdminChecks',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn',
  AwaitingDocuments = 'AwaitingDocuments',
  LaSubmitted = 'LaSubmitted',
  AwaitingApplicant1Response = 'AwaitingApplicant1Response',
  AwaitingApplicant2Response = 'AwaitingApplicant2Response',
  AwaitingBailiffReferral = 'AwaitingBailiffReferral',
  AwaitingBailiffService = 'AwaitingBailiffService',
  AwaitingClarification = 'AwaitingClarification',
  AwaitingConditionalOrder = 'AwaitingConditionalOrder',
  AwaitingGeneralConsideration = 'AwaitingGeneralConsideration',
  AwaitingGeneralReferralPayment = 'AwaitingGeneralReferralPayment',
  AwaitingHWFDecision = 'AwaitingHWFDecision',
  AwaitingLegalAdvisorReferral = 'AwaitingLegalAdvisorReferral',
  AwaitingService = 'AwaitingService',
  AwaitingServiceConsideration = 'AwaitingServiceConsideration',
  AwaitingServicePayment = 'AwaitingServicePayment',
  ConditionalOrderDrafted = 'ConditionalOrderDrafted',
  ConditionalOrderPronounced = 'ConditionalOrderPronounced',
  ConditionalOrderRefused = 'ConditionalOrderRefused',
  Disputed = 'Disputed',
  Draft = 'Draft',
  FinalOrderComplete = 'FinalOrderComplete',
  IssuedToBailiff = 'IssuedToBailiff',
  AwaitingPronouncement = 'AwaitingPronouncement',
  PendingDispute = 'PendingDispute',
  BulkCaseReject = 'BulkCaseReject',
  Submitted = 'Submitted',
}

export const enum UserRole {
  ADOPTION_GENERIC = 'caseworker-adoption',
  CASE_WORKER = 'caseworker-adoption-caseworker',
  COURT_ADMIN = 'caseworker-adoption-courtadmin',
  LEGAL_ADVISOR = 'caseworker-adoption-la',
  DISTRICT_JUDGE = 'caseworker-adoption-judge',
  SUPER_USER = 'caseworker-adoption-superuser',
  SOLICITOR = 'caseworker-adoption-solicitor',
  CITIZEN = 'citizen',
  CREATOR = '[CREATOR]',
}

export const enum WhoDivorcing {
  HUSBAND = 'husband',
  WIFE = 'wife',
}

export const enum WhoPaysCostOrder {
  APPLICANT = 'applicant',
  RESPONDENT = 'respondent',
}

export const enum ConfidentialDocumentsReceived {
  AOS = 'aos',
  ANNEX_A = 'annexa',
  AOS_INVITATION_LETTER_OFFLINE_RESP = 'aosInvitationLetterOfflineResp',
  APPLICATION = 'application',
  BAILIFF_SERVICE = 'baliffService',
  COE = 'coe',
  CO_ANSWERS = 'coAnswers',
  CONDITIONAL_ORDER_APPLICATION = 'conditionalOrderApplication',
  CONDITIONAL_ORDER_GRANTED = 'conditionalOrderGranted',
  CO_REFUSAL_CLARIFICATION_RESP = 'coRefusalClarificationResp',
  CORRESPONDENCE = 'correspondence',
  COSTS = 'costs',
  COSTS_ORDER = 'costsOrder',
  DEEMED_SERVICE = 'deemedService',
  DISPENSE_WITH_SERVICE = 'dispenseWithService',
  D84A = 'd84a',
  D9D = 'd9d',
  D9H = 'd9h',
  EMAIL = 'email',
  FINAL_ORDER_APPLICATION = 'finalOrderApplication',
  FINAL_ORDER_GRANTED = 'finalOrderGranted',
  MARRIAGE_CERT = 'marriageCert',
  MARRIAGE_CERT_TRANSLATION = 'marriageCertTranslation',
  NAME_CHANGE = 'nameChange',
  NOTICE_OF_REFUSAL_OF_ENTITLEMENT = 'noticeOfRefusalOfEntitlement',
  OTHER = 'other',
  RESPONDENT_ANSWERS = 'respondentAnswers',
  SOLICITOR_SERVICE = 'solicitorService',
  WELSH_TRANSLATION = 'welshTranslation',
}

export const enum DocumentType {
  BIRTH_OR_ADOPTION_CERTIFICATE = 'birthOrAdoptionCertificate',
  DEATH_CERTIFICATE = 'deathCertificate',
  APPLICATION = 'application',
  EMAIL = 'email',
  APPLICATION_SUMMARY = 'applicationSummary',
}

export const enum PaymentStatus {
  IN_PROGRESS = 'inProgress',
  SUCCESS = 'success',
  DECLINED = 'declined',
  TIMED_OUT = 'timedOut',
  CANCELLED = 'cancelled',
  ERROR = 'error',
}

export const enum PbaErrorMessage {
  CAE0001 = 'CAE0001',
  CAE0003 = 'CAE0003',
  CAE0004 = 'CAE0004',
  NOT_FOUND = 'NOT_FOUND',
  GENERAL = 'GENERAL',
}

export const enum ThePrayer {
  I_CONFIRM = 'Yes',
}

/**
 * Values:
 * - `CONTINUE`
 * - `SWITCHING_PROTOCOLS`
 * - `PROCESSING`
 * - `CHECKPOINT`
 * - `OK`
 * - `CREATED`
 * - `ACCEPTED`
 * - `NON_AUTHORITATIVE_INFORMATION`
 * - `NO_CONTENT`
 * - `RESET_CONTENT`
 * - `PARTIAL_CONTENT`
 * - `MULTI_STATUS`
 * - `ALREADY_REPORTED`
 * - `IM_USED`
 * - `MULTIPLE_CHOICES`
 * - `MOVED_PERMANENTLY`
 * - `FOUND`
 * - `MOVED_TEMPORARILY` - @deprecated
 * - `SEE_OTHER`
 * - `NOT_MODIFIED`
 * - `USE_PROXY` - @deprecated
 * - `TEMPORARY_REDIRECT`
 * - `PERMANENT_REDIRECT`
 * - `BAD_REQUEST`
 * - `UNAUTHORIZED`
 * - `PAYMENT_REQUIRED`
 * - `FORBIDDEN`
 * - `NOT_FOUND`
 * - `METHOD_NOT_ALLOWED`
 * - `NOT_ACCEPTABLE`
 * - `PROXY_AUTHENTICATION_REQUIRED`
 * - `REQUEST_TIMEOUT`
 * - `CONFLICT`
 * - `GONE`
 * - `LENGTH_REQUIRED`
 * - `PRECONDITION_FAILED`
 * - `PAYLOAD_TOO_LARGE`
 * - `REQUEST_ENTITY_TOO_LARGE` - @deprecated
 * - `URI_TOO_LONG`
 * - `REQUEST_URI_TOO_LONG` - @deprecated
 * - `UNSUPPORTED_MEDIA_TYPE`
 * - `REQUESTED_RANGE_NOT_SATISFIABLE`
 * - `EXPECTATION_FAILED`
 * - `I_AM_A_TEAPOT`
 * - `INSUFFICIENT_SPACE_ON_RESOURCE` - @deprecated
 * - `METHOD_FAILURE` - @deprecated
 * - `DESTINATION_LOCKED` - @deprecated
 * - `UNPROCESSABLE_ENTITY`
 * - `LOCKED`
 * - `FAILED_DEPENDENCY`
 * - `TOO_EARLY`
 * - `UPGRADE_REQUIRED`
 * - `PRECONDITION_REQUIRED`
 * - `TOO_MANY_REQUESTS`
 * - `REQUEST_HEADER_FIELDS_TOO_LARGE`
 * - `UNAVAILABLE_FOR_LEGAL_REASONS`
 * - `INTERNAL_SERVER_ERROR`
 * - `NOT_IMPLEMENTED`
 * - `BAD_GATEWAY`
 * - `SERVICE_UNAVAILABLE`
 * - `GATEWAY_TIMEOUT`
 * - `HTTP_VERSION_NOT_SUPPORTED`
 * - `VARIANT_ALSO_NEGOTIATES`
 * - `INSUFFICIENT_STORAGE`
 * - `LOOP_DETECTED`
 * - `BANDWIDTH_LIMIT_EXCEEDED`
 * - `NOT_EXTENDED`
 * - `NETWORK_AUTHENTICATION_REQUIRED`
 */
export const enum HttpStatus {
  CONTINUE = 'CONTINUE',
  SWITCHING_PROTOCOLS = 'SWITCHING_PROTOCOLS',
  PROCESSING = 'PROCESSING',
  CHECKPOINT = 'CHECKPOINT',
  OK = 'OK',
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  NON_AUTHORITATIVE_INFORMATION = 'NON_AUTHORITATIVE_INFORMATION',
  NO_CONTENT = 'NO_CONTENT',
  RESET_CONTENT = 'RESET_CONTENT',
  PARTIAL_CONTENT = 'PARTIAL_CONTENT',
  MULTI_STATUS = 'MULTI_STATUS',
  ALREADY_REPORTED = 'ALREADY_REPORTED',
  IM_USED = 'IM_USED',
  MULTIPLE_CHOICES = 'MULTIPLE_CHOICES',
  MOVED_PERMANENTLY = 'MOVED_PERMANENTLY',
  FOUND = 'FOUND',
  /**
   * @deprecated
   */
  MOVED_TEMPORARILY = 'MOVED_TEMPORARILY',
  SEE_OTHER = 'SEE_OTHER',
  NOT_MODIFIED = 'NOT_MODIFIED',
  /**
   * @deprecated
   */
  USE_PROXY = 'USE_PROXY',
  TEMPORARY_REDIRECT = 'TEMPORARY_REDIRECT',
  PERMANENT_REDIRECT = 'PERMANENT_REDIRECT',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  NOT_ACCEPTABLE = 'NOT_ACCEPTABLE',
  PROXY_AUTHENTICATION_REQUIRED = 'PROXY_AUTHENTICATION_REQUIRED',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  CONFLICT = 'CONFLICT',
  GONE = 'GONE',
  LENGTH_REQUIRED = 'LENGTH_REQUIRED',
  PRECONDITION_FAILED = 'PRECONDITION_FAILED',
  PAYLOAD_TOO_LARGE = 'PAYLOAD_TOO_LARGE',
  /**
   * @deprecated
   */
  REQUEST_ENTITY_TOO_LARGE = 'REQUEST_ENTITY_TOO_LARGE',
  URI_TOO_LONG = 'URI_TOO_LONG',
  /**
   * @deprecated
   */
  REQUEST_URI_TOO_LONG = 'REQUEST_URI_TOO_LONG',
  UNSUPPORTED_MEDIA_TYPE = 'UNSUPPORTED_MEDIA_TYPE',
  REQUESTED_RANGE_NOT_SATISFIABLE = 'REQUESTED_RANGE_NOT_SATISFIABLE',
  EXPECTATION_FAILED = 'EXPECTATION_FAILED',
  I_AM_A_TEAPOT = 'I_AM_A_TEAPOT',
  /**
   * @deprecated
   */
  INSUFFICIENT_SPACE_ON_RESOURCE = 'INSUFFICIENT_SPACE_ON_RESOURCE',
  /**
   * @deprecated
   */
  METHOD_FAILURE = 'METHOD_FAILURE',
  /**
   * @deprecated
   */
  DESTINATION_LOCKED = 'DESTINATION_LOCKED',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  LOCKED = 'LOCKED',
  FAILED_DEPENDENCY = 'FAILED_DEPENDENCY',
  TOO_EARLY = 'TOO_EARLY',
  UPGRADE_REQUIRED = 'UPGRADE_REQUIRED',
  PRECONDITION_REQUIRED = 'PRECONDITION_REQUIRED',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  REQUEST_HEADER_FIELDS_TOO_LARGE = 'REQUEST_HEADER_FIELDS_TOO_LARGE',
  UNAVAILABLE_FOR_LEGAL_REASONS = 'UNAVAILABLE_FOR_LEGAL_REASONS',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
  BAD_GATEWAY = 'BAD_GATEWAY',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
  HTTP_VERSION_NOT_SUPPORTED = 'HTTP_VERSION_NOT_SUPPORTED',
  VARIANT_ALSO_NEGOTIATES = 'VARIANT_ALSO_NEGOTIATES',
  INSUFFICIENT_STORAGE = 'INSUFFICIENT_STORAGE',
  LOOP_DETECTED = 'LOOP_DETECTED',
  BANDWIDTH_LIMIT_EXCEEDED = 'BANDWIDTH_LIMIT_EXCEEDED',
  NOT_EXTENDED = 'NOT_EXTENDED',
  NETWORK_AUTHENTICATION_REQUIRED = 'NETWORK_AUTHENTICATION_REQUIRED',
}

export const CASE_TYPE = 'A58';
export const JURISDICTION = 'ADOPTION';
export const CITIZEN_SUBMIT = 'citizen-submit-application';
export const CITIZEN_CREATE = 'citizen-create-application';
export const LA_SUBMIT = 'local-authority-application-submit';
export const CITIZEN_SAVE_AND_CLOSE = 'citizen-save-and-close';
export const CITIZEN_UPDATE = 'citizen-update-application';
export const SYSTEM_USER_UPDATE = 'system-user-update-application';
export const SWITCH_TO_SOLE = 'switch-to-sole';
export const CITIZEN_ADD_PAYMENT = 'citizen-add-payment';
