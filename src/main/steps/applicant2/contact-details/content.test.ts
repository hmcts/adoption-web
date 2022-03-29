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

import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { ApplyingWith, YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Second applicant',
  title: 'What are your contact details?',
  line1: 'We need both a contact email and telephone number for you.',
  line2:
    'We will email you updates and information about your application to adopt. You will only be contacted by telephone if the social worker or court staff need to contact you quickly.',
  emailAddress: 'Email address',
  phoneNumber: 'UK Phone number',
  applicant2ContactDetailsConsent:
    'The court may want to use your email to serve you court orders. Are you happy to be served court orders by email?',
  errors: {
    applicant2ContactDetailsConsent: {
      required: 'Please answer the question',
    },
    applicant2EmailAddress: {
      required: 'Enter your email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
    applicant2PhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a valid UK telephone number',
    },
  },
};

const cyContent = {
  section: 'Ail geisydd',
  title: 'Beth yw eich manylion cyswllt?',
  line1: 'Mae arnom angen cyfeiriad e-bost cyswllt a rhif ffôn cyswllt ar eich cyfer.',
  line2:
    'Byddwn yn anfon diweddariadau a gwybodaeth am eich cais i fabwysiadu trwy e-bost. Cysylltir â chi dros y ffôn dim ond os yw’r gweithiwr cymdeithasol neu staff y llys eisiau cysylltu â chi ar frys.',
  emailAddress: 'Cyfeiriad e-bost',
  phoneNumber: 'Rhif ffôn yn y DU',
  applicant2ContactDetailsConsent:
    'Efallai bydd y llys eisiau defnyddio eich cyfeiriad e-bost i gyflwyno gorchmynion llys arnoch, A ydych yn hapus i neuchmynion llys gael eu cyflwyno arnoch drwy e-bost?',
  errors: {
    applicant2ContactDetailsConsent: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
    applicant2EmailAddress: {
      required: 'Nac ydwdwch eich cyfeiriad e-bost',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
    },
    applicant2PhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn dilys yn y DU',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant2> contact-details > content', () => {
  const commonContent = {
    language: 'en',
    userCase: { applyingWith: ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER },
  } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    const welshCommonContent = {
      language: 'cy',
      userCase: { applyingWith: ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER },
    } as CommonContent;
    languageAssertions('cy', cyContent, () => generateContent(welshCommonContent));
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
    expect(((fields.applicant2ContactDetailsConsent as FormInput).label as Function)(generatedContent)).toBe(
      enContent.applicant2ContactDetailsConsent
    );
    expect(((fields.applicant2ContactDetailsConsent as FormInput).section as Function)(generatedContent)).toBe(
      enContent.section
    );
    expect((applicant2ContactDetailsConsentOptions.values[0].label as Function)({ yes: 'Yes' })).toBe(YesOrNo.YES);
    expect((applicant2ContactDetailsConsentOptions.values[1].label as Function)({ no: 'No' })).toBe(YesOrNo.NO);
    expect(applicant2ContactDetailsConsentField.validator as Function).toBe(isFieldFilledIn);

    expect(applicant2EmailAddressField.type).toBe('text');
    expect(applicant2EmailAddressField.classes).toBe('govuk-input--width-20');
    expect((applicant2EmailAddressField.label as Function)(generatedContent)).toBe(enContent.emailAddress);
    expect(applicant2EmailAddressField.labelSize).toBe(null);
    expect((applicant2EmailAddressField.validator as Function)('someone@example.com')).toBe(undefined);

    expect(applicant2PhoneNumberField.type).toBe('text');
    expect(applicant2PhoneNumberField.classes).toBe('govuk-input--width-20');
    expect((applicant2PhoneNumberField.label as Function)(generatedContent)).toBe(enContent.phoneNumber);
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
