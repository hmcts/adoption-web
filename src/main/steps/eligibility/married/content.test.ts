import { YesNoNotsure } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Eligibility to apply to adopt',
  label: 'Is the child married or in a civil partnership?',
  hint: 'This includes any past marriages or civil partnerships. In the UK a child can get married at 16 with parental permission. In other countries this age may be lower. A child who is married or in a civil partnership cannot be adopted.',
  one: 'Yes',
  two: 'No',
  marriedYes: "You can only apply to adopt a child if they've not been married or in a civil partnership.",
  moreInfo: 'More about adoption',
  errors: {
    marriedEligible: {
      required: 'Please answer the question',
    },
  },
};

const cyContent = {
  section: 'Eligibility to apply to adopt (in Welsh)',
  label: 'Is the child married or in a civil partnership? (in welsh)',
  hint: 'This includes any past marriages or civil partnerships. In the UK a child can get married at 16 with parental permission. In other countries this age may be lower. A child who is married or in a civil partnership cannot be adopted. (in welsh)',
  one: 'Yes (in welsh)',
  two: 'No (in welsh)',
  marriedYes: "You can only apply to adopt a child if they've not been married or in a civil partnership. (in welsh)",
  moreInfo: 'More about adoption (in welsh)',
  errors: {
    marriedEligible: {
      required: 'Please answer the question (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('eligibility > start > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.label).toEqual(enContent.label);
    expect(generatedContent.hint).toEqual(enContent.hint);
    expect(generatedContent.marriedYes).toEqual(enContent.marriedYes);
    expect(generatedContent.moreInfo).toEqual(enContent.moreInfo);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.label).toEqual(cyContent.label);
    expect(generatedContent.hint).toEqual(cyContent.hint);
    expect(generatedContent.marriedYes).toEqual(cyContent.marriedYes);
    expect(generatedContent.moreInfo).toEqual(cyContent.moreInfo);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain hasPoForSiblings field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.marriedEligible as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.label);
    expect((field.hint as Function)(generatedContent)).toBe(enContent.hint);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesNoNotsure.YES);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesNoNotsure.NO);
    expect(field.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    expect(((generatedContent.form as FormContent).submit.text as Function)(commonContent)).toBe(
      commonContent.continue
    );
  });
});
/* eslint-enable @typescript-eslint/ban-types */
