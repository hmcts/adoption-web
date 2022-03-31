import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup, ValidationCheck } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

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
  section: 'Manylion eich asiantaeth fabwysiadu neu’ch awdurdod lleol',
  title: 'Manylion am weithiwr cymdeithasol y plentyn',
  line1: 'Gallwch gael y manylion hyn gan eich asiantaeth fabwysiadau neu’ch awdurdod lleol.',
  socialWorkerName: "Enw'r gweithiwr cymdeithasol",
  socialWorkerPhoneNumber: 'Rhif ffôn y gweithiwr cymdeithasol',
  socialWorkerEmail: 'Cyfeiriad e-bost y gweithiwr cymdeithasol',
  socialWorkerTeamEmail: 'Cyfeiriad e-bost tîm y gweithiwr cymdeithasol (os yw’n hysbys)',
  errors: {
    socialWorkerName: {
      required: 'Nac ydwdwch enw',
    },
    socialWorkerPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    socialWorkerEmail: {
      required: 'Nac ydwdwch gyfeiriad e-bost',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
    },
    socialWorkerTeamEmail: {
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
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

  it('should have an socialWorkerTeamEmail text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const socialWorkerTeamEmail = fields.socialWorkerTeamEmail;

    expect(socialWorkerTeamEmail.type).toBe('text');
    expect((socialWorkerTeamEmail.label as LanguageLookup)(generatedContent)).toBe(enContent.socialWorkerTeamEmail);

    (socialWorkerTeamEmail.validator as ValidationCheck)('MockEmail', {});
    expect(isEmailValid).toHaveBeenCalledWith('MockEmail');
    (socialWorkerTeamEmail.validator as ValidationCheck)(undefined, {});
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
