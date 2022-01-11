import { AnyObject } from '../controller/PostController';

import {
  ApplicationType,
  CaseData,
  ChangedNameHow,
  DateAsString,
  DivorceDocument,
  DivorceOrDissolution,
  DocumentType,
  Gender,
  JurisdictionConnections,
  ListValue,
  OrderSummary,
  Payment,
  PlacementOrder,
  State,
  YesOrNo,
} from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  applicationType: 'applicationType',
  divorceOrDissolution: 'divorceOrDissolution',
  gender: 'applicant2Gender',
  applicant1ScreenHasUnionBroken: 'applicant1ScreenHasMarriageBroken',
  applicant2ScreenHasUnionBroken: 'applicant2ScreenHasMarriageBroken',
  hasCertificate: 'screenHasMarriageCert',
  applicant1HelpPayingNeeded: 'applicant1HWFNeedHelp',
  applicant1AlreadyAppliedForHelpPaying: 'applicant1HWFAppliedForFees',
  applicant1HelpWithFeesRefNo: 'applicant1HWFReferenceNumber',
  applicant2HelpPayingNeeded: 'applicant2HWFNeedHelp',
  applicant2AlreadyAppliedForHelpPaying: 'applicant2HWFAppliedForFees',
  applicant2HelpWithFeesRefNo: 'applicant2HWFReferenceNumber',
  inTheUk: 'marriageMarriedInUk',
  certificateInEnglish: 'marriageCertificateInEnglish',
  certifiedTranslation: 'marriageCertifiedTranslation',
  ceremonyCountry: 'marriageCountryOfMarriage',
  ceremonyPlace: 'marriagePlaceOfMarriage',
  applicant1LifeBasedInEnglandAndWales: 'jurisdictionApplicant1Residence',
  applicant2LifeBasedInEnglandAndWales: 'jurisdictionApplicant2Residence',
  applicant1DomicileInEnglandWales: 'jurisdictionApplicant1Domicile',
  applicant2DomicileInEnglandWales: 'jurisdictionApplicant2Domicile',
  bothLastHabituallyResident: 'jurisdictionBothLastHabituallyResident',
  applicant1LivingInEnglandWalesTwelveMonths: 'jurisdictionApp1HabituallyResLastTwelveMonths',
  applicant1LivingInEnglandWalesSixMonths: 'jurisdictionApp1HabituallyResLastSixMonths',
  applicant1PhoneNumber: 'applicant1PhoneNumber',
  connections: 'jurisdictionConnections',
  applicant1FirstNames: 'applicant1FirstName',
  applicant1MiddleNames: 'applicant1MiddleName',
  applicant1LastNames: 'applicant1LastName',
  applicant2FirstNames: 'applicant2FirstName',
  applicant2MiddleNames: 'applicant2MiddleName',
  applicant2LastNames: 'applicant2LastName',
  applicant1FullNameOnCertificate: 'marriageApplicant1Name',
  applicant2FullNameOnCertificate: 'marriageApplicant2Name',
  applicant1ConfirmReceipt: 'applicant1ConfirmReceipt',
  applicant2ConfirmReceipt: 'applicant2ConfirmReceipt',
  applicant1LastNameChangedWhenRelationshipFormed: 'applicant1LastNameChangedWhenMarried',
  applicant2LastNameChangedWhenRelationshipFormed: 'applicant2LastNameChangedWhenMarried',
  applicant1NameChangedSinceRelationshipFormed: 'applicant1NameDifferentToMarriageCertificate',
  applicant2NameChangedSinceRelationshipFormed: 'applicant2NameDifferentToMarriageCertificate',
  applicant1NameChangedHow: 'applicant1NameChangedHow',
  applicant1ChangedNameHowAnotherWay: 'applicant1NameChangedHowOtherDetails',
  applicant2NameChangedHow: 'applicant2NameChangedHow',
  applicant2ChangedNameHowAnotherWay: 'applicant2NameChangedHowOtherDetails',
  applicant2EmailAddress: 'applicant2InviteEmailAddress',
  applicant2PhoneNumber: 'applicant2PhoneNumber',
  applicant1KnowsApplicant2Address: 'applicant1KnowsApplicant2Address',
  applicant1LegalProceedings: 'applicant1LegalProceedings',
  applicant1LegalProceedingsDetails: 'applicant1LegalProceedingsDetails',
  applicant2LegalProceedings: 'applicant2LegalProceedings',
  applicant2LegalProceedingsDetails: 'applicant2LegalProceedingsDetails',
  applyForFinancialOrder: 'applicant1FinancialOrder',
  applicant2ApplyForFinancialOrder: 'applicant2FinancialOrder',
  applicant1DocumentsUploaded: 'applicant1DocumentsUploaded',
  applicant2DocumentsUploaded: 'applicant2DocumentsUploaded',
  documentsGenerated: 'documentsGenerated',
  respondentUserId: 'applicant2UserId',
  applicant2Confirmation: 'applicant2ConfirmApplicant1Information',
  applicant2Explanation: 'applicant2ExplainsApplicant1IncorrectInformation',
  applicant1PcqId: 'applicant1PcqId',
  issueDate: 'issueDate',
  applicant1SolicitorAddress: 'applicant1SolicitorAddress',
  applicant2SolicitorAddress: 'applicant2SolicitorAddress',
  accessCode: 'accessCode',
  applicationFeeOrderSummary: 'applicationFeeOrderSummary',
  payments: 'applicationPayments',
  disputeApplication: 'disputeApplication',
  confirmDisputeApplication: 'confirmDisputeApplication',
  jurisdictionAgree: 'jurisdictionAgree',
  reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: 'reasonCourtsOfEnglandAndWalesHaveNoJurisdiction',
  inWhichCountryIsYourLifeMainlyBased: 'inWhichCountryIsYourLifeMainlyBased',
};

