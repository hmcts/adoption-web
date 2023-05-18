import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';
import { form as fullNameForm } from '../../common/components/full-name';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "Other person's details",
  title: 'What is the full name of the other person with parental responsibility?',
  errors: {
    otherParentFirstNames: {
      required: 'Enter their first names',
    },
    otherParentLastNames: {
      required: 'Enter their last names',
    },
  },
};

const cyContent = {
  section: 'Manylion person arall',
  title: 'Beth yw enw llawn yr unigolyn arall sydd â chyfrifoldeb rhiant?',
  errors: {
    otherParentFirstNames: {
      required: 'Nac ydwdwch eu henw(au) cyntaf',
    },
    otherParentLastNames: {
      required: 'Nac ydwdwch eu cyfenw(au)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('other-parent > full-name > content', () => {
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
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain firstNames field', () => {
    const firstNamesField = fields.otherParentFirstNames as FormOptions;
    expect(firstNamesField).toEqual(fullNameFormFields.firstNames);
  });

  test('should contain lastNames field', () => {
    const lastNamesField = fields.otherParentLastNames as FormOptions;
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
