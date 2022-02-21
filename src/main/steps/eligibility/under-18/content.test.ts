import { YesNoNotsure } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Eligibility to apply to adopt',
  label: 'Will the child be under 18 years old on the date you submit your application?',
  one: 'Yes',
  two: 'No',
  under18No:
    'You can only apply to adopt a child if they are under 18 years old on the date your application is submitted.',
  moreInfo: 'More about adoption',
  errors: {
    under18Eligible: {
      required: 'Please answer the question',
    },
  },
};

const cyContent = {
  section: 'Eligibility to apply to adopt (in Welsh)',
  label: 'Will the child be under 18 years old on the date you submit your application? (in welsh)',
  one: 'Yes (in welsh)',
  two: 'No (in welsh)',
  under18No:
    'You can only apply to adopt a child if they are under 18 years old on the date your application is submitted. (in welsh)',
  moreInfo: 'More about adoption (in welsh)',
  errors: {
    under18Eligible: {
      required: 'Please answer the question (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('eligibility > under-18 > content', () => {
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
    expect(generatedContent.under18No).toEqual(enContent.under18No);
    expect(generatedContent.moreInfo).toEqual(enContent.moreInfo);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.label).toEqual(cyContent.label);
    expect(generatedContent.under18No).toEqual(cyContent.under18No);
    expect(generatedContent.moreInfo).toEqual(cyContent.moreInfo);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain under18Eligible field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.under18Eligible as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.label);
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
