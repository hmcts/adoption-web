/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';
const CY = 'cy';
const commonContent = {
  language: EN,
  dateFormat: {
    day: 'Day',
    month: 'Month',
    year: 'Year',
  },
} as CommonContent;

const enContent = {
  section: "Birth mother's details",
  title: 'When was the last date this address was confirmed?',
  errors: {
    birthMotherLastAddressDate: {
      required: 'Enter date',
      invalidDate: 'Date must be a real date',
      invalidDateInFuture: 'Date must be in the past',
      incompleteDay: 'Enter a day',
      incompleteMonth: 'Enter a month',
      incompleteYear: 'Enter a year',
      incompleteDayAndMonth: 'Enter a day and month',
      incompleteMonthAndYear: 'Enter a month and year',
      incompleteDayAndYear: 'Enter a day and year',
    },
  },
};

const cyContent = {
  section: 'Manylion y fam fiolegol',
  title: "Pryd gafodd y dyddiad diwethaf i'r cyfeiriad yma gael ei gadarnhau?",
  errors: {
    birthMotherLastAddressDate: {
      required: 'Nodwch y dyddiad',
      invalidDate: 'Rhaid i’r dyddiad fod yn ddyddiad dilys',
      invalidDateInFuture: 'Rhaid i’r dyddiad fod yn y gorffennol',
      incompleteDay: 'Nodwch ddiwrnod',
      incompleteMonth: 'Nodwch fis',
      incompleteYear: 'Nodwch flwyddyn',
      incompleteDayAndMonth: 'Nodwch ddiwrnod a blwyddyn',
      incompleteMonthAndYear: 'Nodwch fis a blwyddyn',
      incompleteDayAndYear: 'Nodwch ddiwrnod a blwyddyn',
    },
  },
};

describe('birthMotherLastAddressDate > content', () => {
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test("should return correct welsh content for cannot adopt page because they're 18 or over", () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: CY }));
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;

    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;

    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: EN }))).toBe('Save as draft');
  });

  test('should contain dateOfBirth field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const dobField = fields.birthMotherLastAddressDate as FormOptions;

    expect(dobField.type).toBe('date');
    expect(dobField.classes).toBe('govuk-date-input');
    expect((dobField.label as Function)(generatedContent)).toBe(enContent.title);
    expect(dobField.labelHidden).toBe(true);

    expect((dobField.values[0].label as Function)(commonContent)).toBe('Day');
    expect(dobField.values[0].name).toBe('day');
    expect(dobField.values[0].classes).toBe('govuk-input--width-2');
    expect(dobField.values[0].attributes?.maxLength).toBe(2);

    expect((dobField.values[1].label as Function)(commonContent)).toBe('Month');
    expect(dobField.values[1].name).toBe('month');
    expect(dobField.values[1].classes).toBe('govuk-input--width-2');
    expect(dobField.values[1].attributes?.maxLength).toBe(2);

    expect((dobField.values[2].label as Function)(commonContent)).toBe('Year');
    expect(dobField.values[2].name).toBe('year');
    expect(dobField.values[2].classes).toBe('govuk-input--width-4');
    expect(dobField.values[2].attributes?.maxLength).toBe(4);

    expect(
      (dobField.parser as Function)({
        'birthMotherLastAddressDate-day': '21',
        'birthMotherLastAddressDate-month': '12',
        'birthMotherLastAddressDate-year': '2018',
      })
    ).toEqual({ day: '21', month: '12', year: '2018' });
    expect((dobField.validator as Function)({ day: '21', month: '12', year: '2018' })).toBe(undefined);
  });

  it('should have date label when language: en and  applyingWith: alone', () => {
    const commonContent1 = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe("Birth mother's details");
  });

  it('should have an date label when language: cy and  applyingWith: alone', () => {
    const commonContent1 = { language: 'cy', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe('Manylion y fam fiolegol');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
