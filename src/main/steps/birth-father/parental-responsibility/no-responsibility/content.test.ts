import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { ResponsibilityReasons, YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { SECTION, SECTION_IN_WELSH } from '../../constants';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const enContent = {
  section: SECTION,
  title: 'Why does the birth father not have parental responsibility?',
  hint: 'Select all options that are relevant.',
  removedByCourt: 'Parental responsibility removed by court',
  neverObtained: 'Parental responsibility never obtained',
  otherReason: 'Other',
  otherHint: 'Enter the reason why the birth father does not have parental responsibility',
  errors: {
    birthFatherResponsibilityReason: {
      required: 'Select why the birth father does not have parental responsibility.',
    },
    birthFatherOtherResponsibilityReason: {
      required: 'Enter the reason why the birth father does not have parental responsibility.',
    },
  },
};

const cyContent = {
  section: SECTION_IN_WELSH,
  title: 'Pam nad oes gan y tad genedigol gyfrifoldeb rhiant?',
  hint: 'Dewiswch bob opsiwn sy’n berthnasol i chi.',
  removedByCourt: 'Cyfrifoldeb rhiant wedi ei ddileu gan y llys',
  neverObtained: 'Ni chafwyd cyfrifoldeb rhiant erioed',
  otherReason: 'Arall',
  otherHint: 'Nodwch y rheswm pam nad oes gan y tad genedigol gyfrifoldeb rhiant.',
  errors: {
    birthFatherResponsibilityReason: {
      required: 'Dewiswch pam nad oes gan y tad genedigol gyfrifoldeb rhiant.',
    },
    birthFatherOtherResponsibilityReason: {
      required: 'Nodwch y rheswm pam nad oes gan y tad genedigol gyfrifoldeb rhiant.',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('birth-father > parental-responsibility > granted > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { birthFatherResponsibility: YesOrNo.YES },
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

  test('should display checkbox with responsibility options', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.birthFatherResponsibilityReason as FormOptions;

    expect(field.type).toBe('checkboxes');
    expect((field.label as Function)(generatedContent)).toBe(enContent.title);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect(field.values).toHaveLength(3);
    expect((field.values[0].label as Function)(generatedContent)).toBe(enContent.removedByCourt);
    expect(field.values[0].value).toBe(ResponsibilityReasons.REMOVED_BY_COURT);
    expect((field.values[1].label as Function)(generatedContent)).toBe(enContent.neverObtained);
    expect(field.values[1].value).toBe(ResponsibilityReasons.NEVER_OBTAINED);
    expect((field.values[2].label as Function)(generatedContent)).toBe(enContent.otherReason);
    expect(field.values[2].value).toBe(ResponsibilityReasons.OTHER);

    expect((field.hint as Function)(generatedContent)).toBe(enContent.hint);
    expect((field.values[2].subFields?.birthFatherOtherResponsibilityReason.label as Function)(generatedContent)).toBe(
      enContent.otherHint
    );
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
