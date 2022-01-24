import { CaseWithId, FieldPrefix } from '../../app/case/case';
import {
  ApplyingWith,
  ContactDetails,
  Gender,
  Nationality,
  State,
  YesNoNotsure,
  YesOrNo,
} from '../../app/case/definition';

import {
  getAdoptionCertificateDetailsStatus,
  getBirthFatherDetailsStatus,
  getBirthMotherDetailsStatus,
  getChildrenBirthCertificateStatus,
  getChildrenPlacementOrderStatus,
  getContactDetailsStatus,
  getOtherParentStatus,
  getPersonalDetailsStatus,
  isApplyingWithComplete,
  // isApplyingWithComplete,
} from './utils';
const userCase: CaseWithId = {
  id: '123',
  state: State.Draft,
  connections: [],
  documentsGenerated: [],
  payments: [],
  applicationFeeOrderSummary: { PaymentReference: '', Fees: [], PaymentTotal: '0' },
  addAnotherNationality: YesOrNo.NO,
};

const NOT_STARTED = 'NOT_STARTED';
const IN_PROGRESS = 'IN_PROGRESS';
const COMPLETED = 'COMPLETED';

describe('utils', () => {
  describe('isApplyingWithComplete()', () => {
    test('Should return false if applyingWith is not present', async () => {
      const isValid = isApplyingWithComplete(userCase);

      expect(isValid).toStrictEqual(false);
    });

    test('Should return true if applyingWith is present', async () => {
      userCase.applyingWith = ApplyingWith.ALONE;
      const isValid = isApplyingWithComplete(userCase);

      expect(isValid).toStrictEqual(true);
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
          applicant1Nationality: undefined,
          applicant1AdditionalNationalities: undefined,
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
          applicant1Nationality: [Nationality.BRITHISH],
          applicant1AdditionalNationalities: undefined,
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
          applicant1Nationality: [Nationality.OTHER],
          applicant1AdditionalNationalities: ['MOCK_COUNTRY'],
          applicant1Occupation: 'MOCK_OCCUPATION',
        },
        userType: 'applicant1',
        expected: COMPLETED,
      },
    ])('should return correct status %o', async ({ data, userType, expected }) => {
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
          applicant1ContactDetails: undefined,
        },
        userType: 'applicant1',
        expected: IN_PROGRESS,
      },
      {
        data: {
          applicant1Address1: 'MOCK_ADDRESS_1',
          applicant1AddressTown: ' MOCK_TOWN',
          applicant1AddressPostcode: 'MOCK_POSTCODE',
          applicant1ContactDetails: [ContactDetails.EMAIL],
          applicant1EmailAddress: 'MOCK_EMAIL',
        },
        userType: 'applicant1',
        expected: COMPLETED,
      },
      {
        data: {
          applicant1Address1: 'MOCK_ADDRESS_1',
          applicant1AddressTown: ' MOCK_TOWN',
          applicant1AddressPostcode: 'MOCK_POSTCODE',
          applicant1ContactDetails: [ContactDetails.PHONE],
          applicant1PhoneNumber: 'MOCK_PHONE',
        },
        userType: 'applicant1',
        expected: COMPLETED,
      },
      {
        data: {
          applicant2AddressSameAsApplicant1: YesOrNo.YES,
          applicant2ContactDetails: [ContactDetails.PHONE],
          applicant2PhoneNumber: 'MOCK_PHONE',
        },
        userType: 'applicant2',
        expected: COMPLETED,
      },
      {
        data: {
          applicant2AddressSameAsApplicant1: YesOrNo.NO,
          applicant2ContactDetails: [ContactDetails.PHONE],
          applicant2PhoneNumber: 'MOCK_PHONE',
        },
        userType: 'applicant2',
        expected: IN_PROGRESS,
      },
    ])('should return correct status %o', async ({ data, userType, expected }) => {
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
    ])('should return correct status %o', async ({ data, expected }) => {
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
          childrenSexAtBirth: undefined,
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
          childrenSexAtBirth: Gender.MALE,
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
          childrenSexAtBirth: Gender.MALE,
          childrenNationality: [Nationality.OTHER],
          childrenAdditionalNationalities: ['MOCK_COUNTRY'],
        },
        expected: COMPLETED,
      },
    ])('should return correct status %o', async ({ data, expected }) => {
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
    ])('should return correct status %o', async ({ data, expected }) => {
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
        expected: COMPLETED,
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
    ])('should return correct status %o', async ({ data, expected }) => {
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
    ])('should return correct status %o', async ({ data, expected }) => {
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
        expected: 'COMPLETED',
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
        },
        userType: 'birthMother',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          birthMotherFirstNames: 'MOCKNAME',
          birthMotherLastNames: 'MOCKNAME',
          birthMotherStillAlive: YesNoNotsure.YES,
          birthMotherNationality: ['Other'],
          birthMotherAddressKnown: YesOrNo.NO,
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
    ])('should return correct status %o', async ({ data, expected }) => {
      expect(getBirthMotherDetailsStatus({ ...userCase, ...data })).toBe(expected);
    });
  });
});
