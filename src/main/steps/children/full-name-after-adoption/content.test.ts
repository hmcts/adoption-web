import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "The child's details",
  title: "What will the child's full name be after adoption?",
  line1: 'This will be on the adoption certificate so enter all their names as accurately as possible.',
  firstName: 'First names',
  firstNameHint: '(Include any given or middle names)',
  lastName: 'Last names',
  lastNameHint: '(Include surname or family names)',
  errors: {
    childrenFirstNameAfterAdoption: {
      required: 'Enter their first names',
    },
    childrenLastNameAfterAdoption: {
      required: 'Enter their last names',
    },
  },
};

const cyContent = {
  section: "The child's details (in welsh)",
  title: "What will the child's full name be after adoption? (in welsh)",
  line1: 'This will be on the adoption certificate so enter all their names as accurately as possible. (in welsh)',
  firstName: 'First names (in welsh)',
  firstNameHint: '(Include any given or middle names) (in welsh)',
  lastName: 'Last names (in welsh)',
  lastNameHint: '(Include surname or family names) (in welsh)',
  errors: {
    childrenFirstNameAfterAdoption: {
      required: 'Enter their first names (in welsh)',
    },
    childrenLastNameAfterAdoption: {
      required: 'Enter their last names (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children full-name-after-adoption content', () => {
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
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.line1).toEqual(enContent.line1);
    expect(generatedContent.firstName).toEqual(enContent.firstName);
    expect(generatedContent.firstNameHint).toEqual(enContent.firstNameHint);
    expect(generatedContent.lastName).toEqual(enContent.lastName);
    expect(generatedContent.lastNameHint).toEqual(enContent.lastNameHint);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.line1).toEqual(cyContent.line1);
    expect(generatedContent.firstName).toEqual(cyContent.firstName);
    expect(generatedContent.firstNameHint).toEqual(cyContent.firstNameHint);
    expect(generatedContent.lastName).toEqual(cyContent.lastName);
    expect(generatedContent.lastNameHint).toEqual(cyContent.lastNameHint);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain childrenFirstName field', () => {
    const field = fields.childrenFirstNameAfterAdoption as FormOptions;
    expect(field.type).toBe('text');
    expect(field.classes).toBe('govuk-label');
    expect((field.label as Function)(generatedContent)).toBe(enContent.firstName);
    expect(((field as FormInput).hint as Function)(generatedContent)).toBe(enContent.firstNameHint);
    expect(field.labelSize).toBe(null);
    expect(field.validator).toBe(isFieldFilledIn);
  });

  test('should contain childrenLastName field', () => {
    const field = fields.childrenLastNameAfterAdoption as FormOptions;
    expect(field.type).toBe('text');
    expect(field.classes).toBe('govuk-label');
    expect((field.label as Function)(generatedContent)).toBe(enContent.lastName);
    expect(((field as FormInput).hint as Function)(generatedContent)).toBe(enContent.lastNameHint);
    expect(field.labelSize).toBe(null);
    expect(field.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
