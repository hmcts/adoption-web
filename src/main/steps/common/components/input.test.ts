/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../common.content';
import { languageAssertions } from '../test/languageAssertions';

import { Input } from './input';

jest.mock('../../../app/form/validation');

const fieldName = 'fieldName';
const validator = isFieldFilledIn;
const labelSize = 'm';
const EN = 'en';
const CY = 'cy';

const enContent = {
  section: 'Section',
  title: 'Title',
  label: 'Label',
  hint: 'Hint',
  errors: {
    [fieldName]: {
      required: 'Required',
    },
  },
  continue: 'Save and continue',
  saveAsDraft: 'Save as draft',
};

const cyContent = {
  section: 'Section (in Welsh)',
  title: 'Title (in Welsh)',
  label: 'Label (in Welsh)',
  hint: 'Hint (in Welsh)',
  errors: {
    [fieldName]: {
      required: 'Required (in Welsh)',
    },
  },
  continue: 'Save and continue (in Welsh)',
  saveAsDraft: 'Save as draft (in Welsh)',
};

const { generateForm, generateContent } = new Input(enContent, cyContent, fieldName, validator, labelSize);
const commonContent = { language: EN } as CommonContent;

describe('input class', () => {
  it('should render English content correctly', () => {
    languageAssertions(EN, enContent, generateContent);
  });

  it('should render Welsh content correctly', () => {
    languageAssertions(CY, cyContent, generateContent);
  });

  it('should render the input field with the correct data', () => {
    const { fields } = generateForm();
    const field = fields[fieldName];
    const fieldInputValue = 'test';
    const { label, hint } = enContent;

    expect(field.type).toBe('input');
    expect((field.label as Function)(generateContent(commonContent))).toBe(label);
    expect((field.hint as Function)(generateContent(commonContent))).toBe(hint);
    expect(field.labelSize).toBe(labelSize);

    (field.validator as Function)(fieldInputValue);
    expect(isFieldFilledIn).toHaveBeenCalledWith(fieldInputValue);
  });

  it('should contain submit button', () => {
    const { submit } = generateForm();

    expect((submit.text as Function)(generateContent(commonContent))).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const { saveAsDraft } = generateForm();

    expect((saveAsDraft?.text as Function)(generateContent(commonContent))).toBe('Save as draft');
  });
});
