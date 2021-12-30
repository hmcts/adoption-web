import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { doesArrayHaveValues, isFieldFilledIn } from '../../../app/form/validation';
import { mapSummaryListContent } from '../../common/functions/mapSummaryListContent';
import { APPLICANT_1_OTHER_NAMES } from '../../urls';

export const en = (): Record<string, unknown> => ({
  section: 'Primary applicant',
  label: 'Have you ever legally been known by any other names?',
  example: 'For example, your name before marriage.',
  yes: 'Yes',
  no: 'No',
  applicant1AdditionalName: 'Add your previous full name',
  add: 'Add',
  another: 'Add another name',
  remove: 'Remove',
  errors: {
    applicant1HasOtherNames: {
      required: 'Enter a name or choose no',
    },
    applicant1AdditionalName: {
      required: 'Enter a name or choose no',
    },
    addAnotherName: {
      required: 'Enter a name or choose no',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
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
    applicant1HasOtherNames: {
      required: 'Enter a name or choose no (in Welsh)',
    },
    applicant1AdditionalName: {
      required: 'Enter a name or choose no (in Welsh)',
    },
    addAnotherName: {
      required: 'Enter a name or choose no (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    return {
      applicant1HasOtherNames: {
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
              ...(userCase.applicant1AdditionalNames?.length
                ? {
                    applicant1AdditionalNames: {
                      type: 'summarylist',
                      rows: mapSummaryListContent(
                        userCase.applicant1AdditionalNames,
                        ['Remove'],
                        APPLICANT_1_OTHER_NAMES
                      ),
                    },
                  }
                : {}),
              ...(userCase.applicant1AdditionalNames?.length
                ? {
                    addAnotherName: {
                      type: 'details',
                      label: l => l.another,
                      subFields: {
                        applicant1AdditionalName: {
                          type: 'input',
                          classes: 'govuk-!-width-two-thirds',
                          label: l => l.applicant1AdditionalName,
                          labelSize: null,
                        },
                        addButton: {
                          type: 'button',
                          label: l => l.add,
                          classes: 'govuk-button--secondary',
                          value: 'addButton',
                        },
                      },
                      validator: () => doesArrayHaveValues(userCase.applicant1AdditionalNames),
                    },
                  }
                : {
                    applicant1AdditionalName: {
                      type: 'input',
                      classes: 'govuk-!-width-two-thirds',
                      label: l => l.applicant1AdditionalName,
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

export const generateContent: TranslationFn = content => {
  const fields = (form.fields as FormFieldsFn)(content.userCase || {});
  return {
    ...languages[content.language](),
    form: { ...form, fields },
  };
};
