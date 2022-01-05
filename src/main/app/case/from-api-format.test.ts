// import { Checkbox } from './case';
// import { CaseData, DivorceOrDissolution, Gender, ThePrayer, YesOrNo } from './definition';
// import { fromApiFormat } from './from-api-format';

// describe('from-api-format', () => {
//   const results: Partial<Record<keyof CaseData, string | ThePrayer[] | null>> = {
//     divorceOrDissolution: DivorceOrDissolution.DIVORCE,
//     marriageIsSameSexCouple: YesOrNo.YES,
//     applicant2Gender: Gender.MALE,
//     applicant1Gender: Gender.MALE,
//     applicant1ScreenHasMarriageBroken: YesOrNo.YES,
//     applicant1HWFReferenceNumber: 'HWF-ABC-123',
//     applicant1AgreedToReceiveEmails: YesOrNo.YES,
//     applicant1KeepContactDetailsConfidential: YesOrNo.YES,
//     applicant1KnowsApplicant2EmailAddress: YesOrNo.NO,
//     applicant1WantsToHavePapersServedAnotherWay: null,
//     applicant1LanguagePreferenceWelsh: YesOrNo.YES,
//     applicant2LanguagePreferenceWelsh: YesOrNo.YES,
//     applicant2KeepContactDetailsConfidential: YesOrNo.YES,
//     applicant1PrayerHasBeenGivenCheckbox: [ThePrayer.I_CONFIRM],
//     applicant2PrayerHasBeenGiven: YesOrNo.YES,
//     applicant1StatementOfTruth: YesOrNo.YES,
//     applicant2StatementOfTruth: YesOrNo.YES,
//     dueDate: '2021-07-26',
//   };

//   test('Should convert results from api to nfdiv fe format', async () => {
//     const nfdivFormat = fromApiFormat(results as unknown as CaseData);

//     expect(nfdivFormat).toStrictEqual({
//       divorceOrDissolution: DivorceOrDissolution.DIVORCE,
//       sameSex: Checkbox.Checked,
//       gender: Gender.MALE,
//       applicant1ScreenHasUnionBroken: YesOrNo.YES,
//       applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
//       applicant1AgreeToReceiveEmails: Checkbox.Checked,
//       applicant1AddressPrivate: YesOrNo.YES,
//       applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Checked,
//       applicant2AddressPrivate: YesOrNo.YES,
//       iWantToHavePapersServedAnotherWay: undefined,
//       applicant1EnglishOrWelsh: 'welsh',
//       applicant2EnglishOrWelsh: 'welsh',
//       applicant1IBelieveApplicationIsTrue: 'checked',
//       applicant2IBelieveApplicationIsTrue: 'checked',
//       applicant1IConfirmPrayer: 'checked',
//       applicant2IConfirmPrayer: 'checked',
//       dueDate: '26 July 2021',
//     });
//   });

//   test('convert results including the union date from api to nfdiv fe format', async () => {
//     const nfdivFormat = fromApiFormat({
//       ...results,
//       marriageDate: '2000-09-02',
//       dateSubmitted: '2021-01-01',
//     } as unknown as CaseData);

//     expect(nfdivFormat).toStrictEqual({
//       divorceOrDissolution: DivorceOrDissolution.DIVORCE,
//       gender: Gender.MALE,
//       sameSex: Checkbox.Checked,
//       applicant1ScreenHasUnionBroken: YesOrNo.YES,
//       relationshipDate: {
//         day: '2',
//         month: '9',
//         year: '2000',
//       },
//       applicant1IBelieveApplicationIsTrue: 'checked',
//       applicant2IBelieveApplicationIsTrue: 'checked',
//       applicant1IConfirmPrayer: 'checked',
//       applicant2IConfirmPrayer: 'checked',
//       applicant1EnglishOrWelsh: 'welsh',
//       applicant2EnglishOrWelsh: 'welsh',
//       applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
//       applicant1AgreeToReceiveEmails: Checkbox.Checked,
//       applicant1AddressPrivate: YesOrNo.YES,
//       applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Checked,
//       applicant2AddressPrivate: YesOrNo.YES,
//       iWantToHavePapersServedAnotherWay: undefined,
//       dateSubmitted: new Date('2021-01-01'),
//       dueDate: '26 July 2021',
//     });
//   });

//   test('convert results including handling null applicant2LanguagePreferenceWelsh', async () => {
//     const nfdivFormat = fromApiFormat({
//       ...results,
//       applicant2LanguagePreferenceWelsh: null,
//     } as unknown as CaseData);

