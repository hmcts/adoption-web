import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../app/form/validation';
import { mapSummaryListContent } from '../../common/functions/mapSummaryListContent';
import { APPLICANT_2_NATIONALITY } from '../../urls';

export const en = (): Record<string, unknown> => ({
  section: 'Second applicant',
  title: 'What is your nationality?',
  label: 'Select all options that are relevant to you.',
  british: 'British',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish',
  irish: 'Irish',
  differentCountry: 'Citizen of a different country',
  applicant2Nationality: 'Country name',
  add: 'Add',
  another: 'Add another country',
  errors: {
    applicant2Nationality: {
      required: 'Select if you are British, Irish or a citizen of a different country',
    },
    addAnotherNationality: {
      required: 'This is not a valid entry',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: 'Second applicant (in Welsh)',
  title: 'What is your nationality? (in Welsh)',
  label: 'Select all options that are relevant to you. (in Welsh)',
  british: 'British (in Welsh)',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish (in Welsh)',
  irish: 'Irish (in Welsh)',
  differentCountry: 'Citizen of a different country (in Welsh)',
  applicant2Nationality: 'Country name (in Welsh)',
  add: 'Add',
  another: 'Add another country (in Welsh)',
  errors: {
    applicant2Nationality: {
      required: 'Select if you are British, Irish or a citizen of a different country (in Welsh)',
    },
    addAnotherNationality: {
      required: 'This is not a valid entry (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    return {
      applicant2Nationality: {
        type: 'checkboxes',
        label: l => l.label,
        labelSize: 's',
        validator: atLeastOneFieldIsChecked,
        values: [
          {
            name: 'applicant2Nationality',
            label: l => l.british,
            value: 'British',
            hint: l => l.britishSubtext,
          },
          {
            name: 'applicant2Nationality',
            label: l => l.irish,
            value: 'Irish',
          },
          {
            name: 'applicant2Nationality',
            label: l => l.differentCountry,
            value: 'Other',
            subFields: {
              applicant2AdditionalNationalities: {
                type: 'summarylist',
                values: [],
                rows: mapSummaryListContent(
                  userCase.applicant2AdditionalNationalities || [],
                  ['Remove'],
                  APPLICANT_2_NATIONALITY
                ),
              },
              ...(userCase.applicant2AdditionalNationalities?.length
                ? {
                    addAnotherNationalityDetails: {
                      type: 'details',
                      label: l => l.another,
                      subFields: {
                        addAnotherNationality: {
                          type: 'input',
                          label: l => l.applicant2Nationality,
                          labelSize: 's',
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
                    addAnotherNationality: {
                      type: 'input',
                      label: l => l.applicant2Nationality,
                      labelSize: 's',
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
