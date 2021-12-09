import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  section: 'Primary applicant',
  title: 'What is your nationality?',
  label: 'Select all options that are relevant to you.',
  british: 'British',
  irish: 'Irish',
  differentCountry: 'Citizen of a different country',
  errors: {
    nationality: {
      required: 'Enter a name or choose no',
    },
  },
});

const cy = () => ({
  section: 'Primary applicant (in Welsh)',
  title: 'What is your nationality? (in Welsh)',
  label: 'Select all options that are relevant to you. (in Welsh)',
  british: 'British (in Welsh)',
  irish: 'Irish (in Welsh)',
  differentCountry: 'Citizen of a different country (in Welsh)',
  errors: {
    nationality: {
      required: 'Enter a name or choose no (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    nationality: {
      type: 'checkboxes',
      label: l => l.label,
      labelSize: 'small',
      values: [
        {
          label: l => l.british,
          value: 'British',
          hint: 'this should be below British',
        },
        {
          label: l => l.irish,
          value: 'Irish',
        },
        {
          label: l => l.differentCountry,
          value: 'Other',
        },
      ],
    },
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: l => l.saveAsDraft,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => ({
  ...languages[content.language](),
  form,
});
