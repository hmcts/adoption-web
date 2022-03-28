import languageAssertions from '../../../../test/unit/utils/languageAssertions';
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
  section: 'Manylion y brawd/chwaer',
  title: 'Pa frodyr/chwiorydd neu hanner brodyr/hanner chwiorydd sydd â gorchymyn llys mewn lle?',
  line1:
    'Mae arnom angen manylion yr holl frodyr/chwiorydd neu’r hanner brodyr/hanner chwiorydd sydd â gorchymyn llys mewn lle. Gofynnir ichi lenwi’r manylion i bob un ohonynt fesul un.',
  firstName: 'Enwau cyntaf',
  firstNameHint: '(Cofiwch gynnwys unrhyw enwau bedydd neu enwau canol)',
  lastName: 'Cyfenwau',
  lastNameHint: '(Cofiwch gynnwys cyfenw neu enwau teuluol)',
  errors: {
    siblingFirstName: {
      required: 'Nac ydwdwch enw(au) cyntaf y plentyn',
    },
    siblingLastNames: {
      required: 'Nac ydwdwch gyfenw(au)’r plentyn',
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
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
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
