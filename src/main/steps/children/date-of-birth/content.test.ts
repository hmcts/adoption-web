import languageAssertions from '../../../../test/unit/utils/languageAssertions';
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
  title: "What is the child's date of birth?",
  hint: "For example, 31 3 2012. This should be on their birth certificate. Ask the adoption agency or social worker if you're not sure.",
  errors: {
    childrenDateOfBirth: {
      required: 'Enter their date of birth',
      invalidDate: 'Date of birth must be a real date',
      invalidDateOver18: 'Child is 18 or over and cannot be adopted',
      incompleteDay: 'Date of birth must include a day',
      incompleteMonth: 'Date of birth must include a month',
      incompleteYear: 'Date of birth must include a year',
      invalidDateInFuture: 'Date of birth must be in the past',
      incompleteDayAndMonth: 'Date of birth must include a day and month',
      incompleteDayAndYear: 'Date of birth must include a day and year',
      incompleteMonthAndYear: 'Date of birth must include a month and year ',
    },
  },
};

const cyContent = {
  section: 'Manylion y plentyn',
  title: 'Beth yw dyddiad geni’r plentyn?',
  hint: 'Er enghraifft, 31 3 2012. Dylai hyn fod wedi’i nodi ar eu tystysgrif geni. Holwch gyda’r asiantaeth fabwysiadu neu’r gweithiwr cymdeithasol os nad ydych yn siŵr.',
  day: '',
  month: '',
  year: '',
  errors: {
    childrenDateOfBirth: {
      required: 'Rhowch eu dyddiad geni',
      invalidDate: 'Mae’n rhaid i’r dyddiad geni fod yn ddyddiad go iawn',
      invalidDateOver18: 'Mae’r plentyn yn 18 oed neu’n hŷn ac ni ellir ei fabwysiadu',
      incompleteDay: 'Rhaid i’r dyddiad geni gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’r dyddiad geni gynnwys mis',
      incompleteYear: 'Rhaid i’r dyddiad geni gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i’ch dyddiad geni fod yn y gorffennol',
      incompleteDayAndMonth: 'Rhaid i’r dyddiad geni gynnwys diwrnod a mis',
      incompleteDayAndYear: 'Rhaid i’r dyddiad geni gynnwys diwrnod a blwyddyn',
      incompleteMonthAndYear: 'Rhaid i’r dyddiad geni gynnwys mis a blwyddyn',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > date-of-birth > content', () => {
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

  test('should contain childrenDateOfBirth field', () => {
    const childrenDateOfBirthField = fields.childrenDateOfBirth as FormOptions;
    expect(childrenDateOfBirthField.type).toBe('date');
    expect(childrenDateOfBirthField.classes).toBe('govuk-date-input');
    expect((childrenDateOfBirthField.label as Function)(generatedContent)).toBe(enContent.title);
    expect(((childrenDateOfBirthField as FormInput).hint as Function)(generatedContent)).toBe(enContent.hint);
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
