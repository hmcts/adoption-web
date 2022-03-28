import languageAssertions from '../../../../test/unit/utils/languageAssertions';
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
  section: 'Manylion y plentyn',
  title: 'Beth fydd enw llawn y plentyn ar ôl mabwysiadu?',
  line1:
    'Bydd hwn wedi’i nodi ar y dystysgrif geni, felly sicrhewch bod eu henwau wedi’u nodi mor gywir ac sy’n bosib.',
  firstName: 'Enwau cyntaf',
  firstNameHint: '((Cofiwch gynnwys unrhyw enwau bedydd neu enwau canol))',
  lastName: 'Cyfenwau',
  lastNameHint: '((Cofiwch gynnwys cyfenw neu enwau teuluol))',
  errors: {
    childrenFirstNameAfterAdoption: {
      required: 'Nac ydwdwch eu henw(au) cyntaf',
    },
    childrenLastNameAfterAdoption: {
      required: 'Nac ydwdwch eu cyfenw(au)',
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
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
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
