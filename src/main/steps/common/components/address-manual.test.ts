import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../common.content';

import { generateContent } from './address-manual';

jest.mock('../../../app/form/validation');

const enContent = {
  addressLine1: 'Address line 1 <span class="govuk-visually-hidden">line 1 of 2</span>',
  addressLine2: 'Address line 2 (optional) <span class="govuk-visually-hidden">line 2 of 2</span>',
  town: 'Town or city',
  county: 'County (optional)',
  postcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  errors: {
    address1: {
      required: 'Enter the first line of the address',
    },
    addressTown: {
      required: 'Enter the town or city',
    },
    addressPostcode: {
      required: 'Enter a postcode, like AA1 1AA',
      invalid: 'Enter a postcode, like AA1 1AA',
    },
  },
};

const cyContent = {
  addressLine1: 'Llinell cyfeiriad 1 <span class="govuk-visually-hidden">llinell 1 o 2</span>',
  addressLine2: 'Llinell cyfeiriad 2 (dewisol) <span class="govuk-visually-hidden">llinell 2 o 2</span>',
  town: 'Tref neu ddinas',
  county: 'Sir (dewisol)',
  postcode: 'Cod post',
  enterInternationalAddress: 'Nac ydwdwch gyfeiriad rhyngwladol',
  errors: {
    address1: {
      required: 'Nac ydwdwch linell gyntaf y cyfeiriad',
    },
    addressTown: {
      required: 'Nac ydwdwch y dref neu ddinas',
    },
    addressPostcode: {
      required: 'Nac ydwdwch y cod post',
      invalid: 'Nodwch god post go iawn',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('common > components > manual-address > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;
  let form;
  let fields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain address1 field', () => {
    const address1Field = fields.address1 as FormOptions;
    expect(address1Field.type).toBe('text');
    expect(address1Field.classes).toBe('govuk-label');
    expect((address1Field.label as Function)(generatedContent)).toBe(enContent.addressLine1);
    expect(address1Field.labelSize).toBe(null);
    expect(address1Field.validator).toBe(isFieldFilledIn);
  });

  test('should contain address2 field', () => {
    const address2Field = fields.address2 as FormOptions;
    expect(address2Field.type).toBe('text');
    expect(address2Field.classes).toBe('govuk-label');
    expect((address2Field.label as Function)(generatedContent)).toBe(enContent.addressLine2);
    expect(address2Field.labelSize).toBe(null);
  });

  test('should contain addressTown field', () => {
    const addressTownField = fields.addressTown as FormOptions;
    expect(addressTownField.type).toBe('text');
    expect(addressTownField.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((addressTownField.label as Function)(generatedContent)).toBe(enContent.town);
    expect(addressTownField.labelSize).toBe(null);
    expect(addressTownField.validator).toBe(isFieldFilledIn);
  });

  test('should contain addressCounty field', () => {
    const addressCountyField = fields.addressCounty as FormOptions;
    expect(addressCountyField.type).toBe('text');
    expect(addressCountyField.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((addressCountyField.label as Function)(generatedContent)).toBe(enContent.county);
    expect(addressCountyField.labelSize).toBe(null);
  });

  test('should contain addressPostcode field', () => {
    const addressPostcodeField = fields.addressPostcode as FormOptions;
    expect(addressPostcodeField.type).toBe('text');
    expect(addressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect((addressPostcodeField.label as Function)(generatedContent)).toBe(enContent.postcode);
    expect(addressPostcodeField.labelSize).toBe(null);
    expect(addressPostcodeField.validator).toBe(isInvalidPostcode);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
