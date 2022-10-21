import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { LanguagePreference } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const en = {
  section: 'Second applicant',
  title: 'What language do you want to receive emails and documents in?',
  errors: {
    applicant2LanguagePreference: {
      required: 'Please answer the question',
    },
  },
};

const cy = {
  section: 'Ail geisydd',
  title: 'Ym mha iaith yr hoffech gael negeseuon e-bost a dogfennau?',
  errors: {
    applicant2LanguagePreference: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant2 > language-preference > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { applicant2LanguagePreference: LanguagePreference.ENGLISH },
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

  test('should contain applicant2LanguagePreference field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.applicant2LanguagePreference as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.section as Function)(generatedContent)).toBe(en.section);
    expect((field.label as Function)(generatedContent)).toBe(en.title);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.english);
    expect(field.values[0].value).toBe(LanguagePreference.ENGLISH);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.welsh);
    expect(field.values[1].value).toBe(LanguagePreference.WELSH);
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
