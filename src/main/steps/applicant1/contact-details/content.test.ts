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
import {
  FormContent,
  FormFields,
  FormInput,
  FormOptions,
  LanguageLookup,
  ValidationCheck,
} from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'First applicant',
  title: 'What are your contact details?',
  line1: 'We need both a contact email and telephone number for you.',
  line2:
    'We will email you updates and information about your application to adopt. You will only be contacted by telephone if the social worker or court staff need to contact you quickly.',
  emailAddress: 'Email address',
  phoneNumber: 'UK phone number',
  applicant1ContactDetailsConsent:
    'The court may want to use your email to serve you court orders. Are you happy to be served court orders by email?',
  contactDetailsConsentNo: 'You will be served all court orders by post.',
  errors: {
    applicant1ContactDetailsConsent: {
      required: 'Select whether you are happy to be served court orders by email.',
    },
    applicant1EmailAddress: {
      required: 'Enter your email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
    applicant1PhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a valid UK telephone number',
    },
  },
};

const cyContent = {
  section: 'Ceisydd cyntaf',
  title: 'Beth yw eich manylion cyswllt?',
  line1: 'Mae arnom angen cyfeiriad e-bost cyswllt a rhif ffôn cyswllt ar eich cyfer.',
  line2:
    'Byddwn yn anfon diweddariadau a gwybodaeth am eich cais i fabwysiadu trwy e-bost. Cysylltir â chi dros y ffôn dim ond os yw’r gweithiwr cymdeithasol neu staff y llys eisiau cysylltu â chi ar frys.',
  emailAddress: 'Cyfeiriad e-bost',
  phoneNumber: 'Rhif ffôn yn y DU',
  applicant1ContactDetailsConsent:
    'Efallai bydd y llys eisiau defnyddio eich cyfeiriad e-bost i gyflwyno gorchmynion llys arnoch, A ydych yn hapus i neuchmynion llys gael eu cyflwyno arnoch drwy e-bost?',
  contactDetailsConsentNo: 'Fe gyflwynir yr holl orchmynion llys arnoch drwy’r post.',
  errors: {
    applicant1ContactDetailsConsent: {
      required: 'Dewiswch a ydych yn hapus i gael eich gorchmynion llys drwy e-bost.',
    },
    applicant1EmailAddress: {
      required: 'Nac ydwdwch eich cyfeiriad e-bost',
      invalid: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel name@example.com',
    },
    applicant1PhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn dilys yn y DU',
    },
  },
};

describe('applicant1 > contact-details > content', () => {
  const commonContent = {
    language: 'en',
    userCase: { applyingWith: ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER },
  } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should set correct english title in case of applying alone', () => {
    const aloneCommonContent = { language: 'en', userCase: { applyingWith: ApplyingWith.ALONE } } as CommonContent;
    const generatedContent = generateContent(aloneCommonContent);
    expect(generatedContent.section).toEqual('Applicant');
  });

  test('should return correct welsh content', () => {
    const welshCommonContent = {
      language: 'cy',
      userCase: { applyingWith: ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER },
    } as CommonContent;
    languageAssertions('cy', cyContent, () => generateContent(welshCommonContent));
  });

  test('should set correct welsh title in case of applying alone', () => {
    const aloneCommonContent = { language: 'cy', userCase: { applyingWith: ApplyingWith.ALONE } } as CommonContent;
    const generatedContent = generateContent(aloneCommonContent);
    expect(generatedContent.section).toEqual('Ceisydd');
  });

  test('should contain applicant1ContactDetails field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1ContactDetailsConsentField = fields.applicant1ContactDetailsConsent as FormFields;
    const applicant1EmailAddressField = fields.applicant1EmailAddress as FormFields;
    const applicant1PhoneNumberField = fields.applicant1PhoneNumber as FormFields;

    expect(applicant1ContactDetailsConsentField.type).toBe('radios');
    expect(applicant1ContactDetailsConsentField.classes).toBe('govuk-radios');
    const applicant1ContactDetailsConsentOptions = fields.applicant1ContactDetailsConsent as FormOptions;
    expect(((fields.applicant1ContactDetailsConsent as FormInput).label as LanguageLookup)(generatedContent)).toBe(
      enContent.applicant1ContactDetailsConsent
    );
    expect(((fields.applicant1ContactDetailsConsent as FormInput).section as LanguageLookup)(generatedContent)).toBe(
      enContent.section
    );
    expect(
      (applicant1ContactDetailsConsentOptions.values[0].label as LanguageLookup)({ yes: 'Yes' } as unknown as Record<
        string,
        never
      >)
    ).toBe(YesOrNo.YES);
    expect(
      (applicant1ContactDetailsConsentOptions.values[1].label as LanguageLookup)({ no: 'No' } as unknown as Record<
        string,
        never
      >)
    ).toBe(YesOrNo.NO);
    // eslint-disable-next-line @typescript-eslint/ban-types
    expect((applicant1ContactDetailsConsentOptions.values[1].conditionalText as Function)(generatedContent)).toBe(
      '<p class="govuk-label">You will be served all court orders by post.</p>'
    );
    expect(applicant1ContactDetailsConsentField.validator).toBe(isFieldFilledIn);

    expect(applicant1EmailAddressField.type).toBe('text');
    expect(applicant1EmailAddressField.classes).toBe('govuk-input--width-20');
    expect((applicant1EmailAddressField.label as LanguageLookup)(generatedContent)).toBe(enContent.emailAddress);
    expect(applicant1EmailAddressField.labelSize).toBe(null);
    expect((applicant1EmailAddressField.validator as ValidationCheck)('someone@example.com', {})).toBe(undefined);

    expect(applicant1PhoneNumberField.type).toBe('text');
    expect(applicant1PhoneNumberField.classes).toBe('govuk-input--width-20');
    expect((applicant1PhoneNumberField.label as LanguageLookup)(generatedContent)).toBe(enContent.phoneNumber);
    expect(applicant1PhoneNumberField.labelSize).toBe(null);
    expect((applicant1PhoneNumberField.validator as ValidationCheck)('someone@example.com', {})).toBe(undefined);
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)).toBe(
      'Save and continue'
    );
  });

  test('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect(
      (form.saveAsDraft?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save as draft');
  });
});
