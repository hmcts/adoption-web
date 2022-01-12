import { CaseWithId, FieldPrefix } from '../../app/case/case';
import {
  ApplyingWith,
  ContactDetails,
  DivorceOrDissolution,
  Gender,
  Nationality,
  State,
  YesOrNo,
} from '../../app/case/definition';

import {
  getAdoptionCertificateDetailsStatus,
  getChildrenBirthCertificateStatus,
  getChildrenPlacementOrderStatus,
  getContactDetailsStatus,
  getPersonalDetailsStatus,
  isApplyingWithComplete,
  // isApplyingWithComplete,
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
        expected: 'NOT_STARTED',
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
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          applicant1FirstNames: 'MOCK_FIRST_NAME',
          applicant1LastNames: 'MOCK_LAST_NAME',
          applicant1HasOtherNames: YesOrNo.YES,
          applicant1AdditionalNames: ['MOCK_ADDITIONAL_NAME'],
          applicant1DateOfBirth: { day: '1', month: '1', year: '2021' },
          applicant1Nationality: [Nationality.OTHER],
          applicant1AdditionalNationalities: ['MOCK_COUNTRY'],
          applicant1Occupation: 'MOCK_OCCUPATION',
        },
        userType: 'applicant1',
        expected: 'COMPLETED',
      },
    ])('should return correct status %o', async ({ data, userType, expected }) => {
      expect(getPersonalDetailsStatus({ ...userCase, ...data }, <'applicant1' | 'applicant2'>userType)).toBe(expected);
    });
  });

  describe('getContactDetailsStatus', () => {
    test.each([
      { data: { applicant1Address1: 'MOCK_ADDRESS_1' }, userType: 'applicant1', expected: 'NOT_STARTED' },
      {
        data: { applicant1Address1: 'MOCK_ADDRESS_1', applicant1AddressTown: ' MOCK_TOWN' },
        userType: 'applicant1',
        expected: 'NOT_STARTED',
      },
      {
        data: {
          applicant1Address1: 'MOCK_ADDRESS_1',
          applicant1AddressTown: ' MOCK_TOWN',
          applicant1AddressPostcode: 'MOCK_POSTCODE',
        },
        userType: 'applicant1',
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          applicant1Address1: 'MOCK_ADDRESS_1',
          applicant1AddressTown: ' MOCK_TOWN',
          applicant1AddressPostcode: 'MOCK_POSTCODE',
          applicant1ContactDetails: undefined,
        },
        userType: 'applicant1',
        expected: 'IN_PROGRESS',
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
        expected: 'COMPLETED',
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
        expected: 'COMPLETED',
      },
      {
        data: {
          applicant2AddressSameAsApplicant1: YesOrNo.YES,
          applicant2ContactDetails: [ContactDetails.PHONE],
          applicant2PhoneNumber: 'MOCK_PHONE',
        },
        userType: 'applicant2',
        expected: 'COMPLETED',
      },
      {
        data: {
          applicant2AddressSameAsApplicant1: YesOrNo.NO,
          applicant2ContactDetails: [ContactDetails.PHONE],
          applicant2PhoneNumber: 'MOCK_PHONE',
        },
        userType: 'applicant2',
        expected: 'IN_PROGRESS',
      },
    ])('should return correct status %o', async ({ data, userType, expected }) => {
      expect(getContactDetailsStatus({ ...userCase, ...data }, <FieldPrefix>userType)).toBe(expected);
    });
  });

  describe('getChildrenPlacementOrderStatus', () => {
    test.each([
      { data: { addAnotherPlacementOrder: undefined, placementOrders: undefined }, expected: 'NOT_STARTED' },
      { data: { addAnotherPlacementOrder: YesOrNo.YES, placementOrders: undefined }, expected: 'IN_PROGRESS' },
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
        expected: 'IN_PROGRESS',
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
        expected: 'COMPLETED',
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
        expected: 'IN_PROGRESS',
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
        expected: 'IN_PROGRESS',
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
        expected: 'NOT_STARTED',
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
        expected: 'IN_PROGRESS',
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
        expected: 'COMPLETED',
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
        expected: 'IN_PROGRESS',
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
        expected: 'COMPLETED',
      },
    ])('should return correct status %o', async ({ data, expected }) => {
      expect(getChildrenBirthCertificateStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getAdoptionCertificateDetailsStatus', () => {
    test.each([
      {
        data: { childrenFirstNameAfterAdoption: undefined, childrenLastNameAfterAdoption: undefined },
        expected: 'NOT_STARTED',
      },
      {
        data: { childrenFirstNameAfterAdoption: 'MOCK_FIRST_NAME', childrenLastNameAfterAdoption: undefined },
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          childrenFirstNameAfterAdoption: 'MOCK_FIRST_NAME',
          childrenLastNameAfterAdoption: 'MOCK_LAST_NAME',
        },
        expected: 'COMPLETED',
      },
    ])('should return correct status %o', async ({ data, expected }) => {
      expect(getAdoptionCertificateDetailsStatus({ ...userCase, ...data })).toBe(expected);
    });
  });
});
