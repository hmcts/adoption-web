import mockUserCase from '../../../test/unit/utils/mockUserCase';
import { CaseWithId, Checkbox, FieldPrefix } from '../../app/case/case';
import {
  ApplyingWith,
  DocumentType,
  Gender,
  Nationality,
  PaymentStatus,
  State,
  YesNoNotsure,
  YesOrNo,
} from '../../app/case/definition';

import {
  findFamilyCourtStatus,
  getAdoptionAgencyDetailStatus,
  getAdoptionCertificateDetailsStatus,
  getApplicationStatus,
  getApplyingWithStatus,
  getBirthFatherDetailsStatus,
  getBirthMotherDetailsStatus,
  getChildrenBirthCertificateStatus,
  getChildrenPlacementOrderStatus,
  getContactDetailsStatus,
  getDateChildMovedInStatus,
  getOtherParentStatus,
  getPersonalDetailsStatus,
  getReviewPaySubmitUrl,
  getSiblingStatus,
  getUploadDocumentStatus,
  statementOfTruthAndPaymentStatus,
} from './utils';
const userCase: CaseWithId = {
  id: '123',
  state: State.Draft,
  connections: [],
  documentsGenerated: [],
  payments: [],
  applicationFeeOrderSummary: { PaymentReference: '', Fees: [], PaymentTotal: '0' },
};

const NOT_STARTED = 'NOT_STARTED';
const IN_PROGRESS = 'IN_PROGRESS';
const COMPLETED = 'COMPLETED';