export function formatCase<InputFormat, OutputFormat>(fields: FieldFormats, data: InputFormat): OutputFormat {
  const result = {};

  for (const field of Object.keys(data)) {
    const value = fields[field];

    if (typeof value === 'function') {
      Object.assign(result, value(data));
    } else if (typeof fields[field] === 'string') {
      result[value] = data[field];
    }
  }

  return result as OutputFormat;
}

export type FieldFormats = Record<string, string | ((AnyObject) => AnyObject)>;

export interface Case {
  applyingWith?: string;
  addButton?: string;
  applicant1AdditionalName?: string;
  applicant2AdditionalName?: string;
  applicant1AdditionalNames?: string[];
  applicant2AdditionalNames?: string[];
  addAnotherNationality: string;
  applicant1Nationality?: string[];
  applicant1AdditionalNationalities?: string[];
  applicant2AdditionalNationalities?: string[];
  applicant1SelectAddress?: string;
  applicant2SelectAddress?: string;
  applicant1EmailAddress?: string;
  applicant1ContactDetails?: string[];
  applicant2AddressSameAsApplicant1?: YesOrNo;
  placementOrders?: PlacementOrder[];
  selectedPlacementOrderId?: string;
  addAnotherPlacementOrder?: YesOrNo;

  childrenFirstName?: string;
  childrenLastName?: string;
  childrenDateOfBirth?: CaseDate;
  childrenSexAtBirth?: Gender;
  childrenNationality?: string[];
  childrenAdditionalNationalities?: string[];
  childrenFirstNameAfterAdoption?: string;
  childrenLastNameAfterAdoption?: string;

  birthFathersNameOnCertificate?: string;
  birthFatherFirstNames?: string;
  birthFatherLastNames?: string;
  birthFatherStillAlive?: string;
  birthFatherUnsureAliveReason?: string;
  birthFatherNationality?: string[];
  birthFatherOtherNationalities?: string[];
  birthFatherOccupation?: string;
  birthFatherAddressKnown?: YesOrNo;

  birthFatherAddress1?: string;
  birthFatherAddress2?: string;
  birthFatherAddress3?: string;
  birthFatherAddressTown?: string;
  birthFatherAddressCounty?: string;
  birthFatherAddressPostcode?: string;
  birthFatherAddressCountry?: string;

