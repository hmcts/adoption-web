import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { ResponsibilityReasons, YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';
import { SECTION, SECTION_IN_WELSH } from '../constants';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "Other person's details",
  title: 'How parental responsibility was granted to the other person?',
  hint: 'Select all options that are relevant.',
  courtOrder: 'Court order',
  birthCertificate: 'Birth certificate',
  responsibilityOrder: 'Parental responsibility order',
  responsibilityAgreement: 'Parental responsibility agreement',
  otherReason: 'Other',
  otherHint: 'Enter the reason how parental responsibility was granted to the other person.',
  errors: {
    otherParentResponsibilityReason: {
      required: 'Select how parental responsibility was granted to the other person.',
    },
    otherParentOtherResponsibilityReason: {
      required: 'Enter the reason how parental responsibility was granted to the other person.',
    },
  },
};

const cyContent = {
  section: 'Manylion person arall',
  title: 'Sut caniatawyd cyfrifoldeb rhiant i’r unigolyn arall?',
  hint: 'Dewiswch bob opsiwn sy’n berthnasol i chi.',
  courtOrder: 'Gorchymyn llys',
  birthCertificate: 'Tystysgrif geni',
  responsibilityOrder: 'Gorchymyn cyfrifoldeb rhiant',
  responsibilityAgreement: 'Cytundeb cyfrifoldeb rhiant',
  otherReason: 'Arall',
  otherHint: 'Rhowch y rheswm dros sut caniatawyd cyfrifoldeb rhiant i’r unigolyn arall.',
  errors: {
    otherParentResponsibilityReason: {
      required: 'Dewiswch sut y caniatawyd cyfrifoldeb rhiant i’r unigolyn arall',
    },
    otherParentOtherResponsibilityReason: {
      required: 'Rhowch y rheswm dros sut caniatawyd cyfrifoldeb rhiant i’r unigolyn arall.',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('other-parent > parental-responsibility-granted > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { otherParentExists: YesOrNo.YES },
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
    const field = fields.otherParentResponsibilityReason as FormOptions;

    expect(field.type).toBe('checkboxes');
    expect((field.label as Function)(generatedContent)).toBe(enContent.title);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect(field.values).toHaveLength(5);
    expect((field.values[0].label as Function)(generatedContent)).toBe(enContent.birthCertificate);
    expect(field.values[0].value).toBe(ResponsibilityReasons.BIRTH_CERTIFICATE);
    expect((field.values[1].label as Function)(generatedContent)).toBe(enContent.courtOrder);
    expect(field.values[1].value).toBe(ResponsibilityReasons.COURT_ORDER);
    expect((field.values[2].label as Function)(generatedContent)).toBe(enContent.responsibilityOrder);
    expect(field.values[2].value).toBe(ResponsibilityReasons.RESPONSIBILITY_ORDER);
    expect((field.values[3].label as Function)(generatedContent)).toBe(enContent.responsibilityAgreement);
    expect(field.values[3].value).toBe(ResponsibilityReasons.RESPONSIBILITY_AGREEMENT);
    expect((field.values[4].label as Function)(generatedContent)).toBe(enContent.otherReason);
    expect(field.values[4].value).toBe(ResponsibilityReasons.OTHER);

    expect((field.hint as Function)(generatedContent)).toBe(enContent.hint);
    expect((field.values[4].subFields?.otherParentOtherResponsibilityReason.label as Function)(generatedContent)).toBe(
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
