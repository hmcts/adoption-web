import { Case, FieldPrefix } from '../../../app/case/case';
import { LanguagePreference, YesOrNo } from '../../../app/case/definition';
import { PageContent } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { doesArrayHaveValues, isFieldFilledIn } from '../../../app/form/validation';
import { mapSummaryListContent } from '../../common/functions/mapSummaryListContent';
import { APPLICANT_1_OTHER_NAMES, APPLICANT_2_OTHER_NAMES } from '../../urls';
import { CommonContent } from '../common.content';

const en = (fieldPrefix: FieldPrefix) => ({
  label: 'Have you ever legally been known by any other names?',
  example: 'For example, your name before marriage.',
  previousNameYes: "List each previous name separately and select 'Add'",
  yes: 'Yes',
  no: 'No',
  [`${fieldPrefix}OtherFirstNames`]: 'Add your previous first names',
  [`${fieldPrefix}OtherLastNames`]: 'Add your previous last names',
  add: 'Add',
  cancel: 'Cancel',
  another: 'Add another name',
  remove: 'Remove',
  errors: {
    [`${fieldPrefix}HasOtherNames`]: {
      required: 'Please answer the question',
      addButtonNotClicked: "Select 'Add' to save your previous names",
    },
    [`${fieldPrefix}OtherFirstNames`]: {
      required: 'Enter your previous first names',
    },
    [`${fieldPrefix}OtherLastNames`]: {
      required: 'Enter your previous last names',
    },
    addAnotherName: {
      required: 'Please answer the question',
    },
  },
});

const cy: typeof en = (fieldPrefix: FieldPrefix) => ({
  label: 'A ydych erioed wedi’ch adnabod yn gyfreithiol dan unrhyw enwau eraill?',
  example: 'Er enghraifft, eich enw cyn ichi briodi.',
  previousNameYes: 'Rhestrwch bob enw blaenorol ar wahân a dewiswch ‘Ychwanegu’',
  yes: 'Ydw',
  no: 'Nac ydw',
  [`${fieldPrefix}OtherFirstNames`]: 'Ychwanegwch eich enw(au) cyntaf blaenorol',
  [`${fieldPrefix}OtherLastNames`]: 'Ychwanegwch eich cyfenw(au) blaenorol',
  cancel: 'Cancel',
  add: 'Ychwanegu',
  another: 'Ychwanegu enw arall',
  remove: 'Dileu',
  errors: {
    [`${fieldPrefix}HasOtherNames`]: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
      addButtonNotClicked: "Dewiswch 'Ychwanegu' i gadw eich enwau blaenorol",
    },
    [`${fieldPrefix}OtherFirstNames`]: {
      required: 'Rhowch eich enwau cyntaf blaenorol',
    },
    [`${fieldPrefix}OtherLastNames`]: {
      required: 'Rhowch eich enwau olaf blaenorol',
    },
    addAnotherName: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
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
                  rows: mapSummaryListContent(
                    userCase[`${fieldPrefix}AdditionalNames`],
                    [userCase.applicant1LanguagePreference === LanguagePreference.WELSH ? 'Dileu' : 'Remove'],
                    urls[fieldPrefix]
                  ),
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
                      type: 'text',
                      classes: 'govuk-!-width-two-thirds',
                      label: l => l[`${fieldPrefix}OtherFirstNames`],
                      labelSize: null,
                      validator: isFieldFilledIn,
                    },
                    [`${fieldPrefix}OtherLastNames`]: {
                      type: 'text',
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
                    cancelButton: {
                      type: 'button',
                      label: l => l.cancel,
                      classes: 'govuk-button--secondary',
                      value: 'cancelButton',
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
                  type: 'text',
                  classes: 'govuk-!-width-two-thirds',
                  label: l => l[`${fieldPrefix}OtherFirstNames`],
                  labelSize: null,
                  validator: isFieldFilledIn,
                },
                [`${fieldPrefix}OtherLastNames`]: {
                  type: 'text',
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
