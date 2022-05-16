import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup, ValidationCheck } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
  section: 'Application details',
  title: "Child's social worker details",
  line1: 'You can get these details from your local authority or adoption agency.',
  socialWorkerName: "Name of child's social worker",
  socialWorkerPhoneNumber: 'Phone number',
  socialWorkerEmail: 'Email address',
  childLocalAuthority: "Child's local authority",
  childLocalAuthorityHint:
    'This is the local authority with parental responsibility for the child. It may be different to your own local authority.',
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
    childLocalAuthority: {
      required: 'Enter a name',
    },
  },
};

const cyContent = {
  section: 'Application details (in welsh)',
  title: "Child's social worker details (in welsh)",
  line1: 'You can get these details from your local authority or adoption agency. (in welsh)',
  socialWorkerName: "Name of child's social worker (in welsh)",
  socialWorkerPhoneNumber: 'Phone number (in welsh)',
  socialWorkerEmail: 'Email address (in welsh)',
  childLocalAuthority: "Child's local authority (in welsh)",
  childLocalAuthorityHint:
    'This is the local authority with parental responsibility for the child. It may be different to your own local authority. (in welsh)',
  errors: {
    socialWorkerName: {
      required: 'Enter a name (in welsh)',
    },
    socialWorkerPhoneNumber: {
      required: 'Enter a UK telephone number (in welsh)',
      invalid: 'Enter a UK telephone number (in welsh)',
    },
    socialWorkerEmail: {
      required: 'Enter an email address (in welsh)',
      invalid: 'Enter an email address in the correct format, like name@example.com (in welsh)',
    },
    childLocalAuthority: {
      required: 'Enter a name (in welsh)',
    },
  },
};

const commonContent = { language: EN } as CommonContent;

describe('children > social-worker > content', () => {
  it('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  it('should have an socialWorkerName text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const socialWorkerName = fields.socialWorkerName;

    expect(socialWorkerName.type).toBe('text');
    expect((socialWorkerName.label as LanguageLookup)(generatedContent)).toBe(enContent.socialWorkerName);

    (socialWorkerName.validator as ValidationCheck)('MockName', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockName', {});
  });

  it('should have an socialWorkerPhoneNumber text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const socialWorkerPhoneNumber = fields.socialWorkerPhoneNumber;

    expect(socialWorkerPhoneNumber.type).toBe('text');
    expect((socialWorkerPhoneNumber.label as LanguageLookup)(generatedContent)).toBe(enContent.socialWorkerPhoneNumber);

    (socialWorkerPhoneNumber.validator as ValidationCheck)('MockPhoneNumber', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockPhoneNumber');
  });

  it('should have an socialWorkerEmail text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const socialWorkerEmail = fields.socialWorkerEmail;

    expect(socialWorkerEmail.type).toBe('text');
    expect((socialWorkerEmail.label as LanguageLookup)(generatedContent)).toBe(enContent.socialWorkerEmail);

    (socialWorkerEmail.validator as ValidationCheck)('MockEmail', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockEmail');
  });

  it('should have an childLocalAuthority text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const childLocalAuthority = fields.childLocalAuthority;

    expect(childLocalAuthority.type).toBe('text');
    expect((childLocalAuthority.label as LanguageLookup)(generatedContent)).toBe(enContent.childLocalAuthority);

    (childLocalAuthority.validator as ValidationCheck)('MockEmail', {});
    expect(isEmailValid).toHaveBeenCalledWith('MockEmail');
    (childLocalAuthority.validator as ValidationCheck)(undefined, {});
    expect(isEmailValid).not.toHaveBeenCalledWith();
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as LanguageLookup)(generatePageContent({ language: EN }) as Record<string, never>)).toBe(
      'Save and continue'
    );
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect(
      (form.saveAsDraft?.text as LanguageLookup)(generatePageContent({ language: EN }) as Record<string, never>)
    ).toBe('Save as draft');
  });
});
