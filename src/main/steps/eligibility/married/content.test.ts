import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesNoNotsure } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Eligibility to apply to adopt',
  label: 'Is the child married or in a civil partnership?',
  hint: 'This includes any past marriages or civil partnerships. In the UK a child can get married at 16 with parental permission. In other countries this age may be lower. A child who is or ever was married or in a civil partnership cannot be adopted.',
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
  hint: 'This includes any past marriages or civil partnerships. In the UK a child can get married at 16 with parental permission. In other countries this age may be lower. A child who is or ever was married or in a civil partnership cannot be adopted. (in welsh)',
  marriedYes: "You can only apply to adopt a child if they've not been married or in a civil partnership. (in welsh)",
  moreInfo: 'More about adoption (in welsh)',
  errors: {
    marriedEligible: {
      required: 'Please answer the question (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('eligibility > married > content', () => {
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

  test('should contain marriedEligible field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.marriedEligible as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.label);
    expect((field.hint as Function)(generatedContent)).toBe(enContent.hint);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);

    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesNoNotsure.YES);
    expect((field.values[0].conditionalText as Function)(generatedContent)).toBe(
      '<p class="govuk-label">You can only apply to adopt a child if they\'ve not been married or in a civil partnership.</p> <p class="govuk-label"><a rel="noreferrer noopener" href="https://www.gov.uk/child-adoption">More about adoption</a></p>'
    );

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
