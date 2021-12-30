import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFutureDate,
  isMoreThan18Years,
} from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "The child's details",
  label: "What is the child's date of birth?",
  hint: "For example, 31 3 2012. This should be on their birth certificate. Ask the adoption agency or social worker if you're not sure.",
  errors: {
    childrenDateOfBirth: {
      required: 'Enter their date of birth',
      incompleteDay: 'Date of birth must include a day',
      incompleteMonth: 'Date of birth must include a month',
      incompleteYear: 'Date of birth must include a year',
      invalidDate: 'Date of birth must be a real date',
      invalidDateInFuture: 'Date of birth must be in the past',
      invalidDateOver18: 'Child is 18 or over and cannot be adopted',
    },
  },
};

const cyContent = {
  section: "The child's details (in welsh)",
  label: "What is the child's date of birth? (in welsh)",
  hint: "For example, 31 3 2012. This should be on their birth certificate. Ask the adoption agency or social worker if you're not sure. (in welsh)",
  errors: {
    childrenDateOfBirth: {
      required: 'Enter their date of birth (in welsh)',
      incompleteDay: 'Date of birth must include a day (in welsh)',
      incompleteMonth: 'Date of birth must include a month (in welsh)',
      incompleteYear: 'Date of birth must include a year (in welsh)',
      invalidDate: 'Date of birth must be a real date (in welsh)',
      invalidDateInFuture: 'Date of birth must be in the past (in welsh)',
      invalidDateOver18: 'Child is 18 or over and cannot be adopted (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children date-of-birth content', () => {
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
    expect(generatedContent.label).toEqual(enContent.label);
    expect(generatedContent.hint).toEqual(enContent.hint);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.label).toEqual(cyContent.label);
    expect(generatedContent.hint).toEqual(cyContent.hint);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain childrenDateOfBirth field', () => {
    const childrenDateOfBirthField = fields.childrenDateOfBirth as FormOptions;
    expect(childrenDateOfBirthField.type).toBe('date');
    expect(childrenDateOfBirthField.classes).toBe('govuk-date-input');
    expect((childrenDateOfBirthField.label as Function)(generatedContent)).toBe("What is the child's date of birth?");
    expect(((childrenDateOfBirthField as FormInput).hint as Function)(generatedContent)).toBe(
      "For example, 31 3 2012. This should be on their birth certificate. Ask the adoption agency or social worker if you're not sure."
    );
    expect(childrenDateOfBirthField.labelSize).toBe('l');
    expect(childrenDateOfBirthField.attributes?.spellcheck).toBe(false);

    expect(
      childrenDateOfBirthField.parser!({
        'childrenDateOfBirth-day': '12',
        'childrenDateOfBirth-month': '10',
        'childrenDateOfBirth-year': '2015',
      })
    ).toEqual({ day: '12', month: '10', year: '2015' });

    childrenDateOfBirthField.validator!({ day: '12', month: '10', year: '2015' }, {});
    expect(areDateFieldsFilledIn).toHaveBeenCalledWith({ day: '12', month: '10', year: '2015' });
    expect(isDateInputInvalid).toHaveBeenCalledWith({ day: '12', month: '10', year: '2015' });
    expect(isFutureDate).toHaveBeenCalledWith({ day: '12', month: '10', year: '2015' });
    expect(isMoreThan18Years).toHaveBeenCalledWith({ day: '12', month: '10', year: '2015' });

    const values = childrenDateOfBirthField.values;
    expect((values[0].label as Function)({ dateFormat: { day: 'Day' } })).toBe('Day');
    expect(values[0].name).toBe('day');
    expect(values[0].classes).toBe('govuk-input--width-2');
    expect(values[0].attributes).toEqual({ maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' });

    expect((values[1].label as Function)({ dateFormat: { month: 'Month' } })).toBe('Month');
    expect(values[1].name).toBe('month');
    expect(values[1].classes).toBe('govuk-input--width-2');
    expect(values[1].attributes).toEqual({ maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' });

    expect((values[2].label as Function)({ dateFormat: { year: 'Year' } })).toBe('Year');
    expect(values[2].name).toBe('year');
    expect(values[2].classes).toBe('govuk-input--width-4');
    expect(values[2].attributes).toEqual({ maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' });
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
