import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { LanguagePreference } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const en = {
  section: 'First applicant',
  label: 'What language do you want to receive emails and documents in?',
  errors: {
    applicant1LanguagePreference: {
      required: 'Select whether you want to receive emails and documents in English or Welsh',
    },
  },
};

const cy = {
  section: 'Ceisydd cyntaf',
  label: 'Ym mha iaith yr hoffech gael negeseuon e-bost a dogfennau?',
  errors: {
    applicant1LanguagePreference: {
      required: 'Dewiswch a ydych eisiau eich e-byst a’ch dogfennau yn Gymraeg neu’n Saesneg',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant1 > language-preference > content', () => {
  let commonContent = generatePageContent({
    language: 'en',
    userCase: { applicant1LanguagePreference: LanguagePreference.ENGLISH },
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

  test('should contain applicant1LanguagePreference field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.applicant1LanguagePreference as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.section as Function)(generatedContent)).toBe(en.section);
    expect((field.label as Function)(generatedContent)).toBe(en.label);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.english);
    expect(field.values[0].value).toBe(LanguagePreference.ENGLISH);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.welsh);
    expect(field.values[1].value).toBe(LanguagePreference.WELSH);
    expect(field.validator).toBe(isFieldFilledIn);
  });

  test('should have correct section when language: en and applyingWith: alone', () => {
    commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;
    generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toBe('Applicant');
  });

  test('should have correct section when language: cy and applyingWith: alone', () => {
    commonContent = { language: 'cy', userCase: { applyingWith: 'alone' } } as CommonContent;
    generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toBe('Ceisydd');
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
