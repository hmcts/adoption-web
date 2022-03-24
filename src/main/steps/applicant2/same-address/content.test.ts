import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Second applicant',
  label: 'Do you also live at this address?',
  yes: 'Yes',
  no: 'No',
  errors: {
    applicant2AddressSameAsApplicant1: {
      required: 'Please answer the question',
    },
  },
};

const cyContent = {
  section: 'Ail geisydd',
  label: 'A ydych chi’n byw yn y cyfeiriad hwn hefyd?',
  yes: 'Ydw',
  no: 'Nac ydw',
  errors: {
    applicant2AddressSameAsApplicant1: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('same-address content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      applicant1Address1: 'MOCK_ADDRESS_LINE_1',
      applicant1AddressTown: 'MOCK_ADDRESS_TOWN',
      applicant1AddressPostcode: 'MOCK_ADDRESS_POSTCODE',
    },
  } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain applicant2AddressSameAsApplicant1 field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant2AddressSameAsApplicant1Field = fields.applicant2AddressSameAsApplicant1 as FormOptions;
    expect(applicant2AddressSameAsApplicant1Field.type).toBe('radios');
    expect(applicant2AddressSameAsApplicant1Field.classes).toBe('govuk-radios');
    expect((applicant2AddressSameAsApplicant1Field.label as Function)(generatedContent)).toBe(enContent.label);
    expect((applicant2AddressSameAsApplicant1Field.section as Function)(generatedContent)).toBe(enContent.section);
    expect(((applicant2AddressSameAsApplicant1Field as FormInput).hint as Function)(generatedContent)).toBe(
      '<div class="govuk-inset-text">MOCK_ADDRESS_LINE_1<br>MOCK_ADDRESS_TOWN<br>MOCK_ADDRESS_POSTCODE</div>'
    );
    expect((applicant2AddressSameAsApplicant1Field.values[0].label as Function)(generatedContent)).toBe(enContent.yes);
    expect((applicant2AddressSameAsApplicant1Field.values[1].label as Function)(generatedContent)).toBe(enContent.no);
    expect(applicant2AddressSameAsApplicant1Field.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
