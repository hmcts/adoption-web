import { YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "Other parent's details",
  label: 'Do you have the address of the other person with parental responsibility for the child?',
  hint: "Ask the adoption agency or social worker if you're not sure.",
  otherParentAddressUnknownReason: "Give a reason why address is not known, for example 'no fixed address'.",
  errors: {
    otherParentAddressKnown: {
      required: 'Please select an answer',
    },
    otherParentAddressUnknownReason: {
      required: 'Provide a reason',
    },
  },
};

const cyContent = {
  section: "Other parent's details (in Welsh)",
  label: 'Do you have the address of the other person with parental responsibility for the child? (in welsh)',
  hint: "Ask the adoption agency or social worker if you're not sure. (in welsh)",
  otherParentAddressUnknownReason: "Give a reason why address is not known, for example 'no fixed address'. (in Welsh)",
  errors: {
    otherParentAddressKnown: {
      required: 'Please select an answer (in welsh)',
    },
    otherParentAddressUnknownReason: {
      required: 'Provide a reason (in Welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('other-parent > address-known content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { otherParentAddressKnown: YesOrNo.YES },
  }) as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.label).toEqual(enContent.label);
    expect(generatedContent.hint).toEqual(enContent.hint);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.label).toEqual(cyContent.label);
    expect(generatedContent.hint).toEqual(cyContent.hint);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain otherParentAddressKnown field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.otherParentAddressKnown as FormOptions;
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
  });

  test('should display reason textarea in case of address unknown', () => {
    const content = generateContent(
      generatePageContent({ language: 'en', userCase: { otherParentAddressKnown: YesOrNo.NO } }) as CommonContent
    );
    const fields = (content.form as FormContent).fields as FormFields;
    const field = fields.otherParentAddressKnown as FormFields;
    const subFieldNo = field.values[1].subFields.otherParentAddressUnknownReason as FormOptions;
    const subFieldAttributes = subFieldNo.attributes as HTMLTextAreaElement;
    expect(subFieldNo.validator).toBe(isFieldFilledIn);
    expect(subFieldNo.type).toBe('textarea');
    expect((subFieldNo.label as Function)(content)).toBe(enContent.otherParentAddressUnknownReason);
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