describe('utils', () => {
  describe('getApplyingWithStatus', () => {
    test.each([
      { data: { ...mockUserCase, applyingWith: undefined }, expected: 'NOT_STARTED' },
      { data: { ...mockUserCase, applyingWith: ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER }, expected: 'COMPLETED' },
      { data: { ...mockUserCase, applyingWith: ApplyingWith.WITH_SOME_ONE_ELSE }, expected: 'IN_PROGRESS' },
      {
        data: {
          ...mockUserCase,
          applyingWith: ApplyingWith.WITH_SOME_ONE_ELSE,
          otherApplicantRelation: 'MOCK_RELATION',
        },
        expected: 'COMPLETED',
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getApplyingWithStatus(data)).toBe(expected);
    });
  });

  describe('getAdoptionAgencyDetailStatus', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          localAuthorityName: undefined,
          localAuthorityContactName: undefined,
          localAuthorityPhoneNumber: undefined,
          localAuthorityContactEmail: undefined,
          adopAgencyOrLaName: undefined,
          adopAgencyOrLaContactName: undefined,
          adopAgencyOrLaPhoneNumber: undefined,
          adopAgencyAddressLine1: undefined,
          adopAgencyTown: undefined,
          adopAgencyPostcode: undefined,
          adopAgencyOrLaContactEmail: undefined,
          childLocalAuthority: undefined,
          hasAnotherAdopAgencyOrLA: undefined,
          socialWorkerName: undefined,
          socialWorkerPhoneNumber: undefined,
          socialWorkerEmail: undefined,
        },
        expected: 'NOT_STARTED',
      },
      {
        data: mockUserCase,
        expected: 'COMPLETED',
      },
      {
        data: { ...mockUserCase, hasAnotherAdopAgencyOrLA: YesOrNo.NO },
        expected: 'COMPLETED',
      },
      {
        data: {
          ...mockUserCase,
          hasAnotherAdopAgencyOrLA: undefined,
          localAuthorityName: 'name',
        },
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          ...mockUserCase,
          hasAnotherAdopAgencyOrLA: undefined,
          localAuthorityName: 'name',
          localAuthorityPhoneNumber: '01234567890',
        },
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          ...mockUserCase,
          localAuthorityName: 'a',
          localAuthorityContactName: 'a',
          localAuthorityPhoneNumber: '9876543210',
          localAuthorityContactEmail: 'abc@hmcts.net',
          adopAgencyOrLaName: 'a',
          adopAgencyOrLaContactName: 'a',
          adopAgencyOrLaPhoneNumber: '9876543210',
          adopAgencyAddressLine1: 'a',
          adopAgencyTown: 'a',
          adopAgencyPostcode: 'ab00ab',
          adopAgencyOrLaContactEmail: 'abc@hmcts.net',
          childLocalAuthority: 'a',
          hasAnotherAdopAgencyOrLA: YesOrNo.YES,
          socialWorkerName: '',
          socialWorkerPhoneNumber: '9876543210',
          socialWorkerEmail: 'abc@hmcts.net',
        },
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          ...mockUserCase,
          localAuthorityName: 'a',
          localAuthorityContactName: 'a',
          localAuthorityPhoneNumber: '9876543210',
          localAuthorityContactEmail: 'abc@hmcts.net',
          adopAgencyOrLaName: 'a',
          adopAgencyOrLaContactName: 'a',
          adopAgencyOrLaPhoneNumber: '9876543210',
          adopAgencyAddressLine1: 'a',
          adopAgencyTown: 'a',
          adopAgencyPostcode: 'ab00ab',
          adopAgencyOrLaContactEmail: 'abc@hmcts.net',
          childLocalAuthority: 'a',
          hasAnotherAdopAgencyOrLA: YesOrNo.YES,
          socialWorkerName: 'a',
          socialWorkerPhoneNumber: '9876543210',
          socialWorkerEmail: 'abc@hmcts.net',
        },
        expected: 'COMPLETED',
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getAdoptionAgencyDetailStatus(data)).toBe(expected);
    });
  });

  describe('getPersonalDetailsStatus', () => {
    test.each([
      {
        data: {
          applicant1FirstNames: undefined,
          applicant1LastNames: undefined,
          applicant1HasOtherNames: undefined,
          applicant1AdditionalNames: undefined,
          applicant1DateOfBirth: undefined,
          applicant1Occupation: undefined,
        },
        userType: 'applicant1',
        expected: NOT_STARTED,
      },
      {
        data: {
          applicant1FirstNames: 'MOCK_FIRST_NAME',
          applicant1LastNames: 'MOCK_LAST_NAME',
          applicant1HasOtherNames: YesOrNo.NO,
          applicant1AdditionalNames: undefined,
          applicant1DateOfBirth: { day: '1', month: '1', year: '2021' },
          applicant1Occupation: undefined,
        },
        userType: 'applicant1',
        expected: IN_PROGRESS,
      },
      {
        data: {
          applicant1FirstNames: 'MOCK_FIRST_NAME',
          applicant1LastNames: 'MOCK_LAST_NAME',
          applicant1HasOtherNames: YesOrNo.YES,
          applicant1AdditionalNames: [
            { firstNames: 'MOCK_ADDITIONAL_FIRST_NAME', lastNames: 'MOCK_ADDITIONAL_FIRST_NAME' },
          ],
          applicant1DateOfBirth: { day: '1', month: '1', year: '2021' },
          applicant1Occupation: 'MOCK_OCCUPATION',
        },
        userType: 'applicant1',
        expected: COMPLETED,
      },
    ])('should return correct status %#', async ({ data, userType, expected }) => {
      expect(getPersonalDetailsStatus({ ...userCase, ...data }, <'applicant1' | 'applicant2'>userType)).toBe(expected);
    });
  });

  describe('getContactDetailsStatus', () => {
    test.each([
      { data: { applicant1Address1: 'MOCK_ADDRESS_1' }, userType: 'applicant1', expected: NOT_STARTED },
      {
        data: { applicant1Address1: 'MOCK_ADDRESS_1', applicant1AddressTown: ' MOCK_TOWN' },
        userType: 'applicant1',
        expected: NOT_STARTED,
      },
      {
        data: {
          applicant1Address1: 'MOCK_ADDRESS_1',
          applicant1AddressTown: ' MOCK_TOWN',
          applicant1AddressPostcode: 'MOCK_POSTCODE',
        },
        userType: 'applicant1',
        expected: IN_PROGRESS,
      },
      {
        data: {
          applicant1Address1: 'MOCK_ADDRESS_1',
          applicant1AddressTown: ' MOCK_TOWN',
          applicant1AddressPostcode: 'MOCK_POSTCODE',
          applicant1ContactDetailsConsent: undefined,
        },
        userType: 'applicant1',
        expected: IN_PROGRESS,
      },
      {
        data: {
          applicant1Address1: 'MOCK_ADDRESS_1',
          applicant1AddressTown: ' MOCK_TOWN',
          applicant1AddressPostcode: 'MOCK_POSTCODE',
          applicant1ContactDetailsConsent: YesOrNo.YES,
          applicant1EmailAddress: 'MOCK_EMAIL',
          applicant1PhoneNumber: 'MOCK_PHONE',
        },
        userType: 'applicant1',
        expected: COMPLETED,
      },
      {
        data: {
          applicant1Address1: 'MOCK_ADDRESS_1',
          applicant1AddressTown: ' MOCK_TOWN',
          applicant1AddressPostcode: 'MOCK_POSTCODE',
          applicant1ContactDetailsConsent: YesOrNo.YES,
          applicant1PhoneNumber: 'MOCK_PHONE',
          applicant1EmailAddress: 'MOCK_EMAIL',
        },
        userType: 'applicant1',
        expected: COMPLETED,
      },
      {
        data: {
          applicant2AddressSameAsApplicant1: YesOrNo.YES,
          applicant2ContactDetailsConsent: YesOrNo.YES,
          applicant2PhoneNumber: 'MOCK_PHONE',
          applicant2EmailAddress: 'MOCK_EMAIL',
        },
        userType: 'applicant2',
        expected: COMPLETED,
      },
      {
        data: {
          applicant2AddressSameAsApplicant1: YesOrNo.NO,
          applicant2ContactDetailsConsent: YesOrNo.YES,
          applicant2PhoneNumber: 'MOCK_PHONE',
          applicant2EmailAddress: 'MOCK_EMAIL',
        },
        userType: 'applicant2',
        expected: IN_PROGRESS,
      },
    ])('should return correct status %#', async ({ data, userType, expected }) => {
      expect(getContactDetailsStatus({ ...userCase, ...data }, <FieldPrefix>userType)).toBe(expected);
    });
  });

  describe('getChildrenPlacementOrderStatus', () => {
    test.each([
      { data: { addAnotherPlacementOrder: undefined, placementOrders: undefined }, expected: NOT_STARTED },
      { data: { addAnotherPlacementOrder: YesOrNo.YES, placementOrders: undefined }, expected: IN_PROGRESS },
      {
        data: {
          addAnotherPlacementOrder: YesOrNo.YES,
          placementOrders: [
            {
              placementOrderId: '',
              placementOrderNumber: '',
              placementOrderCourt: '',
              placementOrderDate: { day: '', month: '', year: '' },
            },
          ],
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          addAnotherPlacementOrder: YesOrNo.NO,
          placementOrders: [
            {
              placementOrderId: 'MOCK_ID',
              placementOrderNumber: 'MOCK_NUMBER',
              placementOrderCourt: 'MOCK_COURT',
              placementOrderDate: { day: '1', month: '1', year: '2001' },
            },
          ],
        },
        expected: COMPLETED,
      },
      {
        data: {
          addAnotherPlacementOrder: YesOrNo.NO,
          placementOrders: [
            {
              placementOrderId: 'MOCK_ID',
              placementOrderNumber: '',
              placementOrderCourt: '',
              placementOrderDate: { day: '1', month: '1', year: '2001' },
            },
            {
              placementOrderId: 'MOCK_ID2',
              placementOrderType: '',
              placementOrderNumber: 'MOCK_NUMBER2',
              placementOrderCourt: 'MOCK_COURT2',
              placementOrderDate: { day: '2', month: '2', year: '2002' },
            },
          ],
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          addAnotherPlacementOrder: YesOrNo.NO,
          placementOrders: [
            {
              placementOrderId: 'MOCK_ID',
              placementOrderNumber: 'MOCK_NUMBER',
              placementOrderCourt: 'MOCK_COURT',
              placementOrderDate: { day: '1', month: '1', year: '2001' },
            },
            {
              placementOrderId: 'MOCK_ID2',
              placementOrderType: '',
              placementOrderNumber: 'MOCK_NUMBER2',
              placementOrderCourt: 'MOCK_COURT2',
              placementOrderDate: { day: '2', month: '2', year: '2002' },
            },
          ],
        },
        expected: IN_PROGRESS,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getChildrenPlacementOrderStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getChildrenBirthCertificateStatus', () => {
    test.each([
      {
        data: {
          childrenFirstName: undefined,
          childrenLastName: undefined,
          childrenDateOfBirth: { day: '', month: '', year: '' },
          childrenSexAtBirth: undefined,
          childrenNationality: undefined,
          childrenAdditionalNationalities: undefined,
        },
        expected: NOT_STARTED,
      },
      {
        data: {
          childrenFirstName: 'MOCK_FIRST_NAME',
          childrenLastName: 'MOCK_LAST_NAME',
          childrenDateOfBirth: { day: '1', month: '1', year: '2021' },
          childrenSexAtBirth: Gender.OTHER,
          childrenNationality: undefined,
          childrenAdditionalNationalities: undefined,
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          childrenFirstName: 'MOCK_FIRST_NAME',
          childrenLastName: 'MOCK_LAST_NAME',
          childrenDateOfBirth: { day: '1', month: '1', year: '2021' },
          childrenSexAtBirth: Gender.MALE,
          childrenNationality: [Nationality.BRITHISH],
          childrenAdditionalNationalities: undefined,
        },
        expected: COMPLETED,
      },
      {
        data: {
          childrenFirstName: 'MOCK_FIRST_NAME',
          childrenLastName: 'MOCK_LAST_NAME',
          childrenDateOfBirth: { day: '1', month: '1', year: '2021' },
          childrenSexAtBirth: Gender.FEMALE,
          childrenNationality: [Nationality.OTHER],
          childrenAdditionalNationalities: undefined,
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          childrenFirstName: 'MOCK_FIRST_NAME',
          childrenLastName: 'MOCK_LAST_NAME',
          childrenDateOfBirth: { day: '1', month: '1', year: '2021' },
          childrenSexAtBirth: Gender.OTHER,
          childrenOtherSexAtBirth: 'MOCK_OTHER_GENDER',
          childrenNationality: [Nationality.OTHER],
          childrenAdditionalNationalities: ['MOCK_COUNTRY'],
        },
        expected: COMPLETED,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getChildrenBirthCertificateStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getAdoptionCertificateDetailsStatus', () => {
    test.each([
      {
        data: { childrenFirstNameAfterAdoption: undefined, childrenLastNameAfterAdoption: undefined },
        expected: NOT_STARTED,
      },
      {
        data: { childrenFirstNameAfterAdoption: 'MOCK_FIRST_NAME', childrenLastNameAfterAdoption: undefined },
        expected: IN_PROGRESS,
      },
      {
        data: { childrenFirstNameAfterAdoption: 'MOCK_FIRST_NAME', childrenLastNameAfterAdoption: 'MOCK_LAST_NAME' },
        expected: COMPLETED,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getAdoptionCertificateDetailsStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getBirthFatherDetailsStatus', () => {
    it.each([
      {
        data: {},
        expected: NOT_STARTED,
      },
      {
        data: { birthFatherNameOnCertificate: 'No' },
        expected: COMPLETED,
      },
      {
        data: { birthFatherNameOnCertificate: 'Yes', birthFatherFirstNames: 'Harry' },
        expected: IN_PROGRESS,
      },
      {
        data: { birthFatherNameOnCertificate: 'Yes', birthFatherFirstNames: 'Harry', birthFatherLastNames: 'Cornell' },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'Yes',
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'No',
        },
        expected: COMPLETED,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'NotSure',
          birthFatherUnsureAliveReason: 'Disappeared',
        },
        expected: COMPLETED,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'Yes',
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'Yes',
          birthFatherNationality: ['British', 'Irish', 'Other'],
          birthFatherAdditionalNationalities: ['Japan'],
          birthFatherOccupation: 'Primary school teacher',
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'Yes',
          birthFatherNationality: ['British', 'Irish', 'Other'],
          birthFatherAdditionalNationalities: ['Japan'],
          birthFatherOccupation: 'Primary school teacher',
          birthFatherAddressKnown: YesOrNo.NO,
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'Yes',
          birthFatherNationality: ['British', 'Irish', 'Other'],
          birthFatherAdditionalNationalities: ['Japan'],
          birthFatherOccupation: 'Primary school teacher',
          birthFatherAddressKnown: YesOrNo.YES,
          birthFatherAddress1: '33 Example Road',
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFatherNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'Yes',
          birthFatherNationality: ['British', 'Irish', 'Other'],
          birthFatherAdditionalNationalities: ['Japan'],
          birthFatherOccupation: 'Primary school teacher',
          birthFatherAddressKnown: YesOrNo.YES,
          birthFatherAddress1: '33 Example Road',
          birthFatherAddressCountry: 'United Kingdom',
        },
        expected: COMPLETED,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getBirthFatherDetailsStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getOtherParentStatus', () => {
    test.each([
      { data: {}, userType: 'otherParent', expected: 'NOT_STARTED' },
      { data: { otherParentExists: YesOrNo.NO }, userType: 'otherParent', expected: 'COMPLETED' },
      {
        data: {
          otherParentExists: YesOrNo.YES,
          otherParentFirstNames: 'MOCKNAME',
          otherParentLastNames: 'MOCKNAME',
          otherParentAddressKnown: YesOrNo.YES,
          otherParentAddress1: 'MOCK_ADDRESS_1',
          otherParentAddress2: 'MOCK_ADDRESS_2',
          otherParentAddressTown: ' MOCK_TOWN',
          otherParentAddressPostcode: 'MOCK_POSTCODE',
        },
        userType: 'otherParent',
        expected: 'COMPLETED',
      },
      {
        data: {
          otherParentExists: YesOrNo.YES,
          otherParentFirstNames: 'MOCKNAME',
          otherParentLastNames: 'MOCKNAME',
        },
        userType: 'otherParent',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          otherParentExists: YesOrNo.YES,
          otherParentFirstNames: 'MOCKNAME',
          otherParentLastNames: 'MOCKNAME',
          otherParentAddressKnown: YesOrNo.NO,
          otherParentAddressNotKnownReason: 'MOCK_REASON',
        },
        userType: 'otherParent',
        expected: 'COMPLETED',
      },
      {
        data: {
          otherParentExists: YesOrNo.YES,
          otherParentFirstNames: 'MOCKNAME',
          otherParentLastNames: 'MOCKNAME',
          otherParentAddressKnown: YesOrNo.YES,
          otherParentAddress1: 'MOCK_ADDRESS_1',
        },
        userType: 'otherParent',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          otherParentExists: YesOrNo.YES,
          otherParentFirstNames: 'MOCKNAME',
          otherParentAddressKnown: YesOrNo.NO,
          otherParentAddressNotKnownReason: 'MOCK_REASON',
        },
        userType: 'otherParent',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          otherParentExists: YesOrNo.YES,
          otherParentFirstNames: 'MOCKNAME',
          otherParentLastNames: 'MOCKNAME',
          otherParentAddressKnown: YesOrNo.YES,
          otherParentAddress1: 'MOCK_ADDRESS_1',
          otherParentAddressTown: ' MOCK_TOWN',
          otherParentAddressPostcode: 'MOCK_POSTCODE',
        },
        userType: 'otherParent',
        expected: 'COMPLETED',
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getOtherParentStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getBirthMotherDetailsStatus', () => {
    test.each([
      { data: {}, userType: 'birthMother', expected: 'NOT_STARTED' },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.NO,
        },
        userType: 'birthMother',
        expected: 'COMPLETED',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.NO,
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.NOT_SURE,
          birthMotherNotAliveReason: 'MOCK_REASON',
        },
        userType: 'birthMother',
        expected: 'COMPLETED',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.NOT_SURE,
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.YES,
          birthMotherNationality: ['British'],
          birthMotherOccupation: 'MOCK_OCCUPATION',
          birthMotherAddressKnown: YesOrNo.YES,
          birthMotherAddress1: 'MOCK_ADDRESS_1',
          birthMotherAddress2: 'MOCK_ADDRESS_2',
          birthMotherAddressTown: ' MOCK_TOWN',
          birthMotherAddressPostcode: 'MOCK_POSTCODE',
        },
        userType: 'birthMother',
        expected: 'COMPLETED',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.YES,
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.YES,
          birthMotherNationality: ['British'],
          birthMotherOccupation: 'MOCK_OCCUPATION',
          birthMotherAdditionalNationalities: ['MOCK_COUNTRY'],
          birthMotherAddressKnown: YesOrNo.NO,
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.YES,
          birthMotherNationality: ['British'],
          birthMotherOccupation: 'MOCK_OCCUPATION',
          birthMotherAddressKnown: YesOrNo.YES,
          birthMotherAddress1: 'MOCK_ADDRESS_1',
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.YES,
          birthMotherNationality: ['British'],
          birthMotherAddressKnown: YesOrNo.NO,
          birthMotherAddressNotKnownReason: 'MOCK_REASON',
          birthMotherOccupation: 'MOCK_OCCUPATION',
        },
        userType: 'birthMother',
        expected: 'COMPLETED',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.YES,
          birthMotherNationality: ['Other'],
          birthMotherAddressKnown: YesOrNo.NO,
          birthMotherAddressNotKnownReason: 'MOCK_REASON',
          birthMotherOccupation: 'MOCK_OCCUPATION',
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherStillAlive: YesNoNotsure.YES,
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherNationality: ['British'],
          birthMotherOccupation: 'MOCK_OCCUPATION',
          birthMotherAddressKnown: YesOrNo.YES,
          birthMotherAddress1: 'MOCK_ADDRESS_1',
          birthMotherAddressTown: 'MOCK_TOWN',
          birthMotherAddressPostcode: 'MOCK_POSTCODE',
          birthMotherCountry: 'MOCK_COUNTRY',
        },
        userType: 'birthMother',
        expected: 'COMPLETED',
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getBirthMotherDetailsStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getSiblingPlacementOrderStatus', () => {
    test.each([
      { data: {}, expected: 'NOT_STARTED' },
      {
        data: {
          hasSiblings: YesNoNotsure.NO,
        },
        expected: COMPLETED,
      },
      {
        data: {
          hasSiblings: YesNoNotsure.NOT_SURE,
        },
        expected: COMPLETED,
      },
      {
        data: {
          hasSiblings: YesNoNotsure.YES,
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          hasSiblings: YesNoNotsure.YES,
          siblings: [
            {
              siblingId: 'MOCK_SIBLING_ID',
              siblingRelation: 'MOCK_SIBLING_RELATION',
              siblingPoType: 'MOCK_PLACEMENT_ORDER_TYPE',
            },
          ],
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          hasSiblings: YesNoNotsure.YES,
          siblings: [
            {
              siblingId: 'MOCK_SIBLING_ID',
              siblingRelation: 'MOCK_SIBLING_RELATION',
              siblingPoType: 'MOCK_PLACEMENT_ORDER_TYPE',
              siblingPoNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
            },
          ],
        },
        expected: COMPLETED,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getSiblingStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getDateChildMovedInStatus', () => {
    test.each([
      { data: {}, expected: 'NOT_STARTED' },
      {
        data: {
          dateChildMovedIn: { day: '1', month: '1', year: '2020' },
        },
        expected: COMPLETED,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getDateChildMovedInStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('findFamilyCourtStatus', () => {
    test.each([
      { data: mockUserCase, expected: 'COMPLETED' },
      {
        data: { ...mockUserCase, placementOrderCourt: 'MOCK_COURT', findFamilyCourt: YesOrNo.YES },
        expected: 'COMPLETED',
      },
      {
        data: {
          ...mockUserCase,
          placementOrderCourt: 'MOCK_COURT',
          findFamilyCourt: YesOrNo.NO,
          familyCourtName: undefined,
        },
        expected: 'IN_PROGRESS',
      },
      { data: { ...mockUserCase, findFamilyCourt: YesOrNo.NO, familyCourtName: undefined }, expected: 'IN_PROGRESS' },
      {
        data: { ...mockUserCase, placementOrderCourt: undefined, findFamilyCourt: undefined },
        expected: 'NOT_STARTED',
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(findFamilyCourtStatus(data)).toBe(expected);
    });
  });

  describe('getUploadDocumentStatus', () => {
    test.each([
      { data: { ...mockUserCase }, expected: 'COMPLETED' },
      {
        data: { ...mockUserCase, applicant1CannotUpload: Checkbox.Checked },
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          ...mockUserCase,
          applicant1CannotUpload: Checkbox.Checked,
          applicant1CannotUploadDocuments: [DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE],
        },
        expected: 'COMPLETED',
      },
      {
        data: {
          ...mockUserCase,
          applicant1UploadedFiles: undefined,
          applicant1CannotUpload: Checkbox.Checked,
          applicant1CannotUploadDocuments: [DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE],
        },
        expected: 'COMPLETED',
      },
      {
        data: {
          ...mockUserCase,
          applicant1UploadedFiles: undefined,
          applicant1CannotUpload: undefined,
        },
        expected: 'NOT_STARTED',
      },
      {
        data: {
          ...mockUserCase,
          applyingWith: undefined,
          applicant1UploadedFiles: undefined,
          applicant1CannotUpload: undefined,
        },
        expected: 'CAN_NOT_START_YET',
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getUploadDocumentStatus(data)).toBe(expected);
    });
  });

  describe('getReviewPaySubmitUrl', () => {
    test.each([
      { data: mockUserCase, expected: '/review-pay-submit/equality' },
      {
        data: {
          ...mockUserCase,
          payments: [
            {
              id: 'MOCK_ID',
              value: {
                created: 'MOCK_DATE',
                updated: 'MOCK_DATE',
                feeCode: 'MOCK_FEE_CODE',
                amount: 100,
                status: PaymentStatus.IN_PROGRESS,
                channel: 'MOCK_CHANNEL',
                reference: 'MOCK_REF',
                transactionId: 'MOCK_TRANSACTION_ID',
              },
            },
          ],
        },
        expected: '/review-pay-submit/payment/payment-callback',
      },
      {
        data: {
          ...mockUserCase,
          payments: [
            {
              id: 'MOCK_ID',
              value: {
                created: 'MOCK_DATE',
                updated: 'MOCK_DATE',
                feeCode: 'MOCK_FEE_CODE',
                amount: 100,
                status: PaymentStatus.SUCCESS,
                channel: 'MOCK_CHANNEL',
                reference: 'MOCK_REF',
                transactionId: 'MOCK_TRANSACTION_ID',
              },
            },
          ],
        },
        expected: '/application-submitted',
      },
    ])('should return correct url %#', async ({ data, expected }) => {
      expect(getReviewPaySubmitUrl(data)).toBe(expected);
    });
  });

  describe('getApplicationStatus', () => {
    test.each([
      { data: mockUserCase, expected: 'NOT_STARTED' },
      { data: { ...mockUserCase, applyingWith: undefined }, expected: 'CAN_NOT_START_YET' },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getApplicationStatus(data)).toBe(expected);
    });
  });
  describe('statementOfTruthAndPaymentStatus', () => {
    test.each([
      { userCase: { applyingWith: ApplyingWith.ALONE, state: State.Draft }, expected: 'NOT_STARTED' },
      {
        userCase: {
          applyingWith: ApplyingWith.ALONE,
          applicant1IBelieveApplicationIsTrue: 'checked',
          applicant1SotFullName: 'abc def',
          state: State.Draft,
        },
        expected: NOT_STARTED,
      },
      {
        userCase: {
          applyingWith: ApplyingWith.WITH_SOME_ONE_ELSE,
          applicant1IBelieveApplicationIsTrue: 'checked',
          applicant1SotFullName: 'abc def',
          applicant2IBelieveApplicationIsTrue: 'checked',
          applicant2SotFullName: 'abc def',
          state: State.Draft,
        },
        expected: NOT_STARTED,
      },
      {
        userCase: {
          applyingWith: ApplyingWith.WITH_SOME_ONE_ELSE,
          state: State.Draft,
        },
        expected: NOT_STARTED,
      },
    ])('should return correct status %o', async ({ expected }) => {
      expect(statementOfTruthAndPaymentStatus({ ...userCase })).toBe(expected);
    });
  });
});
