/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { FormFieldsFn, FormInput, FormOptions } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, notSure } from '../../../../app/form/validation';
import { CommonContent } from '../../common.content';
import { languageAssertions } from '../../test/languageAssertions';

import { Checkboxes } from './checkboxes';

jest.mock('../../../../app/form/validation');

const EN = 'en';
const CY = 'cy';
const FLOW = 'Flow';
const NATIONALITY = 'Nationality';
const NATIONALITIES = 'Nationalities';
const BIRTH_FATHER_NATIONALITY = '/birth-father/nationality';

const enContent = {
  section: 'Section',
  title: "What is the nationality of the child's birth father?",
  hint: 'Select all options that are relevant to you.',
  british: 'British',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish',
  irish: 'Irish',
  other: 'Citizen of a different country',
  divider: 'or',
  inputLabel: 'Country name',
  another: 'Add another country',
  errors: {
    [`${FLOW}${NATIONALITY}`]: {
      required: 'Select if they are British, Irish, citizen of a different country or not sure',
      notSureViolation: "Select a nationality or 'Not sure'",
    },
    [`addAnother${NATIONALITY}`]: {
      required: 'This is not a valid entry',
    },
  },
  continue: 'Save and continue',
  saveAsDraft: 'Save as draft',
};

const cyContent = {
  section: 'Section (in Welsh)',
  title: "What is the nationality of the child's birth father? (in Welsh)",
  hint: 'Select all options that are relevant to you. (in Welsh)',
  british: 'British (in Welsh)',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish (in Welsh)',
  irish: 'Irish (in Welsh)',
  other: 'Citizen of a different country (in Welsh)',
  divider: 'or (in Welsh)',
  inputLabel: 'Country name (in Welsh)',
  another: 'Add another country (in Welsh)',
  errors: {
    [`${FLOW}${NATIONALITY}`]: {
      required: 'Select if they are British, Irish, citizen of a different country or not sure (in Welsh)',
      notSureViolation: "Select a nationality or 'Not sure' (in Welsh)",
    },
    [`addAnother${NATIONALITY}`]: {
      required: 'This is not a valid entry (in Welsh)',
    },
  },
  continue: 'Save and continue (in Welsh)',
  saveAsDraft: 'Save as draft (in Welsh)',
};

const checkboxLabelSize = '';
const vals = [
  {
    field: 'british',
    value: 'British',
    subtext: true,
  },
  {
    field: 'irish',
    value: 'Irish',
  },
  {
    field: 'other',
    value: 'Citizen of a different country',
    includeArraySubFields: true,
  },
];
const [britishVal, irishVal, otherVal] = vals;

const includeNotSureOption = true;

const { generateForm, generateContent } = new Checkboxes(
  enContent,
  cyContent,
  FLOW,
  NATIONALITY,
  NATIONALITIES,
  checkboxLabelSize,
  vals,
  includeNotSureOption,
  BIRTH_FATHER_NATIONALITY
);
const generatedContent = generateContent({ language: EN } as CommonContent);

const checkboxesFieldName = `${FLOW}${NATIONALITY}`;
// const summaryListFieldName = `${FLOW}Additional${NATIONALITIES}`;
// const detailsFieldName = `addAnother${NATIONALITY}Details`;
// const inputFieldName = `addAnother${NATIONALITY}`;
// const buttonFieldName = 'addButton';

const test = 'test';

describe('radios class', () => {
  it('should render English content correctly', () => {
    languageAssertions(EN, enContent, generateContent);
  });

  it('should render Welsh content correctly', () => {
    languageAssertions(CY, cyContent, generateContent);
  });

  describe('form fields', () => {
    describe('happy path', () => {
      const userCase = {
        birthFatherNationality: '',
        birthFatherNationalities: ['Japan', 'China'],
      };
      const { fields } = generateForm();
      const checkboxesField = (fields as FormFieldsFn)(userCase)[checkboxesFieldName];
      const { type, label, labelSize, hint, validator, values } = checkboxesField as FormOptions;
      const [british, irish, other, divider, unsure] = values;

      it('should render the checkbox field with the correct data', () => {
        expect(type).toBe('checkboxes');
        expect((label as Function)({ label: 'label' })).toBe('label');
        expect(labelSize).toBe(checkboxLabelSize);
        expect((hint as Function)(enContent)).toBe(enContent.hint);

        (validator as Function)(['test']);

        expect(atLeastOneFieldIsChecked).toHaveBeenCalled();
        expect(notSure).toHaveBeenCalled();
      });

      it('should render the correct values within the checkboxes field', () => {
        [british, irish, other, unsure].forEach(field => {
          expect(field.name).toBe(checkboxesFieldName);
        });

        expect((british.label as Function)({ british: test })).toBe(test);
        expect(british.value).toBe(britishVal.value);
        expect((british.hint as Function)({ britishSubtext: test })).toBe(test);
        expect(british.subFields).toBe(undefined);

        expect((irish.label as Function)({ irish: test })).toBe(test);
        expect(irish.value).toBe(irishVal.value);
        expect(irish.hint).toBe(undefined);
        expect(irish.subFields).toBe(undefined);

        expect((other.label as Function)({ other: test })).toBe(test);
        expect(other.value).toBe(otherVal.value);
        expect(other.hint).toBe(undefined);

        expect((divider.divider as Function)({ divider: test })).toBe(test);
        expect(divider.label).toBe('');

        expect((unsure.label as Function)({ notSure: test })).toBe(test);
        expect(unsure.value).toBe('Not sure');
      });

      it('should correctly render subfields for other nationality', () => {
        const { subFields } = other;
        const addAnotherNationality = subFields?.['addAnotherNationality'];
        const addButton = subFields?.['addButton'];

        expect(addAnotherNationality?.type).toBe('input');
        expect(addAnotherNationality?.classes).toBe('govuk-!-width-two-thirds');
        expect((addAnotherNationality?.label as Function)({ inputLabel: test })).toBe(test);
        expect(addAnotherNationality?.labelSize).toBe(null);

        addAnotherNationality?.validator?.(test, {});
        expect(isFieldFilledIn).toHaveBeenCalled();

        expect(addButton?.type).toBe('button');
        expect((addButton?.label as Function)({ add: test })).toBe(test);
        expect(addButton?.classes).toBe('govuk-button--secondary');
        expect((addButton as FormInput)?.value).toBe('addButton');
      });
    });
  });

  it('should contain submit button', () => {
    const { submit } = generateForm();

    expect((submit.text as Function)(generatedContent)).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const { saveAsDraft } = generateForm();

    expect((saveAsDraft?.text as Function)(generatedContent)).toBe('Save as draft');
  });
});
