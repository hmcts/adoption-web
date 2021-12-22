import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > sex-at-birth content', () => {
  const commonContent = { language: 'en', userCase: { childrenSexAtBirth: 'male' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toEqual("The child's details");
    expect(generatedContent.label).toEqual("What was the child's sex at birth?");
    expect(generatedContent.hint).toEqual(
      "You should state exactly what is listed on the birth certificate. If the child's sex is listed as 'diverse', which means their biological sex could not be determined, you should choose the 'intersex' option."
    );
    expect(generatedContent.male).toEqual('Male');
    expect(generatedContent.female).toEqual('Female');
    expect(generatedContent.intersex).toEqual('Intersex');
    expect((generatedContent.errors as any).childrenSexAtBirth.required).toEqual('Please select an answer');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual("The child's details (in welsh)");
    expect(generatedContent.label).toEqual("What was the child's sex at birth? (in welsh)");
    expect(generatedContent.hint).toEqual(
      "You should state exactly what is listed on the birth certificate. If the child's sex is listed as 'diverse', which means their biological sex could not be determined, you should choose the 'intersex' option. (in welsh)"
    );
    expect(generatedContent.male).toEqual('Male (in welsh)');
    expect(generatedContent.female).toEqual('Female (in welsh)');
    expect(generatedContent.intersex).toEqual('Intersex (in welsh)');
    expect((generatedContent.errors as any).childrenSexAtBirth.required).toEqual('Please select an answer (in welsh)');
  });

  test('should contain childrenSexAtBirth field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const childrenSexAtBirthField = fields.childrenSexAtBirth as FormOptions;
    expect(childrenSexAtBirthField.type).toBe('radios');
    expect(childrenSexAtBirthField.classes).toBe('govuk-radios');
    expect((childrenSexAtBirthField.label as Function)(generatedContent)).toBe("What was the child's sex at birth?");
    expect(((childrenSexAtBirthField as FormInput).hint as Function)(generatedContent)).toBe(
      "You should state exactly what is listed on the birth certificate. If the child's sex is listed as 'diverse', which means their biological sex could not be determined, you should choose the 'intersex' option."
    );
    expect((childrenSexAtBirthField.section as Function)(generatedContent)).toBe("The child's details");
    expect((childrenSexAtBirthField.values[0].label as Function)(generatedContent)).toBe('Male');
    expect((childrenSexAtBirthField.values[1].label as Function)(generatedContent)).toBe('Female');
    expect((childrenSexAtBirthField.values[2].label as Function)(generatedContent)).toBe('Intersex');
    expect(childrenSexAtBirthField.validator).toBe(isFieldFilledIn);
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
