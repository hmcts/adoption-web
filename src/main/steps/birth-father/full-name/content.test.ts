import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';
import { form as fullNameForm } from '../../common/components/full-name';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "Birth father's details",
  title: "What is the full name of the child's birth father?",
  line1:
    "This will be on the child's full birth certificate. Ask the adoption agency or social worker if you're not sure.",
  errors: {
    birthFatherFirstNames: {
      required: 'Enter their first names',
    },
    birthFatherLastNames: {
      required: 'Enter their last names',
    },
  },
};

const cyContent = {
  section: "Birth father's details (in welsh)",
  title: "What is the full name of the child's birth father? (in welsh)",
  line1:
    "This will be on the child's full birth certificate. Ask the adoption agency or social worker if you're not sure. (in welsh)",
  errors: {
    birthFatherFirstNames: {
      required: 'Enter their first names (in welsh)',
    },
    birthFatherLastNames: {
      required: 'Enter their last names (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('common > components > full-name', () => {
  const fullNameFormFields = fullNameForm.fields as FormFields;
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
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.line1).toEqual(cyContent.line1);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain firstNames field', () => {
    const firstNamesField = fields.birthFatherFirstNames as FormOptions;
    expect(firstNamesField).toEqual(fullNameFormFields.firstNames);
  });

  test('should contain lastNames field', () => {
    const lastNamesField = fields.birthFatherLastNames as FormOptions;
    expect(lastNamesField).toEqual(fullNameFormFields.lastNames);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
