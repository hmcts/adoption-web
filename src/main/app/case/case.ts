import { AnyObject } from '../controller/PostController';

import {
  Adoption,
  ApplicationType,
  ApplyingWith,
  CaseData,
  ChangedNameHow,
  DateAsString,
  DivorceDocument,
  DivorceOrDissolution,
  DocumentType,
  Gender,
  JurisdictionConnections,
  ListValue,
  Nationality,
  OrderSummary,
  Payment,
  PlacementOrder,
  State,
  YesOrNo,
  //Children,
  //OtherName,
} from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  applicationType: 'applicationType',
  applyingWith: 'applyingWith',
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
  connections: 'jurisdictionConnections',

  applicant1FirstNames: 'applicant1FirstName',
  applicant1MiddleNames: 'applicant1MiddleName',
  applicant1LastNames: 'applicant1LastName',
  applicant1FullName: 'applicant1FullName',
  applicant1HasOtherNames: 'applicant1HasOtherNames',
  applicant1AdditionalNames: 'applicant1AdditionalNames',
  applicant1DateOfBirth: 'applicant1DateOfBirth',
  applicant1Occupation: 'applicant1Occupation',
  applicant1EmailAddress: 'applicant1EmailAddress',
  applicant1PhoneNumber: 'applicant1PhoneNumber',
  applicant1Nationality: 'applicant1Nationality',
  applicant1Address1: 'applicant1Address1',
  applicant1Address2: 'applicant1Address2',
  applicant1Town: 'applicant1Town',
  applicant1Country: 'applicant1Country',
  applicant1PostCode: 'applicant1PostCode',

  applicant2FirstNames: 'applicant2FirstName',
  applicant2LastNames: 'applicant2LastName',
  applicant2HasOtherNames: 'applicant2HasOtherNames',
  applicant2AdditionalNames: 'applicant2AdditionalNames',
  applicant2DateOfBirth: 'applicant2DateOfBirth',
  applicant2Occupation: 'applicant2Occupation',
  applicant2EmailAddress: 'applicant2EmailAddress',
  applicant2PhoneNumber: 'applicant2PhoneNumber',
  applicant2Nationality: 'applicant2Nationality',
  applicant2Address1: 'applicant2Address1',
  applicant2Address2: 'applicant2Address2',
  applicant2Town: 'applicant2Town',
  applicant2Country: 'applicant2Country',
  applicant2PostCode: 'applicant2PostCode',

  childrenFirstName: 'childrenFirstName',
  childrenLastName: 'childrenLastName',
  childrenDateOfBirth: 'childrenDateOfBirth',
  childrenNationality: 'childrenNationality',
  childrenFirstNameAfterAdoption: 'childrenFirstNameAfterAdoption',
  childrenLastNameAfterAdoption: 'childrenLastNameAfterAdoption',
  childrenSexAtBirth: 'childrenSexAtBirth',
  placementOrderNumber: 'placementOrderNumber',
  placementOrderCourt: 'placementOrderCourt',
  placementOrderDate: 'placementOrderDate',
  addAnotherPlacementOrder: 'addAnotherPlacementOrder',

  applicant2MiddleNames: 'applicant2MiddleName',
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
  //applicant2EmailAddress: 'applicant2InviteEmailAddress',
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
  console.log('case.ts 151-a-' + JSON.stringify(result));
  return result as OutputFormat;
}

export type FieldFormats = Record<string, string | ((AnyObject) => AnyObject)>;

export interface Case {
  addButton?: string;
  addAnotherNationality: string;
  // applicant1Nationality?: string[];
  applicant1AdditionalNationalities?: string[];
  applicant2AdditionalNationalities?: string[];
  applicant1SelectAddress?: string;
  applicant2SelectAddress?: string;
  applicant1ContactDetails?: string[];
  applicant2AddressSameAsApplicant1?: YesOrNo;
  placementOrders?: PlacementOrder[];
  selectedPlacementOrderId?: string;
  //addAnotherPlacementOrder?: YesOrNo;

  // childrenFirstName?: string;
  // childrenLastName?: string;
  // childrenDateOfBirth?: CaseDate;
  // childrenSexAtBirth?: Gender;
  // childrenNationality?: string[];
  childrenAdditionalNationalities?: string[];

  applicationType?: ApplicationType;
  applyingWith?: ApplyingWith;

  divorceOrDissolution: DivorceOrDissolution;
  adoption: Adoption;

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
  applicant1FullName?: string;
  applicant1HasOtherNames?: YesOrNo;
  applicant1AdditionalNames?: string[]; //(string | OtherName)[]
  applicant1EmailAddress: string;
  applicant1PhoneNumber: string;
  applicant1DateOfBirth?: CaseDate;
  applicant1Occupation: string;
  applicant1Nationality: Nationality[];
  applicant1Address1?: string;
  applicant1Address2?: string;
  applicant1Town: string;
  applicant1Country: string;
  applicant1PostCode: string;

  applicant1Address3?: string;
  applicant1AddressTown?: string;
  applicant1AddressCounty?: string;
  applicant1AddressPostcode?: string;
  applicant1AddressCountry?: string;
  applicant1AgreeToReceiveEmails?: Checkbox;
  applicant1ConfirmReceipt: YesOrNo;
  applicant2AgreeToReceiveEmails?: Checkbox;
  applicant2ConfirmReceipt: YesOrNo;
  connections: JurisdictionConnections[];
  applicant1FullNameOnCertificate?: string;
  applicant2FullNameOnCertificate?: string;
  applicant1AddressPrivate: YesOrNo;

  applicant2FirstNames?: string;
  applicant2LastNames?: string;
  applicant2AdditionalName?: string;
  applicant2HasOtherNames?: YesOrNo;
  applicant2AdditionalNames?: string[]; //(string | OtherName)[]
  applicant2DateOfBirth?: CaseDate;
  applicant2Occupation: string;
  applicant2EmailAddress: string;
  applicant2PhoneNumber: string;
  applicant2Nationality: Nationality[];
  applicant2Address1?: string;
  applicant2Address2?: string;
  applicant2Town: string;
  applicant2Country: string;
  applicant2PostCode: string;

  childrenFirstName: string;
  childrenLastName: string;
  childrenDateOfBirth: CaseDate;
  childrenNationality: Nationality[];
  childrenFirstNameAfterAdoption: string;
  childrenLastNameAfterAdoption: string;
  childrenSexAtBirth: Gender;
  placementOrderNumber: string;
  placementOrderCourt: string;
  placementOrderDate: CaseDate;
  addAnotherPlacementOrder: YesOrNo;

  applicant2MiddleNames?: string;
  applicant2AddressPrivate: YesOrNo;
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
