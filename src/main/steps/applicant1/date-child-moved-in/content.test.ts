import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CaseDate } from '../../../app/case/case';
import {
  FormContent,
  FormFields,
  FormInput,
  FormOptions,
  LanguageLookup,
  ValidationCheck,
} from '../../../app/form/Form';
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
  section: 'Application details',
  title: 'When did the child move in with you?',
  hint: 'Enter the date when they started living with you continuously. For example, 31 3 2020.',
  warning:
    'You can begin your application at any time, but you can only submit 10 weeks after the date the child started living continuously with you.',
  errors: {
    dateChildMovedIn: {
      required: 'Enter the date the child moved in with you',
      invalidDate: 'Must be a real date',
      invalidDateInFuture: 'Date must be in the past',
      incompleteDay: 'Enter the day the child moved in with you',
      incompleteMonth: 'Enter the month the child moved in with you',
      incompleteYear: 'Enter the year the child moved in with you',
      incompleteDayAndMonth: 'Enter the Day and month the child moved in with you',
      incompleteMonthAndYear: 'Enter the month and year the child moved in with you',
      incompleteDayAndYear: 'Enter the Day and year the child moved in with you',
    },
  },
};

const cyContent = {
  section: 'Manylion y cais',
  title: 'Pryd wnaeth y plentyn symud i fyw gyda chi?',
  hint: 'Nodwch y dyddiad wnaethon nhw ddechrau byw gyda chi yn barhaus. Er enghraifft, 31 3 2020.',
  warning:
    'Gallwch gychwyn eich cais unrhyw dro, ond gallwch ond cyflwyno’ch cais 10 wythnos ar ôl y dyddiad wnaeth y plentyn ddechrau byw gyda chi’n barhaus. ',
  errors: {
    dateChildMovedIn: {
      required: 'Rhowch y dyddiad y daeth y plentyn i fyw atoch',
      invalidDate: 'Rhaid iddo fod yn ddyddiad go iawn',
      invalidDateInFuture: 'Rhaid i’r dyddiad fod yn y gorffennol',
      incompleteDay: 'Nodwch y diwrnod y symudodd y plentyn i fyw gyda chi.',
      incompleteMonth: 'Nodwch y mis y symudodd y plentyn i fyw gyda chi.',
      incompleteYear: 'Nodwch y flwyddyn y symudodd y plentyn i fyw gyda chi.',
      incompleteDayAndMonth: 'Nodwch y diwrnod a’r mis y symudodd y plentyn i fyw gyda chi.',
      incompleteMonthAndYear: 'Nodwch y mis a’r flwyddyn y symudodd y plentyn i fyw gyda chi.',
      incompleteDayAndYear: 'Nodwch y diwrnod a’r flwyddyn y symudodd y plentyn i fyw gyda chi.',
    },
  },
};

describe('applicant1 > date-child-moved-in > content', () => {
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content for page', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: CY }));
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;

    expect((form.submit.text as LanguageLookup)(generatePageContent({ language: EN }) as Record<string, never>)).toBe(
      'Save and continue'
    );
  });

  test('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;

    expect(
      (form.saveAsDraft?.text as LanguageLookup)(generatePageContent({ language: EN }) as Record<string, never>)
    ).toBe('Save as draft');
  });

  test('should contain dateChildMovedIn field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const dateChildMovedIn = fields.dateChildMovedIn as FormOptions;

    expect(dateChildMovedIn.type).toBe('date');
    expect(dateChildMovedIn.classes).toBe('govuk-date-input');
    expect((dateChildMovedIn.label as LanguageLookup)(generatedContent)).toBe(enContent.title);
    expect(dateChildMovedIn.labelHidden).toBe(true);
    expect((dateChildMovedIn.hint as LanguageLookup)(generatedContent)).toBe(enContent.hint);
    expect(((dateChildMovedIn as FormInput).warning as LanguageLookup)(generatedContent)).toBe(enContent.warning);

    expect(
      (dateChildMovedIn.values[0].label as LanguageLookup)(commonContent as unknown as Record<string, never>)
    ).toBe('Day');
    expect(dateChildMovedIn.values[0].name).toBe('day');
    expect(dateChildMovedIn.values[0].classes).toBe('govuk-input--width-2');
    expect(dateChildMovedIn.values[0].attributes?.maxLength).toBe(2);

    expect(
      (dateChildMovedIn.values[1].label as LanguageLookup)(commonContent as unknown as Record<string, never>)
    ).toBe('Month');
    expect(dateChildMovedIn.values[1].name).toBe('month');
    expect(dateChildMovedIn.values[1].classes).toBe('govuk-input--width-2');
    expect(dateChildMovedIn.values[1].attributes?.maxLength).toBe(2);

    expect(
      (dateChildMovedIn.values[2].label as LanguageLookup)(commonContent as unknown as Record<string, never>)
    ).toBe('Year');
    expect(dateChildMovedIn.values[2].name).toBe('year');
    expect(dateChildMovedIn.values[2].classes).toBe('govuk-input--width-4');
    expect(dateChildMovedIn.values[2].attributes?.maxLength).toBe(4);

    expect(
      (dateChildMovedIn.parser as ValidationCheck)(
        {
          'dateChildMovedIn-day': '21',
          'dateChildMovedIn-month': '12',
          'dateChildMovedIn-year': '2018',
        } as unknown as CaseDate,
        {}
      )
    ).toEqual({ day: '21', month: '12', year: '2018' });
    expect((dateChildMovedIn.validator as ValidationCheck)({ day: '21', month: '12', year: '2018' }, {})).toBe(
      undefined
    );
  });
});
