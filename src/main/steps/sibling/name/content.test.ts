import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Sibling details',
  title: 'Which siblings or half siblings have a court order in place?',
  line1:
    'We need details of all siblings or half siblings with a court order in place. You will be asked to complete details for each of them in turn.',
  firstName: 'First names',
  firstNameHint: '(Include any given or middle names)',
  lastName: 'Last names',
  lastNameHint: '(Include surname or family names)',
  errors: {
    siblingFirstName: {
      required: "Enter the child's first names",
    },
    siblingLastNames: {
      required: "Enter the child's last names",
    },
  },
};
const cyContent = {
  section: 'Sibling details (in Welsh)',
  title: 'Which siblings or half siblings have a court order in place? (in welsh)',
  line1:
    "Enter the child's full name, as it's written on their birth certificate. Ask the adoption agency or social worker if you're not sure. (in welsh)",
  firstName: 'First names (in welsh)',
  firstNameHint: '(Include any given or middle names) (in welsh)',
  lastName: 'Last names (in welsh)',
  lastNameHint: '(Include surname or family names) (in welsh)',
  errors: {
    siblingFirstName: {
      required: "Enter the child's first names (in welsh)",
    },
    siblingLastNames: {
      required: "Enter the child's last names (in welsh)",
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > full-name', () => {
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
    expect(generatedContent.firstName).toEqual(cyContent.firstName);
    expect(generatedContent.firstNameHint).toEqual(cyContent.firstNameHint);
    expect(generatedContent.lastName).toEqual(cyContent.lastName);
    expect(generatedContent.lastNameHint).toEqual(cyContent.lastNameHint);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain firstNames field', () => {
    const firstNamesField = fields.siblingFirstName as FormOptions;
    expect(firstNamesField.type).toBe('text');
    expect(firstNamesField.classes).toBe('govuk-label');
    expect((firstNamesField.label as Function)(generatedContent)).toBe('First names');
    expect(((firstNamesField as FormInput).hint as Function)(generatedContent)).toBe(
      '(Include any given or middle names)'
    );
    expect(firstNamesField.validator).toBe(isFieldFilledIn);
  });

  test('should contain lastNames field', () => {
    const lastNamesField = fields.siblingLastNames as FormOptions;
    expect(lastNamesField.type).toBe('text');
    expect(lastNamesField.classes).toBe('govuk-label');
    expect((lastNamesField.label as Function)(generatedContent)).toBe('Last names');
    expect(((lastNamesField as FormInput).hint as Function)(generatedContent)).toBe(
      '(Include surname or family names)'
    );
    expect(lastNamesField.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
