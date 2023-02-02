import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const en = {
  section: 'Application details',
  title: 'Is there another adoption agency or local authority involved?',
  hint: 'This would be separate from your local authority, for example it could be a private agency or a different local authority.',
  errors: {
    hasAnotherAdopAgencyOrLA: {
      required: 'Please answer the question',
    },
  },
};

const cy = {
  section: 'Manylion y cais',
  title: 'A oes asiantaeth fabwysiadu neu awdurdod lleol arall yn gysylltiedig â’r achos?',
  hint: "Byddai hyn ar wahân i'ch awdurdod lleol, er enghraifft gallai fod yn asiantaeth breifat neu'n awdurdod lleol gwahanol.",
  errors: {
    hasAnotherAdopAgencyOrLA: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > other-adoption-agency > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { hasAnotherAdopAgencyOrLA: YesOrNo.YES },
  }) as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain hasAnotherAdopAgencyOrLA field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.hasAnotherAdopAgencyOrLA as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.section as Function)(generatedContent)).toBe(en.section);
    expect((field.label as Function)(generatedContent)).toBe(en.title);
    expect((field.hint as Function)(generatedContent)).toBe(en.hint);
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
