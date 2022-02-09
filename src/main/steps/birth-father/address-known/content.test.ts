import { YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "Birth father's details",
  label: 'Do you have the birth father’s last known address?',
  moreDetails: "Give a reason why the address is not known, for example 'no fixed address'.",
  hint: "Ask the adoption agency or social worker if you're not sure.",
  errors: {
    birthFatherAddressKnown: {
      required: 'Please select an answer',
    },
    birthFatherAddressNotKnownReason: {
      required: 'Provide a reason',
    },
  },
};

const cyContent = {
  section: "Birth father's details (in Welsh)",
  label: 'Do you have the birth father’s last known address? (in Welsh)',
  moreDetails: "Give a reason why the address is not known, for example 'no fixed address'. (in Welsh)",
  hint: "Ask the adoption agency or social worker if you're not sure. (in Welsh)",
  errors: {
    birthFatherAddressKnown: {
      required: 'Please select an answer (in Welsh)',
    },
    birthFatherAddressNotKnownReason: {
      required: 'Provide a reason (in Welsh)',
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
    expect(generatedContent.hint).toEqual(enContent.hint);
    expect(generatedContent.moreDetails).toEqual(enContent.moreDetails);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.label).toEqual(cyContent.label);
    expect(generatedContent.hint).toEqual(cyContent.hint);
    expect(generatedContent.moreDetails).toEqual(cyContent.moreDetails);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain birthFatherAddressKnown field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.birthFatherAddressKnown as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.label);
    expect(((field as FormInput).hint as Function)(generatedContent)).toBe(enContent.hint);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesOrNo.YES);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesOrNo.NO);
    expect(field.validator).toBe(isFieldFilledIn);

    const field2 = (fields.birthFatherAddressKnown as FormOptions).values[1].subFields!
      .birthFatherAddressNotKnownReason;
    expect((field2?.label as Function)(generatedContent)).toBe(enContent.moreDetails);
    expect(field2.type).toBe('textarea');
    expect(field2?.labelSize).toBe(null);
    expect(field2.validator).toBe(isFieldFilledIn);
    expect((field2.attributes as HTMLTextAreaElement).rows).toBe(1);
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
