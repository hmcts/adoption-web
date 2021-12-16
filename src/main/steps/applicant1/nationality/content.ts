import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../app/form/validation';
import { mapSummaryListContent } from '../../common/functions/mapSummaryListContent';
import { APPLICANT_1_NATIONALITY } from '../../urls';

const en = () => ({
  section: 'Primary applicant',
  title: 'What is your nationality?',
  label: 'Select all options that are relevant to you.',
  british: 'British',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish',
  irish: 'Irish',
  differentCountry: 'Citizen of a different country',
  countryName: 'Country name',
  add: 'Add',
  another: 'Add another country',
  actions: ['Remove'],
  errors: {
    nationality: {
      required: 'Select if you are British, Irish or a citizen of a different country',
    },
  },
});

const cy = () => ({
  section: 'Primary applicant (in Welsh)',
  title: 'What is your nationality? (in Welsh)',
  label: 'Select all options that are relevant to you. (in Welsh)',
  british: 'British (in Welsh)',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish (in Welsh)',
  irish: 'Irish (in Welsh)',
  differentCountry: 'Citizen of a different country (in Welsh)',
  countryName: 'Country name (in Welsh)',
  add: 'Add',
  another: 'Add another country (in Welsh)',
  actions: ['Remove (in Welsh)'],
  errors: {
    nationality: {
      required: 'Select if you are British, Irish or a citizen of a different country (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    return {
      nationality: {
        type: 'checkboxes',
        label: l => l.label,
        labelSize: 'small',
        validator: atLeastOneFieldIsChecked,
        values: [
          {
            name: 'nationality',
            label: l => l.british,
            value: 'British',
            hint: l => l.britishSubtext,
          },
          {
            name: 'nationality',
            label: l => l.irish,
            value: 'Irish',
          },
          {
            name: 'nationality',
            label: l => l.differentCountry,
            value: 'Other',
            subFields: {
              applicant1Nationalities: {
                type: 'summarylist',
                values: [],
                rows: mapSummaryListContent(
                  userCase.applicant1Nationalities || [],
                  ['Remove'],
                  APPLICANT_1_NATIONALITY
                ),
              },
              ...(userCase.applicant1Nationalities?.length
                ? {
                    addAnotherCountry: {
                      type: 'details',
                      label: l => l.another,
                      subFields: {
                        applicant1Nationality: {
                          type: 'text',
                          label: l => l.countryName,
                          labelSize: 'small',
                        },
                        addButton: {
                          type: 'button',
                          label: l => l.add,
                          classes: 'govuk-button--secondary',
                          value: 'addButton',
                        },
                      },
                    },
                  }
                : {
                    applicant1Nationality: {
                      type: 'text',
                      label: l => l.countryName,
                      labelSize: 'small',
                      validator: isFieldFilledIn,
                    },
                    addButton: {
                      type: 'button',
                      label: l => l.add,
                      classes: 'govuk-button--secondary',
                      value: 'addButton',
                    },
                  }),
            },
          },
        ],
      },
    };
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
  form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
});
