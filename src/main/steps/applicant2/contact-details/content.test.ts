const mockIsFieldFilledIn = jest.fn();
const mockAtLeastOneFieldIsChecked = jest.fn();
const mockIsEmailValid = jest.fn();
const mockIsPhoneNoValid = jest.fn();

jest.mock('../../../app/form/validation', () => ({
  isFieldFilledIn: mockIsFieldFilledIn,
  atLeastOneFieldIsChecked: mockAtLeastOneFieldIsChecked,
  isEmailValid: mockIsEmailValid,
  isPhoneNoValid: mockIsPhoneNoValid,
}));

import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('contact-details content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;

  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toEqual('Second applicant');
    expect(generatedContent.label).toEqual('What are your contact details?');
    expect(generatedContent.hint).toEqual(
      'This is so we can contact you with updates or questions about your application.'
    );
    expect(generatedContent.emailAddress).toEqual('Email address');
    expect(generatedContent.phoneNumber).toEqual('UK phone number (for phone calls)');

    const errors = generatedContent.errors as any;
    expect(errors.applicant2ContactDetails.required).toEqual('Enter your telephone number or email address');
    expect(errors.applicant2EmailAddress.required).toEqual(
      'Enter an email address in the correct format, like name@example.com'
    );
    expect(errors.applicant2EmailAddress.invalid).toEqual(
      'Enter an email address in the correct format, like name@example.com'
    );
    expect(errors.applicant2PhoneNumber.required).toEqual('Enter a UK telephone number');
    expect(errors.applicant2PhoneNumber.invalid).toEqual('Enter a UK telephone number');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual('Second applicant (in welsh)');
    expect(generatedContent.label).toEqual('What are your contact details? (in welsh)');
    expect(generatedContent.hint).toEqual(
      'This is so we can contact you with updates or questions about your application. (in welsh)'
    );
    expect(generatedContent.emailAddress).toEqual('Email address (in welsh)');
    expect(generatedContent.phoneNumber).toEqual('UK phone number (for phone calls) (in welsh)');

    const errors = generatedContent.errors as any;
    expect(errors.applicant2ContactDetails.required).toEqual('Enter your telephone number or email address (in welsh)');
    expect(errors.applicant2EmailAddress.required).toEqual(
      'Enter an email address in the correct format, like name@example.com (in welsh)'
    );
    expect(errors.applicant2EmailAddress.invalid).toEqual(
      'Enter an email address in the correct format, like name@example.com (in welsh)'
    );
    expect(errors.applicant2PhoneNumber.required).toEqual('Enter a UK telephone number (in welsh)');
    expect(errors.applicant2PhoneNumber.invalid).toEqual('Enter a UK telephone number (in welsh)');
  });

  test('should contain applicant2ContactDetails field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;

    const applicant2ContactDetailsField = fields.applicant2ContactDetails as FormOptions;
    expect(applicant2ContactDetailsField.type).toBe('checkboxes');
    expect((applicant2ContactDetailsField.label as Function)(generatedContent)).toBe('What are your contact details?');
    expect(applicant2ContactDetailsField.labelSize).toBe('l');
    expect((applicant2ContactDetailsField.section as Function)(generatedContent)).toBe('Second applicant');
    expect(((applicant2ContactDetailsField as FormInput).hint as Function)(generatedContent)).toBe(
      'This is so we can contact you with updates or questions about your application.'
    );

    expect(applicant2ContactDetailsField.values[0].name).toBe('applicant2ContactDetails');
    expect((applicant2ContactDetailsField.values[0].label as Function)(generatedContent)).toBe('Email address');
    expect(applicant2ContactDetailsField.values[0].value).toBe('email');

    expect(applicant2ContactDetailsField.values[1].name).toBe('applicant2ContactDetails');
    expect((applicant2ContactDetailsField.values[1].label as Function)(generatedContent)).toBe(
      'UK phone number (for phone calls)'
    );
    expect(applicant2ContactDetailsField.values[1].value).toBe('phone');

    expect(applicant2ContactDetailsField.validator).toBe(mockAtLeastOneFieldIsChecked);
  });

  test('should contain applicant2EmailAddress as subField of applicant2ContactDetails', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;

    const applicant2ContactDetailsField = fields.applicant2ContactDetails as FormOptions;
    const applicant2EmailAddressField = applicant2ContactDetailsField.values[0].subFields!.applicant2EmailAddress;

    expect(applicant2EmailAddressField.type).toBe('text');
    expect(applicant2EmailAddressField.classes).toBe('govuk-input--width-20');
    expect(applicant2EmailAddressField.label).toBe('');
    expect((applicant2EmailAddressField as FormOptions).labelSize).toBe(null);

    expect((applicant2EmailAddressField.validator as Function)('someone@example.com')).toBe(undefined);
  });

  test('should contain applicant2PhoneNumber as subField of applicant2ContactDetails', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;

    const applicant2ContactDetailsField = fields.applicant2ContactDetails as FormOptions;
    const applicant2PhoneNumberField = applicant2ContactDetailsField.values[1].subFields!.applicant2PhoneNumber;

    expect(applicant2PhoneNumberField.type).toBe('text');
    expect(applicant2PhoneNumberField.classes).toBe('govuk-input--width-20');
    expect(applicant2PhoneNumberField.label).toBe('');
    expect((applicant2PhoneNumberField as FormOptions).labelSize).toBe(null);

    expect((applicant2PhoneNumberField.validator as Function)('someone@example.com')).toBe(undefined);
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
