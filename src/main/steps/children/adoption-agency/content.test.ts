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
  localAuthorityName: 'Name of local authority',
  localAuthorityContactName: 'Name of your contact',
  localAuthorityContactNameHint:
    'This is usually your social worker. If you do not yet have a social worker, then this is the name of the person you have the most contact with in the local authority.',
  localAuthorityPhoneNumber: 'Phone number',
  localAuthorityPhoneNumberHint: 'This should be the number of your contact.',
  localAuthorityContactEmail: 'Email address of your contact',
  errors: {
    localAuthorityName: {
      required: 'Enter a name',
    },
    localAuthorityContactName: {
      required: 'Enter a name',
    },
    localAuthorityPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    localAuthorityContactEmail: {
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
  localAuthorityName: 'Enw’r asiantaeth fabwysiadu neu’r awdurdod lleol',
  localAuthorityContactName: 'Enw eich cyswllt',
  localAuthorityContactNameHint:
    'This is usually your social worker. If you do not yet have a social worker, then this is the name of the person you have the most contact with in the local authority. (in welsh)',
  localAuthorityPhoneNumber: 'Rhif ffôn',
  localAuthorityPhoneNumberHint: 'This should be the number of your contact. (in welsh)',
  localAuthorityContactEmail: 'Cyfeiriad e-bost eich cyswllt',
  errors: {
    localAuthorityName: {
      required: 'Nac ydwdwch enw',
    },
    localAuthorityContactName: {
      required: 'Nac ydwdwch enw',
    },
    localAuthorityPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    localAuthorityContactEmail: {
      required: 'Nac ydwdwch gyfeiriad e-bost',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
    },
  },
};

const commonContent = { language: EN } as CommonContent;

/* eslint-disable @typescript-eslint/ban-types */
describe('children > localAuthorityName > content', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  it('should have an localAuthorityName text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const localAuthorityName = fields.localAuthorityName;

    expect(localAuthorityName.type).toBe('text');
    expect((localAuthorityName.label as LanguageLookup)(generatedContent)).toBe(enContent.localAuthorityName);

    (localAuthorityName.validator as ValidationCheck)('MockAgencyName', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyName', {});
  });

  it('should have an localAuthorityPhoneNumber text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const localAuthorityPhoneNumber = fields.localAuthorityPhoneNumber;

    expect(localAuthorityPhoneNumber.type).toBe('text');
    expect((localAuthorityPhoneNumber.label as LanguageLookup)(generatedContent)).toBe(
      enContent.localAuthorityPhoneNumber
    );

    (localAuthorityPhoneNumber.validator as ValidationCheck)('MockAgencyPhoneNumber', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyPhoneNumber');
  });

  it('should have an localAuthorityContactName text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const localAuthorityContactName = fields.localAuthorityContactName;

    expect(localAuthorityContactName.type).toBe('text');
    expect((localAuthorityContactName.label as LanguageLookup)(generatedContent)).toBe(
      enContent.localAuthorityContactName
    );

    (localAuthorityContactName.validator as ValidationCheck)('MockAgencyContactName', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyContactName', {});
  });

  it('should have an localAuthorityContactEmail text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const localAuthorityContactEmail = fields.localAuthorityContactEmail;

    expect(localAuthorityContactEmail.type).toBe('text');
    expect((localAuthorityContactEmail.label as LanguageLookup)(generatedContent)).toBe(
      enContent.localAuthorityContactEmail
    );

    (localAuthorityContactEmail.validator as ValidationCheck)('MockAgencyContactEmail', {});
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
