/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

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
  section: 'Manylion eich asiantaeth fabwysiadu neu’ch awdurdod lleol',
  title: 'Manylion yr asiantaeth fabwysiadu neu’r awdurdod lleol',
  adopAgencyName: 'Enw’r asiantaeth fabwysiadu neu’r awdurdod lleol',
  adopAgencyPhone: 'Rhif ffôn',
  adopAgencyContactName: 'Enw eich cyswllt',
  adopAgencyContactEmail: 'Cyfeiriad e-bost eich cyswllt',
  errors: {
    adopAgencyOrLaName: {
      required: 'Nac ydwdwch enw',
    },
    adopAgencyOrLaPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    adopAgencyOrLaContactName: {
      required: 'Nac ydwdwch enw',
    },
    adopAgencyOrLaContactEmail: {
      required: 'Nac ydwdwch gyfeiriad e-bost',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
    },
  },
};

const commonContent = { language: EN } as CommonContent;

describe('children > adoption-agency > content', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
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
