import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesNoNotsure } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Sibling details',
  label: 'Does the child have any siblings or half siblings with court orders?',
  conditionalText:
    '<label class="govuk-label">You will be asked to provide each sibling court order individually.</label>',
  errors: {
    hasSiblings: {
      required: 'Please select an answer',
    },
  },
};

const cyContent = {
  section: 'Manylion y brawd/chwaer',
  label: 'A oes gan y plentyn frodyr/chwiorydd neu hanner brodyr/chwiorydd sydd â gorchmynion llys?',
  conditionalText:
    '<label class="govuk-label">Gofynnir i chi ddarparu pob gorchymyn llys brodyr a chwiorydd yn unigol.</label>',
  errors: {
    hasSiblings: {
      required: 'Dewiswch ateb os gwelwch yn dda',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > exists > content', () => {
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

  test('should contain hasSiblings field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.hasSiblings as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.label);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesNoNotsure.YES);
    expect((field.values[0].conditionalText as Function)(generatedContent)).toBe(enContent.conditionalText);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesNoNotsure.NO);
    expect((field.values[2].label as Function)(commonContent)).toBe(commonContent.notSure);
    expect(field.values[2].value).toBe(YesNoNotsure.NOT_SURE);
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