  applicationType?: ApplicationType;
  divorceOrDissolution: DivorceOrDissolution;
  issueDate?: DateAsString;
  applicant1SolicitorAddress?: string;
  applicant2SolicitorAddress?: string;
  gender?: Gender;
  sameSex?: Checkbox;
  applicant1ScreenHasUnionBroken?: YesOrNo;
  applicant2ScreenHasUnionBroken?: YesOrNo;
  relationshipDate?: CaseDate;
  hasCertificate?: YesOrNo;
  applicant1HelpPayingNeeded?: YesOrNo;
  applicant1AlreadyAppliedForHelpPaying?: YesOrNo;
  applicant1HelpWithFeesRefNo?: string;
  applicant2HelpPayingNeeded?: YesOrNo;
  applicant2AlreadyAppliedForHelpPaying?: YesOrNo;
  applicant2HelpWithFeesRefNo?: string;
  inTheUk?: YesOrNo;
  certificateInEnglish?: YesOrNo;
  certifiedTranslation?: YesOrNo;
  ceremonyCountry?: string;
  ceremonyPlace?: string;
  applicant1LifeBasedInEnglandAndWales?: YesOrNo;
  applicant2LifeBasedInEnglandAndWales?: YesOrNo;
  applicant1DomicileInEnglandWales?: YesOrNo;
  applicant2DomicileInEnglandWales?: YesOrNo;
  bothLastHabituallyResident?: YesOrNo;
  applicant1LivingInEnglandWalesTwelveMonths?: YesOrNo;
  applicant1LivingInEnglandWalesSixMonths?: YesOrNo;
  jurisdictionResidualEligible?: Checkbox;
  applicant1EnglishOrWelsh?: LanguagePreference;
  applicant2EnglishOrWelsh?: LanguagePreference;
  applicant1FirstNames?: string;
  applicant1MiddleNames?: string;
  applicant1LastNames?: string;
  applicant1Address1?: string;
  applicant1Address2?: string;
  applicant1Address3?: string;
  applicant1AddressTown?: string;
  applicant1AddressCounty?: string;
  applicant1AddressPostcode?: string;
  applicant1AddressCountry?: string;
  applicant1PhoneNumber?: string;
  applicant1AgreeToReceiveEmails?: Checkbox;
  applicant1ConfirmReceipt: YesOrNo;
  applicant2PhoneNumber?: string;
  applicant2AgreeToReceiveEmails?: Checkbox;
  applicant2ConfirmReceipt: YesOrNo;
  connections: JurisdictionConnections[];
  applicant1FullNameOnCertificate?: string;
  applicant2FullNameOnCertificate?: string;
  applicant1AddressPrivate: YesOrNo;
  applicant2FirstNames?: string;
  applicant2MiddleNames?: string;
  applicant2LastNames?: string;
  applicant2AddressPrivate: YesOrNo;
  applicant2Address1?: string;
  applicant2Address2?: string;
  applicant2Address3?: string;
  applicant2AddressTown?: string;
  applicant2AddressCounty?: string;
  applicant2AddressPostcode?: string;
  applicant2AddressCountry?: string;
  applicant1LastNameChangedWhenRelationshipFormed?: YesOrNo;
  applicant2LastNameChangedWhenRelationshipFormed?: YesOrNo;
  applicant1NameChangedSinceRelationshipFormed?: YesOrNo;
  applicant2NameChangedSinceRelationshipFormed?: YesOrNo;
  applicant1NameChangedHow?: ChangedNameHow[];
  applicant2NameChangedHow?: ChangedNameHow[];
  applicant1ChangedNameHowAnotherWay?: string;
  applicant2ChangedNameHowAnotherWay?: string;
  applicant2EmailAddress?: string;
  applicant1DoesNotKnowApplicant2EmailAddress?: Checkbox;
  applicant1KnowsApplicant2Address?: YesOrNo;
  iWantToHavePapersServedAnotherWay?: Checkbox;
  applicant1LegalProceedings?: YesOrNo;
  applicant1LegalProceedingsDetails?: string;
  applicant2LegalProceedings?: YesOrNo;
  applicant2LegalProceedingsDetails?: string;
  applyForFinancialOrder?: YesOrNo;
  applicant2ApplyForFinancialOrder?: YesOrNo;
  applicant1UploadedFiles?: UploadedFile[];
  applicant2UploadedFiles?: UploadedFile[];
  documentsGenerated: ListValue<DivorceDocument>[];
  applicant1DocumentsUploaded?: ListValue<Partial<DivorceDocument> | null>[];
  applicant2DocumentsUploaded?: ListValue<Partial<DivorceDocument> | null>[];
  applicant1CannotUpload?: Checkbox;
  applicant2CannotUpload?: Checkbox;
  applicant1CannotUploadDocuments?: DocumentType | DocumentType[];
  applicant2CannotUploadDocuments?: DocumentType | DocumentType[];
  accessCode?: string;
  dueDate?: DateAsString;
  applicant1IConfirmPrayer?: Checkbox;
  applicant2IConfirmPrayer?: Checkbox;
  applicant1IBelieveApplicationIsTrue?: Checkbox;
  applicant2IBelieveApplicationIsTrue?: Checkbox;
  caseReference?: string;
  respondentUserId?: string;
  dateSubmitted?: Date;
  payments: ListValue<Payment>[];
  applicationFeeOrderSummary: OrderSummary;
  applicant2Confirmation: YesOrNo;
  applicant2Explanation: string;
  applicant1PcqId?: string;
  disputeApplication?: YesOrNo;
  confirmDisputeApplication?: YesOrNo;
  confirmReadPetition?: Checkbox;
  jurisdictionAgree?: YesOrNo;
  reasonCourtsOfEnglandAndWalesHaveNoJurisdiction?: string;
  inWhichCountryIsYourLifeMainlyBased?: string;
}

export interface CaseWithId extends Case {
  id: string;
  state: State;
}

export enum Checkbox {
  Checked = 'checked',
  Unchecked = '',
}

export interface CaseDate {
  year: string;
  month: string;
  day: string;
}

export enum LanguagePreference {
  English = 'english',
  Welsh = 'welsh',
}

export interface UploadedFile {
  id: string;
  name: string;
}

export enum FieldPrefix {
  APPLICANT1 = 'applicant1',
  APPLICANT2 = 'applicant2',
  CHILDREN = 'children',
  BIRTH_FATHER = 'birthFather',
}
