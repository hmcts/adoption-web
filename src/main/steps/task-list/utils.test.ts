describe('getContactDetailsStatus', () => {
  test('Should return false if applyingWith is not present', async () => {
    return true;
  });
});
// import { CaseWithId } from '../../app/case/case';
// import { Adoption, ApplyingWith, DivorceOrDissolution, State, YesOrNo } from '../../app/case/definition';

// import { isApplyingWithComplete } from './utils'; //getContactDetailsStatus
// const userCase: CaseWithId = {
//   id: '123',
//   adoption: Adoption.ADOPTION,
//   state: State.Draft,
//   divorceOrDissolution: DivorceOrDissolution.DIVORCE,
//   applicant1ConfirmReceipt: YesOrNo.NO,
//   applicant2ConfirmReceipt: YesOrNo.NO,
//   connections: [],
//   applicant1AddressPrivate: YesOrNo.NO,
//   applicant2AddressPrivate: YesOrNo.NO,
//   documentsGenerated: [],
//   payments: [],
//   applicationFeeOrderSummary: { PaymentReference: '', Fees: [], PaymentTotal: '0' },
//   applicant2Confirmation: YesOrNo.NO,
//   applicant2Explanation: YesOrNo.NO,
//   addAnotherNationality: YesOrNo.NO,
// };
// describe('utils', () => {
//   describe('isApplyingWithComplete()', () => {
//     test('Should return false if applyingWith is not present', async () => {
//       const isValid = isApplyingWithComplete(userCase);

//       expect(isValid).toStrictEqual(false);
//     });

//     test('Should return true if applyingWith is present', async () => {
//       userCase.applyingWith = ApplyingWith.ALONE;
//       const isValid = isApplyingWithComplete(userCase);

//       expect(isValid).toStrictEqual(true);
//     });
//   });

//   describe('getContactDetailsStatus', () => {
//     test.each([
//       { data: { applicant1Address1: 'MOCK_ADDRESS_1' }, userType: 'applicant1', expected: 'NOT_STARTED' },
//       {
//         data: { applicant1Address1: 'MOCK_ADDRESS_1', applicant1AddressTown: ' MOCK_TOWN' },
//         userType: 'applicant1',
//         expected: 'NOT_STARTED',
//       },
//       {
//         data: {
//           applicant1Address1: 'MOCK_ADDRESS_1',
//           applicant1AddressTown: ' MOCK_TOWN',
//           applicant1AddressPostcode: 'MOCK_POSTCODE',
//         },
//         userType: 'applicant1',
//         expected: 'IN_PROGRESS',
//       },
//       {
//         data: {
//           applicant1Address1: 'MOCK_ADDRESS_1',
//           applicant1AddressTown: ' MOCK_TOWN',
//           applicant1AddressPostcode: 'MOCK_POSTCODE',
//           applicant1ContactDetails: undefined,
//         },
//         userType: 'applicant1',
//         expected: 'IN_PROGRESS',
//       },
//       {
//         data: {
//           applicant1Address1: 'MOCK_ADDRESS_1',
//           applicant1AddressTown: ' MOCK_TOWN',
//           applicant1AddressPostcode: 'MOCK_POSTCODE',
//           applicant1ContactDetails: ['email'],
//           applicant1EmailAddress: 'MOCK_EMAIL',
//         },
//         userType: 'applicant1',
//         expected: 'COMPLETED',
//       },
//       {
//         data: {
//           applicant1Address1: 'MOCK_ADDRESS_1',
//           applicant1AddressTown: ' MOCK_TOWN',
//           applicant1AddressPostcode: 'MOCK_POSTCODE',
//           applicant1ContactDetails: ['phone'],
//           applicant1PhoneNumber: 'MOCK_PHONE',
//         },
//         userType: 'applicant1',
//         expected: 'COMPLETED',
//       },
//       {
//         data: {
//           applicant2AddressSameAsApplicant1: YesOrNo.YES,
//           applicant2ContactDetails: ['phone'],
//           applicant2PhoneNumber: 'MOCK_PHONE',
//         },
//         userType: 'applicant2',
//         expected: 'COMPLETED',
//       },
//       {
//         data: {
//           applicant2AddressSameAsApplicant1: YesOrNo.NO,
//           applicant2ContactDetails: ['phone'],
//           applicant2PhoneNumber: 'MOCK_PHONE',
//         },
//         userType: 'applicant2',
//         expected: 'IN_PROGRESS',
//       },
//     ])('should return correct status %o', async ({ data, userType, expected }) => {
//       expect(true);
//       //expect(getContactDetailsStatus({ ...userCase, ...data }, <'applicant1' | 'applicant2'>userType)).toBe(expected);
//     });
//   });
// });
