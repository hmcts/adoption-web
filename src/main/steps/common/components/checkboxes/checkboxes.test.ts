/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
// import { FormFieldsFn } from '../../../../app/form/Form';
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
  or: 'or',
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
  or: 'or (in Welsh)',
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

// const checkBoxFieldName = `${FLOW}${NATIONALITY}`;
// const summaryListFieldName = `${FLOW}Additional${NATIONALITIES}`;
// const detailsFieldName = `addAnother${NATIONALITY}Details`;
// const inputFieldName = `addAnother${NATIONALITY}`;
// const buttonFieldName = 'addButton';

describe('radios class', () => {
  it('should render English content correctly', () => {
    languageAssertions(EN, enContent, generateContent);
  });

  it('should render Welsh content correctly', () => {
    languageAssertions(CY, cyContent, generateContent);
  });

  // describe('form fields', () => {
  //   describe('happy path', () => {
  //     const userCase = {
  //       birthFatherNationality: '',
  //       birthFatherNationalities: ['Japan', 'China'],
  //     };
  //     const { fields } = generateForm();
  //     const checkboxesField = (fields as FormFieldsFn)(userCase)[checkBoxFieldName];
  //     const { type, label, labelSize, hint, validator, values } = checkboxesField;
  //     const [british, irish, other, divider, unsure] = values;

  //     it('should render the checkbox field with the correct data', () => {
  //       expect(type).toBe('checkboxes');
  //       expect((label as Function)({ label: 'label' })).toBe('label');
  //       expect(labelSize).toBe(checkboxLabelSize);
  //       expect((hint as Function)(enContent)).toBe(enContent.hint);
  //       (validator as Function)('');
  //     });
  //   });
  // });

  it('should contain submit button', () => {
    const { submit } = generateForm();

    expect((submit.text as Function)(generatedContent)).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const { saveAsDraft } = generateForm();

    expect((saveAsDraft?.text as Function)(generatedContent)).toBe('Save as draft');
  });
});
