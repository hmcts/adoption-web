import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesNoNotsure, YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';
import { SECTION, SECTION_IN_WELSH } from '../constants';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: SECTION,
  title: 'Does the birth father have parental responsibility?',
  errors: {
    birthFatherResponsibility: {
      required: 'Select if the birth father has parental responsibility.',
    },
  },
};

const cyContent = {
  section: SECTION_IN_WELSH,
  title: 'A oes gan y tad genedigol gyfrifoldeb rhiant?',
  errors: {
    birthFatherResponsibility: {
      required: 'Dewiswch a oes gan y tad genedigol gyfrifoldeb rhiant.',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('birth-father > parental-responsibility > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { birthFatherStillAlive: YesOrNo.YES },
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

  test('should contain birthFatherResponsibility field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.birthFatherResponsibility as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.title);
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

  test('should contain saveAsDraft button', () => {
    expect(((generatedContent.form as FormContent).saveAsDraft?.text as Function)(commonContent)).toBe(
      commonContent.saveAsDraft
    );
  });
});
/* eslint-enable @typescript-eslint/ban-types */
