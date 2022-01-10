import { Checkboxes } from '../../../steps/common/components/checkboxes/checkboxes';
import { BIRTH_FATHER_NATIONALITY } from '../../../steps/urls';
import { FLOW, NATIONALITIES, NATIONALITY, SECTION, SECTION_IN_WELSH } from '../constants';

const en = {
  section: SECTION,
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
};

const cy = {
  section: SECTION_IN_WELSH,
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
};

const checkboxLabelSize = '';
const values = [
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

export const { form, generateContent } = new Checkboxes(
  en,
  cy,
  FLOW,
  NATIONALITY,
  NATIONALITIES,
  checkboxLabelSize,
  values,
  includeNotSureOption,
  BIRTH_FATHER_NATIONALITY
);
