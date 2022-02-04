import { YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "Birth father's details",
  label: 'Do you have the birth father’s last known address?',
  birthFatherAddressUnknownReason: "Give a reason why address is not known, for example 'no fixed address'.",
  errors: {
    birthFatherAddressUnknownReason: {
      required: 'Provide a reason',
    },
  },
};

const cyContent = {
  section: "Birth father's details (in Welsh)",
  label: 'Do you have the birth father’s last known address? (in Welsh)',
  birthFatherAddressUnknownReason: "Give a reason why address is not known, for example 'no fixed address'. (in Welsh)",
  errors: {
    birthFatherAddressUnknownReason: {
      required: 'Provide a reason',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('birth-father > address-known content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { birthFatherAddressKnown: YesOrNo.YES },
  }) as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.label).toEqual(enContent.label);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.label).toEqual(cyContent.label);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain birthFatherAddressKnown field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.birthFatherAddressKnown as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.label);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesOrNo.YES);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesOrNo.NO);
  });

  test('should display reason textarea in case of address unknown', () => {
    const content = generateContent(
      generatePageContent({ language: 'en', userCase: { birthFatherAddressKnown: YesOrNo.NO } }) as CommonContent
    );
    const fields = (content.form as FormContent).fields as FormFields;
    const field = fields.birthFatherAddressKnown as FormFields;
    const subFieldNo = field.values[1].subFields.birthFatherAddressUnknownReason as FormOptions;
    const subFieldAttributes = subFieldNo.attributes as HTMLTextAreaElement;
    expect(subFieldNo.validator).toBe(isFieldFilledIn);
    expect(subFieldNo.type).toBe('textarea');
    expect((subFieldNo.label as Function)(content)).toBe(enContent.birthFatherAddressUnknownReason);
    expect(subFieldNo.labelSize).toBe(null);
    expect(subFieldAttributes.rows).toBe(1);
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
