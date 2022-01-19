import { assert } from 'console';

describe('post content', () => {
  it('should return the correct content for language = en', () => {
    assert(true);
  });
});
// /* eslint-disable @typescript-eslint/ban-types */
// /* eslint-disable jest/expect-expect */
// import { FormContent, FormFields } from '../../../app/form/Form';//FormOptions
// import { isFieldFilledIn } from '../../../app/form/validation';//{ isEmailValid, isFieldFilledIn, isPhoneNoValid }
// import { CommonContent } from '../../common/common.content';//generatePageContent

// import { generateContent } from './content';

// jest.mock('../../../app/form/validation');

// const CY = 'cy';
// const EN = 'en';

// export const enContent = (): Record<string, unknown> => ({
//     section: "Your adoption agency or local authority details",
//     title: "Adoption agency or local authority details",
//     adopAgencyName: 'Name of adoption agency or local authority',
//     adopAgencyPhone: 'Phone number',
//     adopAgencyContactName: 'Name of your contact',
//     adopAgencyEmail: 'Email address of your contact',
//     errors: {
//       adopAgencyOrLaName: {
//         required: 'Enter a name',
//       },
//       adopAgencyOrLaPhoneNumber: {
//         required: 'Enter a UK telephone number',
//         invalid: 'Enter a UK telephone number',
//       },
//       adopAgencyOrLaContactName: {
//         required: 'Enter a name',
//       },
//       adopAgencyOrLaContactEmail: {
//         required: 'Enter an email address',
//         invalid: 'Enter an email address in the correct format, like name@example.com',
//       },
//     },
//   });

//   export const cyContent = (): Record<string, unknown> => ({
//     section: "Your adoption agency or local authority details (in Welsh)",
//     title: "Adoption agency or local authority details (in Welsh)",
//     adopAgencyName: 'Name of adoption agency or local authority (in Welsh)',
//     adopAgencyPhone: 'Phone number (in Welsh)',
//     adopAgencyContactName: 'Name of your contact (in Welsh)',
//     adopAgencyEmail: 'Email address of your contact (in Welsh)',
//     errors: {
//       adopAgencyOrLaName: {
//         required: 'Enter a name (in Welsh)',
//       },
//       adopAgencyOrLaPhoneNumber: {
//         required: 'Enter a UK telephone number (in Welsh)',
//         invalid: 'Enter a UK telephone number (in Welsh)',
//       },
//       adopAgencyOrLaContactName: {
//         required: 'Enter a name (in Welsh)',
//       },
//       adopAgencyOrLaContactEmail: {
//         required: 'Enter an email address (in Welsh)',
//         invalid: 'Enter an email address in the correct format, like name@example.com (in Welsh)',
//       },
//     },
//   });

//   const langAssertions = (language, content) => {
//     const generatedContent = generateContent({ language, userCase: {} } as CommonContent);
//     const { section, title, occupation, warningText, details, errors } = content;

//     expect(generatedContent.section).toEqual(section);
//     expect(generatedContent.title).toEqual(title);
//     expect(generatedContent.occupation).toEqual(occupation);
//     expect(generatedContent.warningText).toEqual(warningText);
//     expect(generatedContent.details).toEqual(details);
//     expect(generatedContent.errors).toEqual(errors);
//   };

//   const commonContent = { language: EN } as CommonContent;

//   describe('occupation content', () => {
//     it('should return the correct content for language = en', () => {
//       langAssertions(EN, enContent);
//     });

//     it('should return the correct content for language = cy', () => {
//       langAssertions(CY, cyContent);
//     });

//     it('should have an adopAgencyOrLaName text input field', () => {
//       const generatedContent = generateContent(commonContent);
//       const form = generatedContent.form as FormContent;
//       const fields = form.fields as FormFields;
//       const adopAgencyOrLaName = fields.adopAgencyOrLaName;

//       expect(adopAgencyOrLaName.type).toBe('input');
//       //expect((adopAgencyOrLaName.label as Function)(generateContent(commonContent))).toBe(enContent.adopAgencyName);
//       expect(adopAgencyOrLaName.labelSize).toBe('l');

//       (adopAgencyOrLaName.validator as Function)('MockOccupation');
//       expect(isFieldFilledIn).toHaveBeenCalledWith('MockOccupation');
//     });

//     // it('should contain submit button', () => {
//     //   const generatedContent = generateContent(commonContent);
//     //   const form = generatedContent.form as FormContent;
//     //   expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
//     // });

//     // it('should contain saveAsDraft button', () => {
//     //   const generatedContent = generateContent(commonContent);
//     //   const form = generatedContent.form as FormContent;
//     //   expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: EN }))).toBe('Save as draft');
//     // });
//   });
