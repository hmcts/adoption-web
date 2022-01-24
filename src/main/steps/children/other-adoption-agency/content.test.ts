import { YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const en = {
  section: 'Your adoption agency or local authority details',
  label: 'Was there another adoption agency or local authority involved in placing the child?',
  errors: {
    hasAnotherAdopAgencyOrLA: {
      required: 'Please answer the question',
    },
  },
};

const cy = {
  section: 'Your adoption agency or local authority details (in Welsh)',
  label: 'Was there another adoption agency or local authority involved in placing the child? (in Welsh)',
  errors: {
    hasAnotherAdopAgencyOrLA: {
      required: 'Please answer the question (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children> other adoption agency', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { hasAnotherAdopAgencyOrLA: YesOrNo.YES },
  }) as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual(en.section);
    expect(generatedContent.label).toEqual(en.label);
    expect(generatedContent.errors).toEqual(en.errors);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cy.section);
    expect(generatedContent.label).toEqual(cy.label);
    expect(generatedContent.errors).toEqual(cy.errors);
  });

  test('should contain hasAnotherAdopAgencyOrLA field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.hasAnotherAdopAgencyOrLA as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(en.label);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesOrNo.YES);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesOrNo.NO);
    expect(field.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    expect(((generatedContent.form as FormContent).submit.text as Function)(commonContent)).toBe(
      commonContent.continue
    );
  });

  test('should contain saveAsDraft button', () => {
    expect(((generatedContent.form as FormContent).saveAsDraft?.text as Function)(commonContent)).toBe(
      commonContent.saveAsDraft
    );
  });
});
/* eslint-enable @typescript-eslint/ban-types */
