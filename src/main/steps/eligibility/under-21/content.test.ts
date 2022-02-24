import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesNoNotsure } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Eligibility to apply to adopt',
  label: 'Are you, and the other applicant if relevant, both aged 21 or over?',
  under21Yes: 'You must be 21 or over to adopt a child. This includes any other applicant.',
  moreInfo: 'More about adoption',
  errors: {
    under21Eligible: {
      required: 'Please answer the question',
    },
  },
};

const cyContent = {
  section: 'Eligibility to apply to adopt (in Welsh)',
  label: 'Are you, and the other applicant if relevant, both aged 21 or over? (in welsh)',
  under21Yes: 'You must be 21 or over to adopt a child. This includes any other applicant. (in welsh)',
  moreInfo: 'More about adoption (in welsh)',
  errors: {
    under21Eligible: {
      required: 'Please answer the question (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('eligibility > under-21 > content', () => {
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

  test('should contain under21Eligible field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.under21Eligible as FormOptions;
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