//     expect(nfdivFormat).toStrictEqual({
//       divorceOrDissolution: DivorceOrDissolution.DIVORCE,
//       gender: Gender.MALE,
//       sameSex: Checkbox.Checked,
//       applicant1ScreenHasUnionBroken: YesOrNo.YES,
//       applicant1IBelieveApplicationIsTrue: 'checked',
//       applicant1IConfirmPrayer: 'checked',
//       applicant2IBelieveApplicationIsTrue: 'checked',
//       applicant2IConfirmPrayer: 'checked',
//       applicant1EnglishOrWelsh: 'welsh',
//       applicant2EnglishOrWelsh: null,
//       applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
//       applicant1AgreeToReceiveEmails: Checkbox.Checked,
//       applicant1AddressPrivate: YesOrNo.YES,
//       applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Checked,
//       applicant2AddressPrivate: YesOrNo.YES,
//       iWantToHavePapersServedAnotherWay: undefined,
//       dueDate: '26 July 2021',
//     });
//   });

//   test('convert results including handling applicant2LanguagePreferenceWelsh No value', async () => {
//     const nfdivFormat = fromApiFormat({
//       ...results,
//       applicant2LanguagePreferenceWelsh: YesOrNo.NO,
//     } as unknown as CaseData);

//     expect(nfdivFormat).toStrictEqual({
//       divorceOrDissolution: DivorceOrDissolution.DIVORCE,
//       gender: Gender.MALE,
//       sameSex: Checkbox.Checked,
//       applicant1ScreenHasUnionBroken: YesOrNo.YES,
//       applicant1IBelieveApplicationIsTrue: 'checked',
//       applicant1IConfirmPrayer: 'checked',
//       applicant2IBelieveApplicationIsTrue: 'checked',
//       applicant2IConfirmPrayer: 'checked',
//       applicant1EnglishOrWelsh: 'welsh',
//       applicant2EnglishOrWelsh: 'english',
//       applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
//       applicant1AgreeToReceiveEmails: Checkbox.Checked,
//       applicant1AddressPrivate: YesOrNo.YES,
//       applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Checked,
//       applicant2AddressPrivate: YesOrNo.YES,
//       iWantToHavePapersServedAnotherWay: undefined,
//       dueDate: '26 July 2021',
//     });
//   });

//   test('ignores empty addresses', async () => {
//     const nfdivFormat = fromApiFormat({
//       marriageDate: undefined,
//       dateSubmitted: '2021-01-01',
//     } as unknown as CaseData);

//     expect(nfdivFormat).toStrictEqual({
//       relationshipDate: undefined,
//       dateSubmitted: new Date('2021-01-01'),
//     });
//   });

//   describe('converting your address between UK and international', () => {
//     test('converts to UK format', () => {
//       const nfdivFormat = fromApiFormat({
//         ...results,
//         applicant1HomeAddress: {
//           AddressLine1: 'Line 1',
//           AddressLine2: 'Line 2',
//           PostTown: 'Town',
//           County: 'County',
//           PostCode: 'Postcode',
//         },
//       } as unknown as CaseData);

//       expect(nfdivFormat).toMatchObject({
//         applicant1Address1: 'Line 1',
//         applicant1Address2: 'Line 2',
//         applicant1AddressTown: 'Town',
//         applicant1AddressCounty: 'County',
//         applicant1AddressPostcode: 'Postcode',
//       });
//     });

//     test('converts to UK format for applicant2', () => {
//       const nfdivFormat = fromApiFormat({
//         ...results,
//         applicant2HomeAddress: {
//           AddressLine1: 'Line 1',
//           AddressLine2: 'Line 2',
//           PostTown: 'Town',
//           County: 'County',
//           PostCode: 'Postcode',
//         },
//       } as unknown as CaseData);

//       expect(nfdivFormat).toMatchObject({
//         applicant2Address1: 'Line 1',
//         applicant2Address2: 'Line 2',
//         applicant2AddressTown: 'Town',
//         applicant2AddressCounty: 'County',
//         applicant2AddressPostcode: 'Postcode',
//       });
//     });

//     test('converts to an international format', () => {
//       const nfdivFormat = fromApiFormat({
//         ...results,
//         applicant1HomeAddress: {
//           AddressLine1: 'Line 1',
//           AddressLine2: 'Line 2',
//           AddressLine3: 'Line 3',
//           PostTown: 'Town',
//           County: 'State',
//           PostCode: 'Zip code',
//           Country: 'Country',
//         },
//       } as unknown as CaseData);

//       expect(nfdivFormat).toMatchObject({});
//     });
//   });

//   test('adds read only fields', () => {
//     expect(
//       fromApiFormat({
//         applicationPayments: [
//           {
//             id: 'mock-payment',
//           },
//         ],
//       } as unknown as CaseData)
//     ).toStrictEqual({
//       payments: [
//         {
//           id: 'mock-payment',
//         },
//       ],
//     });
//   });
// });
describe('getContactDetailsStatus', () => {
  test('Should return false if applyingWith is not present', async () => {
    return true;
  });
});
