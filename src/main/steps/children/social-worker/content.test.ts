/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { FormContent, FormFields } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const CY = 'cy';
const EN = 'en';

const enContent = {
  section: 'Your adoption agency or local authority details',
  title: "Details about the child's social worker",
  line1: 'You can get these details from your adoption agency or local authority.',
  socialWorkerName: "Social worker's name",
  socialWorkerPhoneNumber: "Social worker's phone number",
  socialWorkerEmail: "Social worker's email address",
  socialWorkerTeamEmail: "Social worker's team email address (if known)",
  errors: {
    socialWorkerName: {
      required: 'Enter a name',
    },
    socialWorkerPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    socialWorkerEmail: {
      required: 'Enter an email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
    socialWorkerTeamEmail: {
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
  },
};

const cyContent = {
  section: 'Your adoption agency or local authority details (in Welsh)',
  title: "Details about the child's social worker (in Welsh)",
  line1: 'You can get these details from your adoption agency or local authority. (in Welsh)',
  socialWorkerName: "Social worker's name (in Welsh)",
  socialWorkerPhoneNumber: "Social worker's phone number (in Welsh)",
  socialWorkerEmail: "Social worker's email address (in Welsh)",
  socialWorkerTeamEmail: "Social worker's team email address (if known) (in Welsh)",
  errors: {
    socialWorkerName: {
      required: 'Enter a name (in Welsh)',
    },
    socialWorkerPhoneNumber: {
      required: 'Enter a UK telephone number (in Welsh)',
      invalid: 'Enter a UK telephone number (in Welsh)',
    },
    socialWorkerEmail: {
      required: 'Enter an email address (in Welsh)',
      invalid: 'Enter an email address in the correct format, like name@example.com (in Welsh)',
    },
    socialWorkerTeamEmail: {
      invalid: 'Enter an email address in the correct format, like name@example.com (in Welsh)',
    },
  },
};

const langAssertions = (language, content) => {
  const generatedContent = generateContent({ language, userCase: {} } as CommonContent);
  const {
    section,
    title,
    line1,
    socialWorkerName,
    socialWorkerPhoneNumber,
    socialWorkerEmail,
    socialWorkerTeamEmail,
    errors,
  } = content;

  expect(generatedContent.section).toEqual(section);
  expect(generatedContent.title).toEqual(title);
  expect(generatedContent.line1).toEqual(line1);
  expect(generatedContent.socialWorkerName).toEqual(socialWorkerName);
  expect(generatedContent.socialWorkerPhoneNumber).toEqual(socialWorkerPhoneNumber);
  expect(generatedContent.socialWorkerEmail).toEqual(socialWorkerEmail);
  expect(generatedContent.socialWorkerTeamEmail).toEqual(socialWorkerTeamEmail);
  expect(generatedContent.errors).toEqual(errors);
};

const commonContent = { language: EN } as CommonContent;

describe('social worker content', () => {
  it('should return the correct content for language = en', () => {
    langAssertions(EN, enContent);
  });

  it('should return the correct content for language = cy', () => {
    langAssertions(CY, cyContent);
  });

  it('should have an socialWorkerName text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const socialWorkerName = fields.socialWorkerName;

    expect(socialWorkerName.type).toBe('text');
    expect((socialWorkerName.label as Function)(generateContent(commonContent))).toBe(enContent.socialWorkerName);

    (socialWorkerName.validator as Function)('MockName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockName');
  });

  it('should have an socialWorkerPhoneNumber text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const socialWorkerPhoneNumber = fields.socialWorkerPhoneNumber;

    expect(socialWorkerPhoneNumber.type).toBe('text');
    expect((socialWorkerPhoneNumber.label as Function)(generateContent(commonContent))).toBe(
      enContent.socialWorkerPhoneNumber
    );

    (socialWorkerPhoneNumber.validator as Function)('MockPhoneNumber');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockPhoneNumber');
  });

  it('should have an socialWorkerEmail text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const socialWorkerEmail = fields.socialWorkerEmail;

    expect(socialWorkerEmail.type).toBe('text');
    expect((socialWorkerEmail.label as Function)(generateContent(commonContent))).toBe(enContent.socialWorkerEmail);

    (socialWorkerEmail.validator as Function)('MockEmail');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockEmail');
  });

  it('should have an socialWorkerTeamEmail text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const socialWorkerTeamEmail = fields.socialWorkerTeamEmail;

    expect(socialWorkerTeamEmail.type).toBe('text');
    expect((socialWorkerTeamEmail.label as Function)(generateContent(commonContent))).toBe(
      enContent.socialWorkerTeamEmail
    );

    (socialWorkerTeamEmail.validator as Function)('MockEmail');
    expect(isEmailValid).toHaveBeenCalledWith('MockEmail');
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
