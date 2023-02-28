/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesNoNotsure } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';
import { generateContent } from '../multiple-children/content';

const enContent = {
  section: 'Eligibility to apply to adopt',
  title: 'Are you applying to adopt more than one child?',
  errors: {
    multipleChildrenEligible: {
      required: 'Select if you are applying to adopt more than one child',
    },
  },
};

const cyContent = {
  section: 'Gofynion cymhwysedd i wneud cais i fabwysiadu',
  title: 'Ydych chi’n gwneud cais i fabwysiadu mwy nag un plentyn?',
  errors: {
    multipleChildrenEligible: {
      required: 'Dewiswch a ydych chi’n gwneud cais i fabwysiadu mwy nag un plentyn',
    },
  },
};

describe('more than one children', () => {
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

  test('should contain multiple children field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;

    const field = fields.multipleChildrenEligible as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.title);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesNoNotsure.NO);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesNoNotsure.YES);
    expect(field.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    expect(((generatedContent.form as FormContent).submit.text as Function)(commonContent)).toBe(
      commonContent.continue
    );
  });
});
