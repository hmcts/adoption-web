import { CaseWithId } from '../../app/case/case';
import { DivorceOrDissolution, State, YesOrNo } from '../../app/case/definition';

import { getContactDetailsStatus, isApplyingWithComplete } from './utils';
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
};
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

  describe('getContactDetailsStatus', () => {
    test.each([
      { data: { applicant1Address1: 'MOCK_ADDRESS_1' }, expected: 'NOT_STARTED' },
      { data: { applicant1Address1: 'MOCK_ADDRESS_1', applicant1AddressTown: ' MOCK_TOWN' }, expected: 'NOT_STARTED' },
      {
        data: {
          applicant1Address1: 'MOCK_ADDRESS_1',
          applicant1AddressTown: ' MOCK_TOWN',
          applicant1AddressPostcode: 'MOCK_POSTCODE',
        },
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          applicant1Address1: 'MOCK_ADDRESS_1',
          applicant1AddressTown: ' MOCK_TOWN',
          applicant1AddressPostcode: 'MOCK_POSTCODE',
          applicant1ContactDetails: undefined,
        },
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          applicant1Address1: 'MOCK_ADDRESS_1',
          applicant1AddressTown: ' MOCK_TOWN',
          applicant1AddressPostcode: 'MOCK_POSTCODE',
          applicant1ContactDetails: ['email'],
          applicant1EmailAddress: 'MOCK_EMAIL',
        },
        expected: 'COMPLETED',
      },
      {
        data: {
          applicant1Address1: 'MOCK_ADDRESS_1',
          applicant1AddressTown: ' MOCK_TOWN',
          applicant1AddressPostcode: 'MOCK_POSTCODE',
          applicant1ContactDetails: ['phone'],
          applicant1PhoneNumber: 'MOCK_PHONE',
        },
        expected: 'COMPLETED',
      },
    ])('should return correct status %o', async ({ data, expected }) => {
      expect(getContactDetailsStatus({ ...userCase, ...data })).toBe(expected);
    });
  });
});
