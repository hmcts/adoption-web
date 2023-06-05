import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isChildrenNameValid } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "The child's details",
  title: "What is the child's full name?",
  line1:
    "Enter the child's full name, as it's written on their birth certificate. Ask the adoption agency or social worker if you're not sure.",
  firstName: 'First names',
  firstNameHint: '(Include any given or middle names)',
  lastName: 'Last names',
  lastNameHint: '(Include surname or family names)',
  errors: {
    childrenFirstName: {
      required: "Enter the child's first names",
      isValidChildName: "Enter valid child's first name",
    },
    childrenLastName: {
      required: "Enter the child's last names",
      isValidChildName: "Enter valid child's last name",
    },
  },
};

const cyContent = {
  section: 'Manylion y plentyn',
  title: 'Beth yw enw llawn y plentyn?',
  line1:
    'Nac ydwdwch enw llawn y plentyn, fel y mae wedi’i ysgrifennu ar eu tystysgrif geni. Gofynnwch i’r asiantaeth fabwysiadu neu’ch gweithiwr cymdeithasol os nad ydych yn siŵr.',
  firstName: 'Enwau cyntaf',
  firstNameHint: '(Cofiwch gynnwys unrhyw enwau bedydd neu enwau canol)',
  lastName: 'Cyfenwau',
  lastNameHint: '(Cofiwch gynnwys cyfenw neu enwau teuluol)',
  errors: {
    childrenFirstName: {
      required: 'Nac ydwdwch enw(au) cyntaf y plentyn',
      isValidChildName: 'Rhowch enw cyntaf plentyn dilys',
    },
    childrenLastName: {
      required: 'Nac ydwdwch gyfenw(au)’r plentyn',
      isValidChildName: 'Rhowch enw olaf plentyn dilys',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > full-name > content', () => {
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

  test('should contain childrenFirstName field', () => {
    const childrenFirstNameField = fields.childrenFirstName as FormOptions;
    expect(childrenFirstNameField.type).toBe('text');
    expect(childrenFirstNameField.classes).toBe('govuk-label');
    expect((childrenFirstNameField.label as Function)(generatedContent)).toBe(enContent.firstName);
    expect(((childrenFirstNameField as FormInput).hint as Function)(generatedContent)).toBe(enContent.firstNameHint);
    expect(childrenFirstNameField.labelSize).toBe(null);
    expect(childrenFirstNameField.validator).toBe(isChildrenNameValid);
  });

  test('should contain childrenLastName field', () => {
    const childrenLastNameField = fields.childrenLastName as FormOptions;
    expect(childrenLastNameField.type).toBe('text');
    expect(childrenLastNameField.classes).toBe('govuk-label');
    expect((childrenLastNameField.label as Function)(generatedContent)).toBe(enContent.lastName);
    expect(((childrenLastNameField as FormInput).hint as Function)(generatedContent)).toBe(enContent.lastNameHint);
    expect(childrenLastNameField.labelSize).toBe(null);
    expect(childrenLastNameField.validator).toBe(isChildrenNameValid);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
