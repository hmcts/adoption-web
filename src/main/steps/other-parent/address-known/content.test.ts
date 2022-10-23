import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "Other parent's details",
  title: 'Do you have the address of the other person with parental responsibility for the child?',
  moreDetails: "Give a reason why the address is not known, for example 'no fixed address'.",
  errors: {
    otherParentAddressKnown: {
      required: 'Please select an answer',
    },
    otherParentAddressNotKnownReason: {
      required: 'Provide a reason',
      invalid: 'Reason must be 500 characters or fewer',
    },
  },
};

const cyContent = {
  section: 'Manylion y rhiant arall',
  title: 'A oes gennych gyfeiriad yr unigolyn arall sydd â chyfrifoldeb rhiant dros y plentyn?',
  moreDetails: 'Rhowch reswm pam bod y cyfeiriad yn anhysbys, er enghraifft ‘dim cyfeiriad parhaol’.',
  errors: {
    otherParentAddressKnown: {
      required: 'Dewiswch ateb os gwelwch yn dda',
    },
    otherParentAddressNotKnownReason: {
      required: 'Darparwch reswm',
      invalid: 'Rhaid i’r rheswm fod yn 500 nod neu llai',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('other-parent > address-known > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { otherParentAddressKnown: YesOrNo.YES },
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

  test('should contain otherParentAddressKnown field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.otherParentAddressKnown as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.title);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesOrNo.YES);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesOrNo.NO);
    expect(field.validator).toBe(isFieldFilledIn);

    const field2 = (fields.otherParentAddressKnown as FormOptions).values[1].subFields!
      .otherParentAddressNotKnownReason;
    expect((field2?.label as Function)(generatedContent)).toBe(enContent.moreDetails);
    expect(field2.type).toBe('textarea');
    expect(field2?.labelSize).toBe(null);

    (field2.validator as Function)('MockTextArea');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockTextArea');
    expect(isTextAreaValid).toHaveBeenCalledWith('MockTextArea');

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
