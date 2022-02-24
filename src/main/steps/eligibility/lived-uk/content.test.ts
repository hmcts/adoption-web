import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesNoNotsure } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Eligibility to apply to adopt',
  label:
    'Have you and any other applicant if relevant, lived in the UK, Channel Islands or Isle of Man for at least 12 months (habitually resident)?',
  livedUKNo: 'You cannot apply to adopt a child unless you have a permanent home here.',
  moreInfo: 'More about adoption',
  errors: {
    livedUKEligible: {
      required: 'Please answer the question',
    },
  },
};

const cyContent = {
  section: 'Eligibility to apply to adopt (in Welsh)',
  label:
    'Have you and any other applicant if relevant, lived in the UK, Channel Islands or Isle of Man for at least 12 months (habitually resident)? (in welsh)',
  livedUKNo: 'You cannot apply to adopt a child unless you have a permanent home here. (in welsh)',
  moreInfo: 'More about adoption (in welsh)',
  errors: {
    livedUKEligible: {
      required: 'Please answer the question (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('eligibility > lived-uk > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain livedUKEligible field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.livedUKEligible as FormOptions;
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
