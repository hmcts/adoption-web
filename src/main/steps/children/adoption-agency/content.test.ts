import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup, ValidationCheck } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
  section: 'Application details',
  title: 'Local authority details',
  line1:
    'We need the details of the local authority that placed the child with you. These should be on the placement order.',
  adopAgencyName: 'Name of local authority',
  adopAgencyContactName: 'Name of your contact',
  adopAgencyContactNameHint:
    'This is usually your social worker. If you do not yet have a social worker, then this is the name of the person you have the most contact with in the local authority.',
  adopAgencyPhone: 'Phone number',
  adopAgencyPhoneHint: 'This should be the number of your contact.',
  adopAgencyContactEmail: 'Email address of your contact',
  errors: {
    adopAgencyOrLaName: {
      required: 'Enter a name',
    },
    adopAgencyOrLaContactName: {
      required: 'Enter a name',
    },
    adopAgencyOrLaPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    adopAgencyOrLaContactEmail: {
      required: 'Enter an email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
  },
};

const cyContent = {
  section: 'Application details. (in welsh)',
  title: 'Local authority details. (in welsh)',
  line1:
    'We need the details of the local authority that placed the child with you. These should be on the placement order. (in welsh)',
  adopAgencyName: 'Enw’r asiantaeth fabwysiadu neu’r awdurdod lleol',
  adopAgencyContactName: 'Enw eich cyswllt',
  adopAgencyContactNameHint:
    'This is usually your social worker. If you do not yet have a social worker, then this is the name of the person you have the most contact with in the local authority. (in welsh)',
  adopAgencyPhone: 'Rhif ffôn',
  adopAgencyPhoneHint: 'This should be the number of your contact. (in welsh)',
  adopAgencyContactEmail: 'Cyfeiriad e-bost eich cyswllt',
  errors: {
    adopAgencyOrLaName: {
      required: 'Nac ydwdwch enw',
    },
    adopAgencyOrLaContactName: {
      required: 'Nac ydwdwch enw',
    },
    adopAgencyOrLaPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    adopAgencyOrLaContactEmail: {
      required: 'Nac ydwdwch gyfeiriad e-bost',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
    },
  },
};

const commonContent = { language: EN } as CommonContent;

/* eslint-disable @typescript-eslint/ban-types */
describe('children > adoption-agency > content', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  it('should have an adopAgencyOrLaName text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const adopAgencyOrLaName = fields.adopAgencyOrLaName;

    expect(adopAgencyOrLaName.type).toBe('text');
    expect((adopAgencyOrLaName.label as LanguageLookup)(generatedContent)).toBe(enContent.adopAgencyName);

    (adopAgencyOrLaName.validator as ValidationCheck)('MockAgencyName', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyName', {});
  });

  it('should have an adopAgencyOrLaPhoneNumber text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const adopAgencyOrLaPhoneNumber = fields.adopAgencyOrLaPhoneNumber;

    expect(adopAgencyOrLaPhoneNumber.type).toBe('text');
    expect((adopAgencyOrLaPhoneNumber.label as LanguageLookup)(generatedContent)).toBe(enContent.adopAgencyPhone);

    (adopAgencyOrLaPhoneNumber.validator as ValidationCheck)('MockAgencyPhoneNumber', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyPhoneNumber');
  });

  it('should have an adopAgencyOrLaContactName text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const adopAgencyOrLaContactName = fields.adopAgencyOrLaContactName;

    expect(adopAgencyOrLaContactName.type).toBe('text');
    expect((adopAgencyOrLaContactName.label as LanguageLookup)(generatedContent)).toBe(enContent.adopAgencyContactName);

    (adopAgencyOrLaContactName.validator as ValidationCheck)('MockAgencyContactName', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyContactName', {});
  });

  it('should have an adopAgencyOrLaContactEmail text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const adopAgencyOrLaContactEmail = fields.adopAgencyOrLaContactEmail;

    expect(adopAgencyOrLaContactEmail.type).toBe('text');
    expect((adopAgencyOrLaContactEmail.label as LanguageLookup)(generatedContent)).toBe(
      enContent.adopAgencyContactEmail
    );

    (adopAgencyOrLaContactEmail.validator as ValidationCheck)('MockAgencyContactEmail', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyContactEmail');
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
