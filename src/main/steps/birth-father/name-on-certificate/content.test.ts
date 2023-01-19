import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesNoNotsure, YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "Birth father's details",
  title: "Is the birth father's name on the birth certificate?",
  errors: {
    birthFatherNameOnCertificate: {
      required: 'Select whether the birth father’s name is on the birth certificate',
    },
  },
};

const cyContent = {
  section: 'Manylion y tad biolegol',
  title: 'A yw enw’r tad biolegol ar y dystysgrif geni?',
  errors: {
    birthFatherNameOnCertificate: {
      required: 'Nodwch a yw enw’r tad biolegol yw ar y dystysgrif geni',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('birth-father > still-alive > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { birthFatherNameOnCertificate: YesOrNo.YES },
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

  test('should contain birthFatherStillAlive field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.birthFatherNameOnCertificate as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.title);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesNoNotsure.YES);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesNoNotsure.NO);
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
