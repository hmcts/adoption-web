import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { doesArrayHaveValues, isFieldFilledIn } from '../../../app/form/validation';
import { mapSummaryListContent } from '../../common/functions/mapSummaryListContent';
import { APPLICANT_1_OTHER_NAMES } from '../../urls';

export const en = (): Record<string, unknown> => ({
  section: 'Second applicant',
  label: 'Have you ever legally been known by any other names?',
  example: 'For example, your name before marriage.',
  yes: 'Yes',
  no: 'No',
  applicant2AdditionalName: 'Add your previous full name',
  add: 'Add',
  another: 'Add another name',
  remove: 'Remove',
  errors: {
    applicant2HasOtherNames: {
      required: 'Enter a name or choose no',
    },
    applicant2AdditionalName: {
      required: 'Name cannot be empty',
    },
    addAnotherName: {
      required: 'Name cannot be empty',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: 'Second applicant (in Welsh)',
  title: 'Have you ever legally been known by any other names? (in Welsh)',
  example: 'For example, your name before marriage. (in Welsh)',
  yes: 'Yes (in Welsh)',
  no: 'No (in Welsh)',
  applicant2AdditionalName: 'Add your previous full name (in Welsh)',
  add: 'Add (in Welsh)',
  another: 'Add another name (in Welsh)',
  remove: 'Remove (in Welsh)',
  errors: {
    applicant2HasOtherNames: {
      required: 'Enter a name or choose no (in Welsh)',
    },
    applicant2AdditionalName: {
      required: 'Name cannot be empty (in Welsh)',
    },
    addAnotherName: {
      required: 'Name cannot be empty (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    return {
      applicant2HasOtherNames: {
        type: 'radios',
        classes: 'govuk-radios',
        label: l => l.label,
        hint: l => l.example,
        labelSize: 's',
        section: l => l.section,
        values: [
          {
            label: l => l.yes,
            value: YesOrNo.YES,
            subFields: {
              applicant2AdditionalNames: {
                type: 'summarylist',
                rows: mapSummaryListContent(
                  userCase.applicant2AdditionalNames || [],
                  ['Remove'],
                  APPLICANT_1_OTHER_NAMES
                ),
              },
              ...(userCase.applicant2AdditionalNames?.length
                ? {
                    addAnotherName: {
                      type: 'details',
                      label: l => l.another,
                      subFields: {
                        applicant2AdditionalName: {
                          type: 'input',
                          label: l => l.applicant2AdditionalName,
                          labelSize: 's',
                        },
                        addButton: {
                          type: 'button',
                          label: l => l.add,
                          classes: 'govuk-button--secondary',
                          value: 'addButton',
                        },
                      },
                      validator: () => doesArrayHaveValues(userCase.applicant2AdditionalNames),
                    },
                  }
                : {
                    applicant2AdditionalName: {
                      type: 'input',
                      label: l => l.applicant2AdditionalName,
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
