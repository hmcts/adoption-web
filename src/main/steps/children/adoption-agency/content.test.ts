/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { FormContent, FormFields } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const CY = 'cy';
const EN = 'en';

const enContent = {
  section: 'Your adoption agency or local authority details',
  title: 'Adoption agency or local authority details',
  adopAgencyName: 'Name of adoption agency or local authority',
  adopAgencyPhone: 'Phone number',
  adopAgencyContactName: 'Name of your contact',
  adopAgencyContactEmail: 'Email address of your contact',
  errors: {
    adopAgencyOrLaName: {
      required: 'Enter a name',
    },
    adopAgencyOrLaPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    adopAgencyOrLaContactName: {
      required: 'Enter a name',
    },
    adopAgencyOrLaContactEmail: {
      required: 'Enter an email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
  },
};

const cyContent = {
  section: 'Your adoption agency or local authority details (in Welsh)',
  title: 'Adoption agency or local authority details (in Welsh)',
  adopAgencyName: 'Name of adoption agency or local authority (in Welsh)',
  adopAgencyPhone: 'Phone number (in Welsh)',
  adopAgencyContactName: 'Name of your contact (in Welsh)',
  adopAgencyContactEmail: 'Email address of your contact (in Welsh)',
  errors: {
    adopAgencyOrLaName: {
      required: 'Enter a name (in Welsh)',
    },
    adopAgencyOrLaPhoneNumber: {
      required: 'Enter a UK telephone number (in Welsh)',
      invalid: 'Enter a UK telephone number (in Welsh)',
    },
    adopAgencyOrLaContactName: {
      required: 'Enter a name (in Welsh)',
    },
    adopAgencyOrLaContactEmail: {
      required: 'Enter an email address (in Welsh)',
      invalid: 'Enter an email address in the correct format, like name@example.com (in Welsh)',
    },
  },
};

const langAssertions = (language, content) => {
  const generatedContent = generateContent({ language, userCase: {} } as CommonContent);
  const { section, title, adopAgencyName, adopAgencyPhone, adopAgencyContactName, adopAgencyContactEmail, errors } =
    content;

  expect(generatedContent.section).toEqual(section);
  expect(generatedContent.title).toEqual(title);
  expect(generatedContent.adopAgencyName).toEqual(adopAgencyName);
  expect(generatedContent.adopAgencyPhone).toEqual(adopAgencyPhone);
  expect(generatedContent.adopAgencyContactName).toEqual(adopAgencyContactName);
  expect(generatedContent.adopAgencyContactEmail).toEqual(adopAgencyContactEmail);
  expect(generatedContent.errors).toEqual(errors);
};

const commonContent = { language: EN } as CommonContent;

describe('occupation content', () => {
  it('should return the correct content for language = en', () => {
    langAssertions(EN, enContent);
  });

  it('should return the correct content for language = cy', () => {
    langAssertions(CY, cyContent);
  });

  it('should have an adopAgencyOrLaName text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const adopAgencyOrLaName = fields.adopAgencyOrLaName;

    expect(adopAgencyOrLaName.type).toBe('text');
    expect((adopAgencyOrLaName.label as Function)(generateContent(commonContent))).toBe(enContent.adopAgencyName);

    (adopAgencyOrLaName.validator as Function)('MockAgencyName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyName');
  });

  it('should have an adopAgencyOrLaPhoneNumber text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const adopAgencyOrLaPhoneNumber = fields.adopAgencyOrLaPhoneNumber;

    expect(adopAgencyOrLaPhoneNumber.type).toBe('text');
    expect((adopAgencyOrLaPhoneNumber.label as Function)(generateContent(commonContent))).toBe(
      enContent.adopAgencyPhone
    );

    (adopAgencyOrLaPhoneNumber.validator as Function)('MockAgencyPhoneNumber');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyPhoneNumber');
  });

  it('should have an adopAgencyOrLaContactName text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const adopAgencyOrLaContactName = fields.adopAgencyOrLaContactName;

    expect(adopAgencyOrLaContactName.type).toBe('text');
    expect((adopAgencyOrLaContactName.label as Function)(generateContent(commonContent))).toBe(
      enContent.adopAgencyContactName
    );

    (adopAgencyOrLaContactName.validator as Function)('MockAgencyContactName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyContactName');
  });

  it('should have an adopAgencyOrLaContactEmail text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const adopAgencyOrLaContactEmail = fields.adopAgencyOrLaContactEmail;

    expect(adopAgencyOrLaContactEmail.type).toBe('text');
    expect((adopAgencyOrLaContactEmail.label as Function)(generateContent(commonContent))).toBe(
      enContent.adopAgencyContactEmail
    );

    (adopAgencyOrLaContactEmail.validator as Function)('MockAgencyContactEmail');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyContactEmail');
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: EN }))).toBe('Save as draft');
  });
});
