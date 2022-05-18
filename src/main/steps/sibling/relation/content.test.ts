import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Sibling details',
  label: 'What is their relationship to the child being adopted?',
  hint: 'For instance, brother or half sister',
  errors: {
    siblingRelation: {
      required: 'Please answer the question',
    },
  },
};
const cyContent = {
  section: 'Manylion y brawd/chwaer',
  label: 'What is their relationship to the child being adopted? (in welsh)',
  hint: 'For instance, brother or half sister (in welsh)',
  errors: {
    siblingRelation: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > relation > content', () => {
  const commonContent = { language: 'en' } as CommonContent;
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

  test('should contain siblingRelation field', () => {
    generatedContent = generateContent({
      ...commonContent,
      userCase: {
        siblings: [{ siblingId: 'MOCK_SIBLING_ID', siblingRelation: 'MOCK_RELATION' }],
        selectedSiblingId: 'MOCK_SIBLING_ID',
      },
    });
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
    const relationField = fields.siblingRelation as FormOptions;
    expect(relationField.type).toBe('text');
    expect(relationField.classes).toBe('govuk-input govuk-input--width-20');
    expect((relationField.label as Function)(generatedContent)).toBe(enContent.label);
    expect(relationField.labelSize).toBe('l');
    expect(((relationField as FormInput).hint as Function)(generatedContent)).toBe(enContent.hint);
    expect((relationField as FormInput).value).toBe('MOCK_RELATION');
    expect(relationField.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
