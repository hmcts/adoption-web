import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, ValidationCheck } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
jest.mock('../../../app/form/validation');

const EN = 'en';
const enContent = {
  title: 'Application details',
  label: 'Court case reference number',
  hint: 'This is the 16 digit reference number that was on the email sent to you. Please insert the numbers only, without the hyphens.',
  childNameLabel: 'Child named on the application',
  childNameHint: 'Enter their name as it appears on the email sent to you.',
  childrenDateOfBirth: "Child's date of birth",
  childDateOfBirthHint: 'For example, 31 3 2012.',
  continueButton: 'Continue',
  errors: {
    kbaCaseRef: {
      required: 'Enter the 16 digit court case reference number',
      numberTooShort: 'The number entered is too short',
      isNotNumeric: 'Enter a case reference number in the correct format',
    },
    kbaChildName: {
      required: 'Enter the full name',
    },
    kbaChildrenDateOfBirth: {
      required: 'Enter their date of birth',
      invalidDate: 'Date of birth must be a real date',
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
  title: 'Manylion y cais',
  label: 'Cyfeirnod yr achos llys',
  hint: "Dyma'r cyfeirnod 16 digid oedd ar yr e-bost a anfonwyd atoch. Rhowch y rhifau yn unig, heb y cysylltnodau.",
  childNameLabel: "Plentyn wedi'i enwi ar y cais",
  childNameHint: "Rhowch ei enw fel mae'n ymddangos ar yr e-bost a anfonwyd atoch.",
  childrenDateOfBirth: 'Dyddiad geni’r plentyn',
  childDateOfBirthHint: 'Er enghraifft, 31 3 2012.',
  continueButton: 'Pharhau',
  errors: {
    kbaCaseRef: {
      required: 'Rhowch gyfeirnod 16 digid yr achos llys',
      numberTooShort: "Mae'r rhif a nodwyd yn rhy fyr",
      isNotNumeric: 'Nodwch gyfeirnod yr achos yn y fformat cywir',
    },
    kbaChildName: {
      required: 'Nodwch enw llawn',
    },
    kbaChildrenDateOfBirth: {
      required: 'Nodwch eu dyddiad geni',
      invalidDate: 'Mae’n rhaid i’r dyddiad geni fod yn ddyddiad go iawn',
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

const commonContent = { language: EN } as CommonContent;

/* eslint-disable @typescript-eslint/ban-types */
describe('la-portal > kba-case-ref > content', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  it('should have an caseRef text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const field = fields.kbaCaseRef;

    expect(field.type).toBe('text');
    expect((field.label as Function)(generateContent(commonContent))).toBe(enContent.label);
    expect((field.hint as Function)(generateContent(commonContent))).toBe(enContent.hint);
    expect(field.labelSize).toBe('m');
    expect((field.validator as ValidationCheck)('1234567891234567', {})).toBe(undefined);
  });

  it('should have an kbaChildName text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const field = fields.kbaChildName;

    expect(field.type).toBe('text');
    //expect((field.label as Function)(generateContent(commonContent))).toBe(enContent.label);
    expect((field.hint as Function)(generateContent(commonContent))).toBe(enContent.childNameHint);
    expect(field.labelSize).toBe('m');
    expect((field.validator as ValidationCheck)('1234567891234567', {})).toBe(undefined);
  });

  test('should contain dateOfBirth field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const dobField = fields.kbaChildrenDateOfBirth as FormOptions;
    const dobLabelField = fields.kbaChildrenDateOfBirthLabel as FormOptions;

    expect(dobField.type).toBe('date');
    expect(dobField.classes).toBe('govuk-date-input');
    expect((dobLabelField.label as Function)(generatedContent)).toBe(enContent.childrenDateOfBirth);
    expect((dobLabelField.hint as Function)(generatedContent)).toBe(enContent.childDateOfBirthHint);

    expect(dobField.values[0].name).toBe('day');
    expect(dobField.values[0].classes).toBe('govuk-input--width-2');
    expect(dobField.values[0].attributes?.maxLength).toBe(2);

    expect(dobField.values[1].name).toBe('month');
    expect(dobField.values[1].classes).toBe('govuk-input--width-2');
    expect(dobField.values[1].attributes?.maxLength).toBe(2);

    expect(dobField.values[2].name).toBe('year');
    expect(dobField.values[2].classes).toBe('govuk-input--width-4');
    expect(dobField.values[2].attributes?.maxLength).toBe(4);

    expect(
      (dobField.parser as Function)({
        'kbaChildrenDateOfBirth-day': '21',
        'kbaChildrenDateOfBirth-month': '12',
        'kbaChildrenDateOfBirth-year': '2018',
      })
    ).toEqual({ day: '21', month: '12', year: '2018' });
    expect((dobField.validator as Function)({ day: '21', month: '12', year: '2018' })).toBe(undefined);
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect(form.saveAsDraft?.text).toBe('');
  });
});
