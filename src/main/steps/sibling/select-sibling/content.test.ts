import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';
import { form as fullNameForm } from '../../common/components/full-name';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Sibling details',
  label: 'What sibling or half-sibling do you want to add a court order for?',
  addAnotherSibling: 'Add a different sibling or half-sibling',
  errors: {
    selectedSiblingId: {
      required: 'Please answer the question',
    },
    siblingFirstName: {
      required: 'Enter their first names',
    },
    siblingLastNames: {
      required: 'Enter their last names',
    },
  },
};

const cyContent = {
  section: 'Sibling details (in Welsh)',
  label: 'What sibling or half-sibling do you want to add a court order for? (in Welsh)',
  addAnotherSibling: 'Add a different sibling or half-sibling (in Welsh)',
  errors: {
    selectedSiblingId: {
      required: 'Please answer the question (in Welsh)',
    },
    siblingFirstName: {
      required: 'Enter their first names (in Welsh)',
    },
    siblingLastNames: {
      required: 'Enter their last names (in Welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > select-sibling > content', () => {
  const fullNameFormFields = fullNameForm.fields as FormFields;
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {
      siblings: [{ siblingId: 'MOCK_ID_1', siblingFirstName: 'MOCK_FIRST_NAME1', siblingLastNames: 'MOCK_LAST_NAME1' }],
    },
  }) as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    languageAssertions('en', enContent, generateContent);
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, generateContent);
  });

  test('should contain selectedSiblingId field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.selectedSiblingId as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.label);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);

    expect(field.values[0].label).toBe('MOCK_FIRST_NAME1 MOCK_LAST_NAME1');
    expect(field.values[0].value).toBe('MOCK_ID_1');

    expect((field.values[1].label as Function)(generatedContent)).toBe(enContent.addAnotherSibling);
    expect(field.values[1].value).toBe('addAnotherSibling');
    expect(field.values[1].subFields!.siblingFirstName).toEqual(fullNameFormFields.firstNames);
    expect(field.values[1].subFields!.siblingLastNames).toEqual(fullNameFormFields.lastNames);

    expect(field.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    expect(((generatedContent.form as FormContent).submit.text as Function)(commonContent)).toBe(
      commonContent.continue
    );
  });

  test('should contain saveAsDraft button', () => {
    expect(((generatedContent.form as FormContent).saveAsDraft?.text as Function)(commonContent)).toBe(
      commonContent.saveAsDraft
    );
  });
});
/* eslint-enable @typescript-eslint/ban-types */
