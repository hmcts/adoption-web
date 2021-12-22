import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children full-name content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual("The child's details");
    expect(generatedContent.title).toEqual("What is the child's full name?");
    expect(generatedContent.line1).toEqual(
      "Enter the child's full name, as it's written on their birth certificate. Ask the adoption agency or social worker if you're not sure."
    );
    expect(generatedContent.firstName).toEqual('First names');
    expect(generatedContent.firstNameHint).toEqual('(Include any given or middle names)');
    expect(generatedContent.lastName).toEqual('Last names');
    expect(generatedContent.lastNameHint).toEqual('(Include surname or family names)');
    expect((generatedContent.errors as any).childrenFirstName.required).toEqual("Enter the child's first names");
    expect((generatedContent.errors as any).childrenLastName.required).toEqual("Enter the child's last names");
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual("The child's details (in welsh)");
    expect(generatedContent.title).toEqual("What is the child's full name? (in welsh)");
    expect(generatedContent.line1).toEqual(
      "Enter the child's full name, as it's written on their birth certificate. Ask the adoption agency or social worker if you're not sure. (in welsh)"
    );
    expect(generatedContent.firstName).toEqual('First names (in welsh)');
    expect(generatedContent.firstNameHint).toEqual('(Include any given or middle names) (in welsh)');
    expect(generatedContent.lastName).toEqual('Last names (in welsh)');
    expect(generatedContent.lastNameHint).toEqual('(Include surname or family names) (in welsh)');
    expect((generatedContent.errors as any).childrenFirstName.required).toEqual(
      "Enter the child's first names (in welsh)"
    );
    expect((generatedContent.errors as any).childrenLastName.required).toEqual(
      "Enter the child's last names (in welsh)"
    );
  });

  test('should contain childrenFirstName field', () => {
    const childrenFirstNameField = fields.childrenFirstName as FormOptions;
    expect(childrenFirstNameField.type).toBe('text');
    expect(childrenFirstNameField.classes).toBe('govuk-label');
    expect((childrenFirstNameField.label as Function)(generatedContent)).toBe('First names');
    expect(((childrenFirstNameField as FormInput).hint as Function)(generatedContent)).toBe(
      '(Include any given or middle names)'
    );
    expect(childrenFirstNameField.labelSize).toBe(null);
    expect(childrenFirstNameField.validator).toBe(isFieldFilledIn);
  });

  test('should contain childrenLastName field', () => {
    const childrenLastNameField = fields.childrenLastName as FormOptions;
    expect(childrenLastNameField.type).toBe('text');
    expect(childrenLastNameField.classes).toBe('govuk-label');
    expect((childrenLastNameField.label as Function)(generatedContent)).toBe('Last names');
    expect(((childrenLastNameField as FormInput).hint as Function)(generatedContent)).toBe(
      '(Include surname or family names)'
    );
    expect(childrenLastNameField.labelSize).toBe(null);
    expect(childrenLastNameField.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
