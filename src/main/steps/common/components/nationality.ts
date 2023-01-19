/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Case, FieldPrefix } from '../../../app/case/case';
import { PageContent } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, notSureViolation } from '../../../app/form/validation';
import {
  LA_PORTAL_BIRTH_FATHER_NATIONALITY,
  LA_PORTAL_BIRTH_MOTHER_NATIONALITY,
  LA_PORTAL_CHILD_NATIONALITY,
} from '../../urls';
import { CommonContent } from '../common.content';
import { mapSummaryListContent } from '../functions/mapSummaryListContent';

import { defaultButtons } from './common/default-buttons';

const en = (fieldPrefix: FieldPrefix) => ({
  title: 'What is their nationality?',
  hint: 'Select all options that are relevant.',
  british: 'British',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish',
  irish: 'Irish',
  differentCountry: 'Citizen of a different country',
  countryName: 'Country name',
  add: 'Add',
  another: 'Add another country',
  or: 'or',
  notSure: 'Not sure',
  errors: {
    [`${fieldPrefix}Nationality`]: {
      required: 'Select if you are British, Irish or a citizen of a different country',
      notSureViolation: "Select a nationality or 'Not sure'",
    },
    addAnotherNationality: {
      required: 'Enter a country name',
    },
  },
});

const cy: typeof en = (fieldPrefix: FieldPrefix) => ({
  title: 'Beth yw eu cenedligrwydd?',
  hint: 'Dewiswch bob opsiwn sy’n berthnasol i chi.',
  british: 'Prydeinig',
  britishSubtext: 'gan gynnwys Saesneg, Albanaidd, Cymraeg a Gwyddelig Gogledd Iwerddon',
  irish: 'Gwyddelig',
  differentCountry: 'Dinesydd gwlad wahanol',
  countryName: 'Enw’r wlad',
  add: 'Ychwanegu',
  another: 'Ychwanegu gwlad arall',
  or: 'neu',
  notSure: 'Ddim yn siŵr',
  errors: {
    [`${fieldPrefix}Nationality`]: {
      required: 'Dewiswch a ydych yn Brydeinig, Gwyddelig neu’n ddinesydd gwlad wahanol',
      notSureViolation: 'Dewiswch genedligrwydd neu ‘Ddim yn siŵr’',
    },
    addAnotherNationality: {
      required: 'Nid yw hyn yn gofnod dilys',
    },
  },
});

const urls = {
  [FieldPrefix.CHILDREN]: LA_PORTAL_CHILD_NATIONALITY,
  [FieldPrefix.BIRTH_FATHER]: LA_PORTAL_BIRTH_FATHER_NATIONALITY,
  [FieldPrefix.BIRTH_MOTHER]: LA_PORTAL_BIRTH_MOTHER_NATIONALITY,
};

export const nationalityFields = (userCase: Partial<Case>, fieldPrefix: FieldPrefix): FormFields => ({
  [`${fieldPrefix}Nationality`]: {
    type: 'checkboxes',
    label: l => l.title,
    labelSize: 'l',
    hint: l => l.hint,
    labelHidden: true,
    validator: value =>
      [FieldPrefix.APPLICANT1, FieldPrefix.APPLICANT2].includes(fieldPrefix)
        ? atLeastOneFieldIsChecked(value)
        : atLeastOneFieldIsChecked(value) || notSureViolation(value),
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
                    urls[fieldPrefix]
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
                      type: 'text',
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
                  type: 'text',
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
      ...(![FieldPrefix.APPLICANT1, FieldPrefix.APPLICANT2].includes(fieldPrefix)
        ? [
            {
              divider: l => l.or,
            },
            {
              name: `${fieldPrefix}Nationality`,
              label: l => l.notSure,
              value: 'Not sure',
            },
          ]
        : []),
    ],
  },
});

export const form: FormContent = {
  fields: {},
  ...defaultButtons,
};

const languages = {
  en,
  cy,
};

export const generateContent = (content: CommonContent, fieldPrefix: FieldPrefix): PageContent => ({
  ...languages[content.language](fieldPrefix),
  form: { ...form, fields: nationalityFields(content.userCase!, fieldPrefix) },
});
