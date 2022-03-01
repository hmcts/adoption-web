import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { Gender } from '../../../app/case/definition';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "The child's details",
  label: "What was the child's sex at birth?",
  hint: "You should state exactly what is listed on the birth certificate. If the child's sex is listed as 'diverse', which means their biological sex could not be determined, you should choose the 'intersex' option.",
  male: 'Male',
  female: 'Female',
  other: 'Other',
  childrenOtherSexAtBirth: 'You should state exactly what is listed on the birth certificate.',
  errors: {
    childrenSexAtBirth: {
      required: 'Please select an answer',
    },
    childrenOtherSexAtBirth: {
      required: 'Enter what is written on the birth certificate',
      invalid: 'Must be 500 characters or fewer',
    },
  },
};

const cyContent = {
  section: "The child's details (in welsh)",
  label: "What was the child's sex at birth? (in welsh)",
  hint: "You should state exactly what is listed on the birth certificate. If the child's sex is listed as 'diverse', which means their biological sex could not be determined, you should choose the 'intersex' option. (in welsh)",
  male: 'Male (in welsh)',
  female: 'Female (in welsh)',
  other: 'Other (in welsh)',
  childrenOtherSexAtBirth: 'You should state exactly what is listed on the birth certificate.',
  errors: {
    childrenSexAtBirth: {
      required: 'Please select an answer (in welsh)',
    },
    childrenOtherSexAtBirth: {
      required: 'Enter what is written on the birth certificate (in welsh)',
      invalid: 'Must be 500 characters or fewer (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > sex-at-birth > content', () => {
  const commonContent = { language: 'en', userCase: { childrenSexAtBirth: 'male' } } as CommonContent;
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain childrenSexAtBirth field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const childrenSexAtBirthField = fields.childrenSexAtBirth as FormOptions;
    expect(childrenSexAtBirthField.type).toBe('radios');
    expect(childrenSexAtBirthField.classes).toBe('govuk-radios');
    expect((childrenSexAtBirthField.label as Function)(generatedContent)).toBe(enContent.label);
    expect(((childrenSexAtBirthField as FormInput).hint as Function)(generatedContent)).toBe(enContent.hint);
    expect((childrenSexAtBirthField.section as Function)(generatedContent)).toBe(enContent.section);
    expect((childrenSexAtBirthField.values[0].label as Function)(generatedContent)).toBe(enContent.male);
    expect(childrenSexAtBirthField.values[0].value).toBe(Gender.MALE);
    expect((childrenSexAtBirthField.values[1].label as Function)(generatedContent)).toBe(enContent.female);
    expect(childrenSexAtBirthField.values[1].value).toBe(Gender.FEMALE);
    expect((childrenSexAtBirthField.values[2].label as Function)(generatedContent)).toBe(enContent.other);
    expect(childrenSexAtBirthField.values[2].value).toBe(Gender.OTHER);
    expect(childrenSexAtBirthField.validator).toBe(isFieldFilledIn);

    const childrenOtherSexAtBirthField = childrenSexAtBirthField.values[2].subFields!.childrenOtherSexAtBirth;
    expect(childrenOtherSexAtBirthField.type).toBe('text');
    expect((childrenOtherSexAtBirthField.label as Function)(generatedContent)).toBe(enContent.childrenOtherSexAtBirth);
    expect(childrenOtherSexAtBirthField.labelSize).toBe(null);

    (childrenOtherSexAtBirthField.validator as Function)('MockTextArea');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockTextArea');
    expect(isTextAreaValid).toHaveBeenCalledWith('MockTextArea');
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
