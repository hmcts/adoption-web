import { CaseWithId, FieldPrefix } from '../../app/case/case';
import { DivorceOrDissolution, Gender, State, YesOrNo } from '../../app/case/definition';

import {
  getAdoptionCertificateDetailsStatus,
  getBirthFatherDetailsStatus,
  getChildrenBirthCertificateStatus,
  getChildrenPlacementOrderStatus,
  getContactDetailsStatus,
  getPersonalDetailsStatus,
  isApplyingWithComplete,
} from './utils';
const userCase: CaseWithId = {
  id: '123',
  state: State.Draft,
  divorceOrDissolution: DivorceOrDissolution.DIVORCE,
  applicant1ConfirmReceipt: YesOrNo.NO,
  applicant2ConfirmReceipt: YesOrNo.NO,
  connections: [],
  applicant1AddressPrivate: YesOrNo.NO,
  applicant2AddressPrivate: YesOrNo.NO,
  documentsGenerated: [],
  payments: [],
  applicationFeeOrderSummary: { PaymentReference: '', Fees: [], PaymentTotal: '0' },
  applicant2Confirmation: YesOrNo.NO,
  applicant2Explanation: YesOrNo.NO,
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
      userCase.applyingWith = 'alone';
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
          applicant1Nationality: ['British'],
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
          applicant1AdditionalNames: ['MOCK_ADDITIONAL_NAME'],
          applicant1DateOfBirth: { day: '1', month: '1', year: '2021' },
          applicant1Nationality: ['Other'],
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
          applicant1ContactDetails: ['email'],
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
          applicant1ContactDetails: ['phone'],
          applicant1PhoneNumber: 'MOCK_PHONE',
        },
        userType: 'applicant1',
        expected: COMPLETED,
      },
      {
        data: {
          applicant2AddressSameAsApplicant1: YesOrNo.YES,
          applicant2ContactDetails: ['phone'],
          applicant2PhoneNumber: 'MOCK_PHONE',
        },
        userType: 'applicant2',
        expected: COMPLETED,
      },
      {
        data: {
          applicant2AddressSameAsApplicant1: YesOrNo.NO,
          applicant2ContactDetails: ['phone'],
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
          childrenNationality: ['British'],
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
          childrenNationality: ['Other'],
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
          childrenNationality: ['Other'],
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
        data: { birthFathersNameOnCertificate: 'No' },
        expected: COMPLETED,
      },
      {
        data: { birthFathersNameOnCertificate: 'Yes', birthFatherFirstNames: 'Harry' },
        expected: IN_PROGRESS,
      },
      {
        data: { birthFathersNameOnCertificate: 'Yes', birthFatherFirstNames: 'Harry', birthFatherLastNames: 'Cornell' },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFathersNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'Yes',
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFathersNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'No',
        },
        expected: COMPLETED,
      },
      {
        data: {
          birthFathersNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'NotSure',
          birthFatherUnsureAliveReason: 'Disappeared',
        },
        expected: COMPLETED,
      },
      {
        data: {
          birthFathersNameOnCertificate: 'Yes',
          birthFatherFirstNames: 'Harry',
          birthFatherLastNames: 'Cornell',
          birthFatherStillAlive: 'Yes',
        },
        expected: IN_PROGRESS,
      },
      {
        data: {
          birthFathersNameOnCertificate: 'Yes',
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
          birthFathersNameOnCertificate: 'Yes',
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
          birthFathersNameOnCertificate: 'Yes',
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
          birthFathersNameOnCertificate: 'Yes',
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
});
