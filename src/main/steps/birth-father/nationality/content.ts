import { Checkboxes } from '../../../steps/common/components/checkboxes/checkboxes';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const flow = 'birthFather';
const dataTypeSingular = 'Nationality';
const dataTypePlural = 'Nationalities';

const en = {
  section: SECTION,
  title: "What is the nationality of the child's birth father?",
  hint: 'Select all options that are relevant to you.',
  british: 'British',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish',
  irish: 'Irish',
  other: 'Citizen of a different country',
  or: 'or',
  errors: {
    [`${flow}${dataTypeSingular}`]: {
      required: 'Select if they are British, Irish, citizen of a different country or not sure',
      notSureViolation: "Select a nationality or 'Not sure'",
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
  or: 'or (in Welsh)',
  errors: {
    [`${flow}${dataTypeSingular}`]: {
      required: 'Select if they are British, Irish, citizen of a different country or not sure (in Welsh)',
      notSureViolation: "Select a nationality or 'Not sure' (in Welsh)",
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
  },
];

const includeNotSureOption = true;

export const { form, generateContent } = new Checkboxes(
  en,
  cy,
  flow,
  dataTypeSingular,
  dataTypePlural,
  checkboxLabelSize,
  values,
  includeNotSureOption
);
