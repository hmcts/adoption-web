import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesNoNotsure } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Sibling details',
  label: "Is there a court order in place for any of the child's siblings or half siblings?",
  hint: 'For example, a care order or supervision order. Your adoption agency or social worker can help provide these details.',
  errors: {
    hasPoForSiblings: {
      required: 'Please answer the question',
    },
  },
};

const cyContent = {
  section: 'Manylion y brawd/chwaer',
  label:
    'A oes gorchymyn llys mewn lle ar gyfer unrhyw un o frodyr/chwiorydd neu hanner frodyr/hanner chwiorydd y plentyn?',
  hint: 'Er enghraifft, gorchymyn gofal neu neuchymyn goruchwylio. Gall eich asiantaeth fabwysiadu neu’ch gweithiwr cymdeithasol eich helpu i lenwi’r rhan hon.',
  errors: {
    hasPoForSiblings: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > court-order-exists > content', () => {
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

  test('should contain hasPoForSiblings field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.hasPoForSiblings as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.label);
    expect((field.hint as Function)(generatedContent)).toBe(enContent.hint);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesNoNotsure.YES);
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
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
