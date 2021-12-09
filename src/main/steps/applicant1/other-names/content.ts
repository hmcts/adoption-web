import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: 'Primary applicant',
  title: 'Have you ever legally been known by any other names?',
  example: 'For example, your name before marriage.',
  yes: 'Yes',
  no: 'No',
  errors: {
    otherNames: {
      required: 'Enter a name or choose no',
    },
    additionalName: {
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
  errors: {
    otherNames: {
      required: 'Enter a name or choose no (in Welsh)',
    },
    additionalName: {
      required: 'Name cannot be empty (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
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
              values: [{ label: 'aa', value: 'ee pet' }],
              rows: {
                rows: [
                  {
                    value: {
                      text: 'Sarah Philips',
                    },
                    actions: {
                      items: [
                        {
                          href: '#',
                          text: 'Remove',
                        },
                      ],
                    },
                  },
                ],
              },
            },
            additionalName: {
              type: 'input',
              label: 'Add your previous full name',
              labelSize: 'small',
            },
            addButton: {
              type: 'button',
              label: 'Add',
              classes: 'govuk-button--secondary',
              value: 'addButton',
            },
            addAnotherName: {
              type: 'details',
              label: 'Add another name',
              subtext: 'Example',
            },
          },
        },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
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
  form,
});
