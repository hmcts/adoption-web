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

import { ApplyingWith, YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('contact-details content', () => {
  const commonContent = {
    language: 'en',
    userCase: { applyingWith: ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER },
  } as CommonContent;

  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toEqual('Second applicant');
    expect(generatedContent.title).toEqual('What are your contact details?');
    expect(generatedContent.line1).toEqual('We need both a contact email and telephone number for you.');
    expect(generatedContent.line2).toEqual(
      'We will email you updates and information about your application to adopt. You will only be contacted by telephone if the social worker or court staff need to contact you quickly.'
    );
    expect(generatedContent.emailAddress).toEqual('Email address');
    expect(generatedContent.phoneNumber).toEqual('UK Phone number');

    const errors = generatedContent.errors as any;
    expect(errors.applicant2ContactDetailsConsent.required).toEqual('Please answer the question');
    expect(errors.applicant2EmailAddress.required).toEqual('Enter your email address');
    expect(errors.applicant2EmailAddress.invalid).toEqual(
      'Enter an email address in the correct format, like name@example.com'
    );
    expect(errors.applicant2PhoneNumber.required).toEqual('Enter a UK telephone number');
    expect(errors.applicant2PhoneNumber.invalid).toEqual('Enter a valid UK telephone number');
  });

  test('should return correct welsh content', () => {
    const welshCommonContent = {
      language: 'cy',
      userCase: { applyingWith: ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER },
    } as CommonContent;
    const generatedContent = generateContent(welshCommonContent);
    expect(generatedContent.section).toEqual('Second applicant (in welsh)');
    expect(generatedContent.title).toEqual('What are your contact details? (in welsh)');
    expect(generatedContent.line1).toEqual('We need both a contact email and telephone number for you. (in welsh)');
    expect(generatedContent.line2).toEqual(
      'We will email you updates and information about your application to adopt. You will only be contacted by telephone if the social worker or court staff need to contact you quickly. (in welsh)'
    );
    expect(generatedContent.emailAddress).toEqual('Email address (in welsh)');
    expect(generatedContent.phoneNumber).toEqual('UK Phone number (in welsh)');

    const errors = generatedContent.errors as any;
    expect(errors.applicant2ContactDetailsConsent.required).toEqual('Please answer the question (in welsh)');
    expect(errors.applicant2EmailAddress.required).toEqual('Enter your email address (in welsh)');
    expect(errors.applicant2EmailAddress.invalid).toEqual(
      'Enter an email address in the correct format, like name@example.com (in welsh)'
    );
    expect(errors.applicant2PhoneNumber.required).toEqual('Enter a UK telephone number (in welsh)');
    expect(errors.applicant2PhoneNumber.invalid).toEqual('Enter a valid UK telephone number (in welsh)');
  });

  test('should contain applicant2ContactDetails field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant2ContactDetailsConsentField = fields.applicant2ContactDetailsConsent as FormFields;
    const applicant2EmailAddressField = fields.applicant2EmailAddress as FormFields;
    const applicant2PhoneNumberField = fields.applicant2PhoneNumber as FormFields;

    expect(applicant2ContactDetailsConsentField.type).toBe('radios');
    expect(applicant2ContactDetailsConsentField.classes).toBe('govuk-radios');

    const applicant2ContactDetailsConsentOptions = fields.applicant2ContactDetailsConsent as FormOptions;
    expect(((fields.applicant2ContactDetailsConsent as FormInput).hint as Function)(generatedContent)).toBe(
      'The court may want to use your email to serve you court orders. Are you happy to be served court orders by email?'
    );
    expect((applicant2ContactDetailsConsentOptions.values[0].label as Function)({ yes: 'Yes' })).toBe(YesOrNo.YES);
    expect((applicant2ContactDetailsConsentOptions.values[1].label as Function)({ no: 'No' })).toBe(YesOrNo.NO);
    expect(applicant2ContactDetailsConsentField.validator as Function).toBe(isFieldFilledIn);

    expect(applicant2EmailAddressField.type).toBe('text');
    expect(applicant2EmailAddressField.classes).toBe('govuk-input--width-20');
    expect((applicant2EmailAddressField.label as Function)(generatedContent)).toBe('Email address');
    expect(applicant2EmailAddressField.labelSize).toBe(null);
    expect((applicant2EmailAddressField.validator as Function)('someone@example.com')).toBe(undefined);

    expect(applicant2PhoneNumberField.type).toBe('text');
    expect(applicant2PhoneNumberField.classes).toBe('govuk-input--width-20');
    expect((applicant2PhoneNumberField.label as Function)(generatedContent)).toBe('UK Phone number');
    expect(applicant2PhoneNumberField.labelSize).toBe(null);
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
