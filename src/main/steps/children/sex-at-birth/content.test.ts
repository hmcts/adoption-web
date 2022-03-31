import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { Gender } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "The child's details",
  label: "What was the child's sex at birth?",
  male: 'Male',
  female: 'Female',
  other: 'Other',
  childrenOtherSexAtBirth:
    "For example, if the child's sex was intersex when they were born, you should enter exactly what is listed on the birth certificate.",
  errors: {
    childrenSexAtBirth: {
      required: 'Please select an answer',
    },
    childrenOtherSexAtBirth: {
      required: 'Enter what is written on the birth certificate',
    },
  },
};

const cyContent = {
  section: 'Manylion y plentyn',
  label: 'Beth oedd rhyw’r plentyn pan gafodd ei (g)eni?',
  male: 'Gwryw',
  female: 'Benyw',
  other: 'Arall',
  childrenOtherSexAtBirth:
    'Er enghraifft, os mai rhyngrywiol oedd rhyw y plentyn pan gafodd ei eni, dylech nodi’n union yr hyn sydd wedi’i restru ar y dystysgrif geni.',
  errors: {
    childrenSexAtBirth: {
      required: 'Dewiswch ateb os gwelwch yn dda',
    },
    childrenOtherSexAtBirth: {
      required: 'Nac ydwdwch yr hyn sydd wedi’i ysgrifennu ar y dystysgrif geni.',
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
    expect(childrenOtherSexAtBirthField.validator).toBe(isFieldFilledIn);
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
