import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';
import { form as fullNameForm } from '../../common/components/full-name';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "Other parent's details",
  title: 'What is the full name of the other person with parental responsibility?',
  line1: 'If you are not sure, ask your social worker or adoption agency for help.',
  errors: {
    otherPersonFirstNames: {
      required: 'Enter their first names',
    },
    otherPersonLastNames: {
      required: 'Enter their last names',
    },
  },
};

const cyContent = {
  section: "Other parent's details (in Welsh)",
  title: 'What is the full name of the other person with parental responsibility? (in Welsh)',
  line1: 'If you are not sure, ask your social worker or adoption agency for help. (in Welsh)',
  errors: {
    otherPersonFirstNames: {
      required: 'Enter their first names (in Welsh)',
    },
    otherPersonLastNames: {
      required: 'Enter their last names (in Welsh)',
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

  test('should return correct Welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.line1).toEqual(cyContent.line1);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain firstNames field', () => {
    const firstNamesField = fields.otherPersonFirstNames as FormOptions;
    expect(firstNamesField).toEqual(fullNameFormFields.firstNames);
  });

  test('should contain lastNames field', () => {
    const lastNamesField = fields.otherPersonLastNames as FormOptions;
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
