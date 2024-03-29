import { CaseWithId } from '../../../main/app/case/case';
import {
  ApplyingWith,
  Gender,
  LanguagePreference,
  Nationality,
  ResponsibilityReasons,
  YesNoNotsure,
  YesOrNo,
} from '../../../main/app/case/definition';

export default {
  applyingWith: ApplyingWith.ALONE,
  dateChildMovedIn: { day: 12, month: 10, year: '2020' },
  localAuthorityName: 'laname',
  localAuthorityContactName: 'contact name1',
  localAuthorityPhoneNumber: '01234567890',
  localAuthorityContactEmail: 'agency1@email.co.uk',
  adopAgencyOrLaName: 'agency1',
  adopAgencyOrLaContactName: 'contact name1',
  adopAgencyOrLaPhoneNumber: '01234567890',
  adopAgencyAddressLine1: 'address',
  adopAgencyTown: 'town',
  adopAgencyPostcode: 'aa14aa',
  adopAgencyOrLaContactEmail: 'agency1@email.co.uk',
  childSocialWorkerName: 'MOCK_SOCIAL_WORKER_NAME',
  childSocialWorkerPhoneNumber: '01234567892',
  childSocialWorkerEmail: 'socialworker@gov.uk',
  childLocalAuthority: 'MOCK_CHILD_LOCAL_AUTHORITY',
  childLocalAuthorityEmail: 'socialworker@gov.uk',
  applicantSocialWorkerName: 'MOCK_SOCIAL_WORKER_NAME',
  applicantSocialWorkerPhoneNumber: '01234567892',
  applicantSocialWorkerEmail: 'socialworker@gov.uk',
  applicantLocalAuthority: 'MOCK_CHILD_LOCAL_AUTHORITY',
  applicantLocalAuthorityEmail: 'socialworker@gov.uk',
  hasAnotherAdopAgencyOrLA: YesOrNo.YES,
  applicant1FirstNames: 'MOCK_APPLICANT1_FIRST_NAMES',
  applicant1LastNames: 'MOCK_APPLICANT1_LAST_NAMES',
  applicant1HasOtherNames: YesOrNo.YES,
  applicant1AdditionalNames: [{ firstNames: 'MOCK_ADDITIONAL_FIRST_NAMES', lastNames: 'MOCK_ADDITIONAL_LAST_NAMES' }],
  applicant1EmailAddress: 'applicant1@email.com',
  applicant1PhoneNumber: '01234567893',
  applicant1ContactDetailsConsent: YesOrNo.YES,
  applicant1DateOfBirth: { day: '1', month: '4', year: '1990' },
  applicant1Occupation: 'MOCK_OCCUPATION',
  applicant1Address1: 'MOCK_ADDRESS_LINE_1',
  applicant1AddressTown: 'MOCK_ADDRESS_TOWN',
  applicant1AddressCounty: 'MOCK_ADDRESS_COUNTY',
  applicant1AddressPostcode: 'MOCK_ADDRESS_POSTCODE',
  applicant1LanguagePreference: LanguagePreference.ENGLISH,
  applicant1HasReasonableAdjustment: YesOrNo.YES,
  applicant1ReasonableAdjustmentDetails: 'MOCK_REASONABLE_ADJUSTMENT_DETAILS',

  applicant2FirstNames: 'MOCK_APPLICANT1_FIRST_NAMES',
  applicant2LastNames: 'MOCK_APPLICANT1_LAST_NAMES',
  applicant2HasOtherNames: YesOrNo.NO,
  applicant2EmailAddress: 'applicant2@email.com',
  applicant2PhoneNumber: '01234567894',
  applicant2ContactDetailsConsent: YesOrNo.YES,
  applicant2DateOfBirth: { day: '3', month: '6', year: '1992' },
  applicant2Occupation: 'MOCK_OCCUPATION',
  applicant2Address1: 'MOCK_ADDRESS_LINE_1',
  applicant2AddressTown: 'MOCK_ADDRESS_TOWN',
  applicant2AddressCounty: 'MOCK_ADDRESS_COUNTY',
  applicant2AddressPostcode: 'MOCK_ADDRESS_POSTCODE',
  applicant2LanguagePreference: LanguagePreference.ENGLISH,
  applicant2HasReasonableAdjustment: YesOrNo.NO,

  childrenFirstName: 'CHILDREN_FIRST_NAMES',
  childrenLastName: 'CHILDREN_LAST_NAMES',
  childrenDateOfBirth: { day: 9, month: 8, year: 2020 },
  childrenSexAtBirth: Gender.MALE,
  childrenNationality: [Nationality.BRITHISH, Nationality.OTHER],
  childrenAdditionalNationalities: [{ id: 'MOCK_ID', country: 'MOCK_COUNTRY' }],
  childrenFirstNameAfterAdoption: 'MOCK_FIRST_NAME_AFTER_ADOPTION',
  childrenLastNameAfterAdoption: 'MOCK_LAST_NAME_AFTER_ADOPTION',
  placementOrders: [
    {
      placementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
      placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
      placementOrderCourt: 'MOCK_PLACEMENT_ORDER_COURT',
      placementOrderDate: { day: 12, month: 11, year: 2020 },
    },
    {
      placementOrderId: 'MOCK_PLACEMENT_ORDER_ID2',
      placementOrderType: 'MOCK_PLACEMENT_ORDER_TYPE2',
      placementOrderNumber: 'MOCK_PLACEMENT_ORDER_NUMBER2',
      placementOrderCourt: 'MOCK_PLACEMENT_ORDER_COURT2',
      placementOrderDate: { day: 10, month: 11, year: 2020 },
    },
  ],
  addAnotherPlacementOrder: YesOrNo.NO,

  birthMotherFirstNames: 'BIRTH_MOTHER_FIRST_NAMES',
  birthMotherLastNames: 'BIRTH_MOTHER_LAST_NAMES',
  birthMotherStillAlive: YesNoNotsure.YES,
  birthMotherNationality: [Nationality.BRITHISH, Nationality.OTHER],
  birthMotherAdditionalNationalities: [{ id: 'MOCK_ID', country: 'MOCK_COUNTRY' }],
  birthMotherOccupation: 'MOCK_OCCUPATION',
  birthMotherAddressKnown: YesOrNo.YES,
  birthMotherAddress1: 'MOCK_ADDRESS_LINE1',
  birthMotherAddress2: 'MOCK_ADDRESS_LINE2',
  birthMotherAddress3: 'MOCK_ADDRESS_LINE3',
  birthMotherAddressTown: 'MOCK_ADDRESS_TOWN',
  birthMotherAddressCounty: 'MOCK_ADDRESS_COUNTY',
  birthMotherAddressPostcode: 'MOCK_ADDRESS_POSTCODE',
  birthMotherAddressCountry: 'MOCK_ADDRESS_COUNTRY',
  birthMotherLastAddressDate: { day: 1, month: 4, year: 2022 },
  birthMotherServedWith: YesOrNo.YES,

  birthFatherNameOnCertificate: YesOrNo.YES,
  birthFatherFirstNames: 'BIRTH_FATHER_FIRST_NAMES',
  birthFatherLastNames: 'BIRTH_FATHER_LAST_NAMES',
  birthFatherStillAlive: YesNoNotsure.YES,
  birthFatherResponsibility: YesNoNotsure.YES,
  birthFatherResponsibilityReason: [ResponsibilityReasons.BIRTH_CERTIFICATE],
  birthFatherNationality: [Nationality.BRITHISH],
  birthFatherOccupation: 'MOCK_OCCUPATION',
  birthFatherAddressKnown: YesOrNo.YES,
  birthFatherAddress1: 'MOCK_ADDRESS_LINE1',
  birthFatherAddressTown: 'MOCK_ADDRESS_TOWN',
  birthFatherAddressCounty: 'MOCK_ADDRESS_COUNTY',
  birthFatherAddressPostcode: 'MOCK_ADDRESS_POSTCODE',
  birthFatherLastAddressDate: { day: 1, month: 4, year: 2022 },
  birthFatherServedWith: YesOrNo.YES,

  otherParentFirstNames: 'MOCK_OTHER_PARENT_FIRST_NAME',
  otherParentLastNames: 'MOCK_OTHER_PARENT_FIRST_NAME',
  otherParentExists: YesOrNo.YES,
  otherParentResponsibilityReason: [ResponsibilityReasons.BIRTH_CERTIFICATE],
  otherParentOtherResponsibilityReason: ' ',
  otherParentAddress1: 'MOCK_ADDRESS_1',
  otherParentAddressTown: 'MOCK_ADDRESS_TOWN',
  otherParentAddressCounty: 'MOCK_ADDRESS_COUNTY',
  otherParentAddressPostcode: 'MOCK_ADDRESS_POSTCODE',
  otherParentAddressCountry: 'MOCK_ADDRESS_COUNTRY',
  otherParentAddressKnown: YesOrNo.YES,
  otherParentLastAddressDate: { day: 1, month: 4, year: 2022 },
  otherParentServedWith: YesOrNo.YES,

  hasSiblings: YesNoNotsure.YES,
  siblings: [
    {
      siblingId: 'MOCK_SIBLING_ID',
      siblingRelation: 'MOCK_SIBLING_RELATION',
      siblingPoType: 'MOCK_PLACEMENT_ORDER_TYPE',
      siblingPoNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
    },
  ],
  placementOrderCourt: 'MOCK_PLACEMENT_ORDER_COURT',
  findFamilyCourt: YesOrNo.NO,
  familyCourtName: 'MOCK_FAMILY_COURT',
  applicant1UploadedFiles: [{ id: 'MOCK_DOCUMENT_ID', name: 'MOCK_DOCUMENT_FILE_NAME' }],
  applicant1DocumentsUploaded: [{ id: 'MOCK_DOCUMENT_ID', value: { documentFileName: 'MOCK_DOCUMENT_FILE_NAME' } }],
  hyphenatedCaseRef: '1234-5678-9012-3456',
  laUploadedFiles: [{ id: 'MOCK_DOCUMENT_ID', name: 'MOCK_DOCUMENT_FILE_NAME' }],
  laDocumentsUploaded: [{ id: 'MOCK_DOCUMENT_ID', value: { documentFileName: 'MOCK_DOCUMENT_FILE_NAME' } }],
} as unknown as CaseWithId;
