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
  section: 'Manylion y cais',
  title: 'Manylion yr awdurdod lleol',
  line1:
    "Rydym angen manylion yr awdurdod lleol a osododd y plentyn gyda chi. Dylai'r rhain fod ar y gorchymyn lleoli.",
  localAuthorityName: 'Enw’r asiantaeth fabwysiadu neu’r awdurdod lleol',
  localAuthorityContactName: 'Enw eich cyswllt',
  localAuthorityContactNameHint:
    'Fel arfer, eich gweithiwr cymdeithasol fydd hwn. Os nad oes gennych weithiwr cymdeithasol eto, dyma’r unigolyn y mae gennych y mwyaf o gyswllt ag ef/hi yn yr awdurdod lleol.',
  localAuthorityPhoneNumber: 'Rhif ffôn',
  localAuthorityPhoneNumberHint: 'Rhif y sawl dan sylw dylai hwn fod.',
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
      invalid: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel name@example.com',
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
    expect((localAuthorityPhoneNumber.hint as LanguageLookup)(generatedContent)).toBe(
      enContent.localAuthorityPhoneNumberHint
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
    expect((localAuthorityContactName.hint as LanguageLookup)(generatedContent)).toBe(
      enContent.localAuthorityContactNameHint
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
