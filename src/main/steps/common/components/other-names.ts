import { Case, FieldPrefix } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { PageContent } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { doesArrayHaveValues, isFieldFilledIn } from '../../../app/form/validation';
import { mapSummaryListContent } from '../../common/functions/mapSummaryListContent';
import { APPLICANT_1_OTHER_NAMES, APPLICANT_2_OTHER_NAMES } from '../../urls';
import { CommonContent } from '../common.content';

export const en = (fieldPrefix: FieldPrefix): Record<string, unknown> => ({
  label: 'Have you ever legally been known by any other names?',
  example: 'For example, your name before marriage.',
  previousNameYes: "List each previous name separately and select 'Add'",
  yes: 'Yes',
  no: 'No',
  [`${fieldPrefix}OtherFirstNames`]: 'Add your previous first names',
  [`${fieldPrefix}OtherLastNames`]: 'Add your previous last names',
  add: 'Add',
  another: 'Add another name',
  remove: 'Remove',
  errors: {
    [`${fieldPrefix}HasOtherNames`]: {
      required: 'Please answer the question',
    },
    [`${fieldPrefix}OtherFirstNames`]: {
      required: 'Enter your first names',
    },
    [`${fieldPrefix}OtherLastNames`]: {
      required: 'Enter your last names',
    },
    addAnotherName: {
      required: 'Please answer the question',
    },
  },
});

export const cy = (fieldPrefix: FieldPrefix): Record<string, unknown> => ({
  label: 'Have you ever legally been known by any other names? (in Welsh)',
  example: 'For example, your name before marriage. (in Welsh)',
  previousNameYes: "List each previous name separately and select 'Add' (in Welsh)",
  yes: 'Yes (in Welsh)',
  no: 'No (in Welsh)',
  [`${fieldPrefix}OtherFirstNames`]: 'Add your previous first names (in Welsh)',
  [`${fieldPrefix}OtherLastNames`]: 'Add your previous last names (in Welsh)',
  add: 'Add (in Welsh)',
  another: 'Add another name (in Welsh)',
  remove: 'Remove (in Welsh)',
  errors: {
    [`${fieldPrefix}HasOtherNames`]: {
      required: 'Please answer the question (in Welsh)',
    },
    [`${fieldPrefix}OtherFirstNames`]: {
      required: 'Enter your first names (in Welsh)',
    },
    [`${fieldPrefix}OtherLastNames`]: {
      required: 'Enter your last names (in Welsh)',
    },
    addAnotherName: {
      required: 'Please answer the question (in Welsh)',
    },
  },
});

const urls = {
  [FieldPrefix.APPLICANT1]: APPLICANT_1_OTHER_NAMES,
  [FieldPrefix.APPLICANT2]: APPLICANT_2_OTHER_NAMES,
};

export const otherNamesFields = (userCase: Partial<Case>, fieldPrefix: FieldPrefix): FormFields => ({
  [`${fieldPrefix}HasOtherNames`]: {
    type: 'radios',
    classes: 'govuk-radios',
    label: l => l.label,
    hint: l => l.example,
    section: l => l.section,
    values: [
      {
        label: l => l.yes,
        value: YesOrNo.YES,
        subFields: {
          ...(userCase[`${fieldPrefix}AdditionalNames`]?.length
            ? {
                [`${fieldPrefix}AdditionalNames`]: {
                  type: 'summarylist',
                  rows: mapSummaryListContent(userCase[`${fieldPrefix}AdditionalNames`], ['Remove'], urls[fieldPrefix]),
                },
              }
            : {}),
          ...(userCase[`${fieldPrefix}AdditionalNames`]?.length
            ? {
                addAnotherName: {
                  type: 'details',
                  label: l => l.another,
                  open: !!userCase['addAnotherNameHidden'],
                  subFields: {
                    addAnotherNameHidden: {
                      type: 'hidden',
                      hidden: true,
                    },
                    previousNameYes: {
                      label: l => l.previousNameYes,
                      type: 'label',
                    },
                    [`${fieldPrefix}OtherFirstNames`]: {
                      type: 'input',
                      classes: 'govuk-!-width-two-thirds',
                      label: l => l[`${fieldPrefix}OtherFirstNames`],
                      labelSize: null,
                      validator: isFieldFilledIn,
                    },
                    [`${fieldPrefix}OtherLastNames`]: {
                      type: 'input',
                      classes: 'govuk-!-width-two-thirds',
                      label: l => l[`${fieldPrefix}OtherLastNames`],
                      labelSize: null,
                      validator: isFieldFilledIn,
                    },
                    addButton: {
                      type: 'button',
                      label: l => l.add,
                      classes: 'govuk-button--secondary',
                      value: 'addButton',
                    },
                  },
                  validator: () => doesArrayHaveValues(userCase[`${fieldPrefix}AdditionalNames`]),
                },
              }
            : {
                previousNameYes: {
                  label: l => l.previousNameYes,
                  type: 'label',
                },
                [`${fieldPrefix}OtherFirstNames`]: {
                  type: 'input',
                  classes: 'govuk-!-width-two-thirds',
                  label: l => l[`${fieldPrefix}OtherFirstNames`],
                  labelSize: null,
                  validator: isFieldFilledIn,
                },
                [`${fieldPrefix}OtherLastNames`]: {
                  type: 'input',
                  classes: 'govuk-!-width-two-thirds',
                  label: l => l[`${fieldPrefix}OtherLastNames`],
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
      { label: l => l.no, value: YesOrNo.NO },
    ],
    validator: isFieldFilledIn,
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
  form: { ...form, fields: otherNamesFields(content.userCase!, fieldPrefix) },
});
