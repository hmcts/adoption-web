import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, notSure } from '../../../app/form/validation';
import { mapSummaryListContent } from '../../common/functions/mapSummaryListContent';
import { CHILDREN_NATIONALITY } from '../../urls';

export const en = (): Record<string, unknown> => ({
  section: "The child's details",
  label: 'What is their nationality?',
  hint: 'Select all options that are relevant to you.',
  british: 'British',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish',
  irish: 'Irish',
  differentCountry: 'Citizen of a different country',
  childrenNationality: 'Country name',
  add: 'Add',
  another: 'Add another country',
  or: 'or',
  notSure: 'Not Sure',
  errors: {
    childrenNationality: {
      notSureViolation: "Select a nationality or 'Not sure'",
    },
    addAnotherNationality: {
      required: 'This is not a valid entry',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: "The child's details (in Welsh)",
  label: 'What is their nationality? (in Welsh)',
  hint: 'Select all options that are relevant to you. (in Welsh)',
  british: 'British (in Welsh)',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish (in Welsh)',
  irish: 'Irish (in Welsh)',
  differentCountry: 'Citizen of a different country (in Welsh)',
  childrenNationality: 'Country name (in Welsh)',
  add: 'Add (in Welsh)',
  another: 'Add another country (in Welsh)',
  or: 'or (in Welsh)',
  notSure: 'Not Sure (in Welsh)',
  errors: {
    childrenNationality: {
      notSureViolation: "Select a nationality or 'Not sure' (in Welsh)",
    },
    addAnotherNationality: {
      required: 'This is not a valid entry (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    return {
      childrenNationality: {
        type: 'checkboxes',
        label: l => l.label,
        labelSize: 'l',
        hint: l => l.hint,
        validator: value => atLeastOneFieldIsChecked(value) || notSure(value),
        values: [
          {
            name: 'childrenNationality',
            label: l => l.british,
            value: 'British',
            hint: l => l.britishSubtext,
          },
          {
            name: 'childrenNationality',
            label: l => l.irish,
            value: 'Irish',
          },
          {
            name: 'childrenNationality',
            label: l => l.differentCountry,
            value: 'Other',
            subFields: {
              ...(userCase.childrenAdditionalNationalities?.length
                ? {
                    childrenAdditionalNationalities: {
                      type: 'summarylist',
                      values: [],
                      rows: mapSummaryListContent(
                        userCase.childrenAdditionalNationalities,
                        ['Remove'],
                        CHILDREN_NATIONALITY
                      ),
                    },
                  }
                : {}),
              ...(userCase.childrenAdditionalNationalities?.length
                ? {
                    addAnotherNationalityDetails: {
                      type: 'details',
                      label: l => l.another,
                      subFields: {
                        addAnotherNationality: {
                          type: 'input',
                          classes: 'govuk-!-width-two-thirds',
                          label: l => l.childrenNationality,
                          labelSize: null,
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
                      classes: 'govuk-!-width-two-thirds',
                      label: l => l.childrenNationality,
                      labelSize: null,
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
          {
            divider: l => l.or,
          },
          {
            name: 'childrenNationality',
            label: l => l.notSure,
            value: 'Not sure',
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
