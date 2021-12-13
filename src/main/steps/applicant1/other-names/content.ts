import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { mapSummaryListRows } from '../../common/functions/mapsummarylistrows';

const en = () => ({
  section: 'Primary applicant',
  title: 'Have you ever legally been known by any other names?',
  example: 'For example, your name before marriage.',
  yes: 'Yes',
  no: 'No',
  applicant1AdditionalName: 'Add your previous full name',
  add: 'Add',
  another: 'Add another name',
  remove: 'Remove',
  errors: {
    otherNames: {
      required: 'Enter a name or choose no',
    },
    applicant1AdditionalName: {
      required: 'Name cannot be empty',
    },
  },
});

const cy = () => ({
  section: 'Primary applicant (in Welsh)',
  title: 'Have you ever legally been known by any other names? (in Welsh)',
  example: 'For example, your name before marriage. (in Welsh)',
  yes: 'Yes (in Welsh)',
  no: 'No (in Welsh)',
  applicant1AdditionalName: 'Add your previous full name (in Welsh)',
  add: 'Add (in Welsh)',
  another: 'Add another name (in Welsh)',
  remove: 'Remove (in Welsh)',
  errors: {
    otherNames: {
      required: 'Enter a name or choose no (in Welsh)',
    },
    applicant1AdditionalName: {
      required: 'Name cannot be empty (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    return {
      otherNames: {
        type: 'radios',
        classes: 'govuk-radios',
        label: l => l.example,
        labelSize: 's',
        section: l => l.section,
        values: [
          {
            label: l => l.yes,
            value: YesOrNo.YES,
            subFields: {
              applicant1AdditionalNames: {
                type: 'summarylist',
                values: [],
                rows: mapSummaryListRows(userCase.applicant1AdditionalNames || [], ['Remove']),
              },
              applicant1AdditionalName: {
                type: 'input',
                label: l => l.applicant1AdditionalName,
                labelSize: 'small',
              },
              addButton: {
                type: 'button',
                label: l => l.add,
                classes: 'govuk-button--secondary',
                value: 'addButton',
              },
              // addAnotherName: {
              //   type: 'details',
              //   label: l => l.another,
              //   subFields: {
              //     applicant1AdditionalName: {
              //       type: 'input',
              //       label: l => l.applicant1AdditionalName,
              //       labelSize: 'small',
              //     },
              //     addButton: {
              //       type: 'button',
              //       label: l => l.add,
              //       classes: 'govuk-button--secondary',
              //       value: 'addButton',
              //     },
              //   },
              // },
            },
          },
          { label: l => l.no, value: YesOrNo.NO },
        ],
        validator: value => isFieldFilledIn(value),
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
