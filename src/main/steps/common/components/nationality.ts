import { Case, FieldPrefix } from '../../../app/case/case';
import { PageContent } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../app/form/validation';
import { APPLICANT_1_NATIONALITY, APPLICANT_2_NATIONALITY } from '../../urls';
import { CommonContent } from '../common.content';
import { mapSummaryListContent } from '../functions/mapSummaryListContent';

export const en = (fieldPrefix: FieldPrefix): Record<string, unknown> => ({
  label: 'What is your nationality?',
  hint: 'Select all options that are relevant to you.',
  british: 'British',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish',
  irish: 'Irish',
  differentCountry: 'Citizen of a different country',
  countryName: 'Country name',
  add: 'Add',
  another: 'Add another country',
  errors: {
    [`${fieldPrefix}Nationality`]: {
      required: 'Select if you are British, Irish or a citizen of a different country',
    },
    addAnotherNationality: {
      required: 'This is not a valid entry',
    },
  },
});

export const cy = (fieldPrefix: FieldPrefix): Record<string, unknown> => ({
  label: 'What is your nationality? (in Welsh)',
  hint: 'Select all options that are relevant to you. (in Welsh)',
  british: 'British (in Welsh)',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish (in Welsh)',
  irish: 'Irish (in Welsh)',
  differentCountry: 'Citizen of a different country (in Welsh)',
  [`${fieldPrefix}Nationality`]: 'Country name (in Welsh)',
  add: 'Add (in Welsh)',
  another: 'Add another country (in Welsh)',
  errors: {
    [`${fieldPrefix}Nationality`]: {
      required: 'Select if you are British, Irish or a citizen of a different country (in Welsh)',
    },
    addAnotherNationality: {
      required: 'This is not a valid entry (in Welsh)',
    },
  },
});

const urls = {
  [FieldPrefix.APPLICANT1]: APPLICANT_1_NATIONALITY,
  [FieldPrefix.APPLICANT2]: APPLICANT_2_NATIONALITY,
};

export const nationalityFields = (userCase: Partial<Case>, fieldPrefix: FieldPrefix): FormFields => ({
  [`${fieldPrefix}Nationality`]: {
    type: 'checkboxes',
    label: l => l.label,
    labelSize: 'l',
    hint: l => l.hint,
    validator: atLeastOneFieldIsChecked,
    values: [
      {
        name: `${fieldPrefix}Nationality`,
        label: l => l.british,
        value: 'British',
        hint: l => l.britishSubtext,
      },
      {
        name: `${fieldPrefix}Nationality`,
        label: l => l.irish,
        value: 'Irish',
      },
      {
        name: `${fieldPrefix}Nationality`,
        label: l => l.differentCountry,
        value: 'Other',
        subFields: {
          ...(userCase[`${fieldPrefix}AdditionalNationalities`]?.length
            ? {
                [`${fieldPrefix}AdditionalNationalities`]: {
                  type: 'summarylist',
                  values: [],
                  rows: mapSummaryListContent(
                    userCase[`${fieldPrefix}AdditionalNationalities`]!,
                    ['Remove'],
                    urls[fieldPrefix] || '#'
                  ),
                },
              }
            : {}),
          ...(userCase[`${fieldPrefix}AdditionalNationalities`]?.length
            ? {
                addAnotherNationalityDetails: {
                  type: 'details',
                  label: l => l.another,
                  subFields: {
                    addAnotherNationality: {
                      type: 'input',
                      classes: 'govuk-!-width-two-thirds',
                      label: l => l.countryName,
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
                  label: l => l.countryName,
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
    ],
  },
});

export const form: FormContent = {
  fields: {},
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

export const generateContent = (content: CommonContent, fieldPrefix: FieldPrefix): PageContent => ({
  ...languages[content.language](fieldPrefix),
  form: { ...form, fields: nationalityFields(content.userCase!, fieldPrefix) },
});
