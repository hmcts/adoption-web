import { Checkbox } from 'app/case/case';
import { ApplyingWith } from 'app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

export const en = (): Record<string, unknown> => ({
  section: 'Review your application, pay and send',
  title: 'Statement of truth',
  line1: 'I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in the truth.',
  line2: 'Once you submit your application, you cannot make any further changes. You can select \'Save as draft\' to review your application before you submit.',
  applicant1IBelieveApplicationIsTrue: 'I believe that the facts stated in this form and any additional documents are true.',
  applicant1IBelieveApplicationIsTrue2: 'The primary applicant believes that the facts stated in this form and any additional documents are true.',
  applicant2IBelieveApplicationIsTrue: 'I am authorised by the second applicant to sign this statement.',
  applicant1SotFullName: 'Enter your full name',
  applicant2SotFullName: 'Enter the second applicant\'s full name (if applicable)',
  errors: {
    applicant1IBelieveApplicationIsTrue: {
      required: 'Confirm your statement of truth',
    },
    applicant1SotFullName: {
      required: 'Enter a full name',
    },
    applicant2SotFullName: {
      required: 'Enter a full name',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: 'Review your application, pay and send (in Welsh)',
  title: 'Statement of truth (in Welsh)',
  line1: 'I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in the truth. (in Welsh)',
  line2: 'Once you submit your application, you cannot make any further changes. You can select \'Save as draft\' to review your application before you submit. (in Welsh)',
  applicant1IBelieveApplicationIsTrue: 'I believe that the facts stated in this form and any additional documents are true. (in Welsh)',
  applicant1IBelieveApplicationIsTru2: 'The primary applicant believes that the facts stated in this form and any additional documents are true. (in Welsh)',
  applicant2IBelieveApplicationIsTrue: 'I am authorised by the second applicant to sign this statement. (in Welsh)',
  applicant1SotFullName: 'Enter your full name (in Welsh)',
  applicant2SotFullName: 'Enter the second applicant\'s full name (if applicable) (in Welsh)',
  errors: {
    applicant1IBelieveApplicationIsTrue: {
      required: 'Confirm your statement of truth (in Welsh)',
    },
    applicant1SotFullName: {
      required: 'Enter a full name (in Welsh)',
    },
    applicant2SotFullName: {
      required: 'Enter a full name (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    return {
      ...(userCase.applyingWith == ApplyingWith.ALONE
        ? {
          applicant1IBelieveApplicationIsTrue: {
            type: 'checkboxes',
            label: l => l.label,
            labelSize: 'l',
            section: l => l.section,
            hint: l => l.hint,
            values: [{ name: 'applicant1IBelieveApplicationIsTrue', label: l => l.applicant1IBelieveApplicationIsTrue, value: Checkbox.Checked },],
            validator: isFieldFilledIn,
          },
          applicant1SotFullName: {
            type: 'text',
            classes: 'govuk-label govuk-!-width-two-thirds',
            label: l => l.applicant1SotFullName,
            labelSize: null,
            validator: isFieldFilledIn,
          },
        }
        : {
          applicant1IBelieveApplicationIsTrue: {
            type: 'checkboxes',
            label: l => l.label,
            labelSize: 'l',
            section: l => l.section,
            hint: l => l.hint,
            values: [{ name: 'applicant1IBelieveApplicationIsTrue', label: l => l.applicant1IBelieveApplicationIsTrue2, value: Checkbox.Checked },],
            validator: isFieldFilledIn,
          },
          applicant2IBelieveApplicationIsTrue: {
            type: 'checkboxes',
            label: l => l.label,
            labelSize: 'l',
            section: l => l.section,
            hint: l => l.hint,
            values: [{ name: 'applicant2IBelieveApplicationIsTrue', label: l => l.applicant2IBelieveApplicationIsTrue, value: Checkbox.Checked },],
          },
          applicant1SotFullName: {
            type: 'text',
            classes: 'govuk-label govuk-!-width-two-thirds',
            label: l => l.applicant1SotFullName,
            labelSize: null,
            validator: isFieldFilledIn,
          },
          applicant2SotFullName: {
            type: 'text',
            classes: 'govuk-label govuk-!-width-two-thirds',
            label: l => l.applicant2SotFullName,
            labelSize: null,
            validator: isFieldFilledIn,
          },
        }),
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};

