import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup, ValidationCheck } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
  section: 'Application details',
  title: 'Adoption agency or local authority details',
  adopAgencyName: 'Name of adoption agency or local authority',
  adopAgencyContactName: 'Name of your contact',
  adopAgencyPhone: 'Phone number',
  adopAgencyAddressLine1: 'Address line 1',
  adopAgencyTown: 'Town or city',
  adopAgencyPostcode: 'Postcode',
  adopAgencyContactEmail: 'Email address of your contact',
  errors: {
    adopAgencyOrLaName: {
      required: 'Enter name of adoption agency or local authority',
    },
    adopAgencyOrLaContactName: {
      required: 'Enter name of your contact',
    },
    adopAgencyOrLaPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    adopAgencyAddressLine1: {
      required: 'Enter the first line of the address',
    },
    adopAgencyTown: {
      required: 'Enter the town or city',
    },
    adopAgencyPostcode: {
      required: 'Enter postcode, like AA1 1AA',
      invalid: 'Enter postcode, like AA1 1AA',
    },
    adopAgencyOrLaContactEmail: {
      required: 'Enter an email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
  },
};

const cyContent = {
  section: 'Manylion y cais',
  title: 'Yr asiantaeth fabwysiadu neu fanylion yr awdurdod lleol',
  adopAgencyName: "Enw'r asiantaeth fabwysiadu neu'r awdurdod lleol",
  adopAgencyContactName: 'Enw eich cyswllt',
  adopAgencyPhone: 'Rhif ffôn',
  adopAgencyAddressLine1: 'Llinell gyntaf y cyfeiriad',
  adopAgencyTown: 'Tref neu ddinas',
  adopAgencyPostcode: 'Cod post, fel AA1 1AA',
  adopAgencyContactEmail: 'Cyfeiriad e-bost eich cyswllt',
  errors: {
    adopAgencyOrLaName: {
      required: "Rhowch enw'r asiantaeth fabwysiadu neu’r awdurdod lleol",
    },
    adopAgencyOrLaContactName: {
      required: "Rhowch enw'ch cyswllt",
    },
    adopAgencyOrLaPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    adopAgencyAddressLine1: {
      required: 'Rhowch linell gyntaf y cyfeiriad',
    },
    adopAgencyTown: {
      required: "Rhowch enw'r dref neu'r ddinas",
    },
    adopAgencyPostcode: {
      required: 'Cod post, fel AA1 1AA',
      invalid: 'Cod post, fel AA1 1AA',
    },
    adopAgencyOrLaContactEmail: {
      required: 'Rhowch gyfeiriad e-bost',
      invalid: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel name@example.com',
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

  it('should have an adopAgencyAddressLine1 text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const adopAgencyAddressLine1 = fields.adopAgencyAddressLine1;

    expect(adopAgencyAddressLine1.type).toBe('text');
    expect((adopAgencyAddressLine1.label as LanguageLookup)(generatedContent)).toBe(enContent.adopAgencyAddressLine1);

    (adopAgencyAddressLine1.validator as ValidationCheck)('MockAdopAgencyAddressLine1', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockAdopAgencyAddressLine1', {});
  });

  it('should have an adopAgencyTown text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const adopAgencyTown = fields.adopAgencyTown;

    expect(adopAgencyTown.type).toBe('text');
    expect((adopAgencyTown.label as LanguageLookup)(generatedContent)).toBe(enContent.adopAgencyTown);

    (adopAgencyTown.validator as ValidationCheck)('MockAdopadopAgencyTown', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockAdopadopAgencyTown', {});
  });

  it('should have an adopAgencyPostcode text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const adopAgencyPostcode = fields.adopAgencyPostcode;

    expect(adopAgencyPostcode.type).toBe('text');
    expect((adopAgencyPostcode.label as LanguageLookup)(generatedContent)).toBe(enContent.adopAgencyPostcode);
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
