import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant1GenerateContent } from '../../applicant1/check-your-answers/content';

const label = ({ isDivorce }) => ({
  confirmBeforeSubmit: 'Confirm before submitting',
  iConfirm: 'I confirm that:',
  confirmSotHint: `
    <ul class="govuk-list govuk-list--bullet govuk-!-margin-top-4">
    <li>I am the person named as the respondent in the application ${
      isDivorce ? 'for divorce' : 'to end your civil partnership'
    }</li>
    <li>I believe that the facts stated in this response are true</li></ul>`,
  confirmationExplanation: `The first statement is confirming that you’re the person who should be responding to this application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  }. The second is your statement of truth.`,
  continue: 'Submit',
  errors: {
    applicant2IBelieveApplicationIsTrue: {
      required:
        'You have not confirmed that you are the respondent and that you believe the facts in the application are true. You need to confirm before continuing.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2IBelieveApplicationIsTrue: {
      type: 'checkboxes',
      label: l => l.confirmBeforeSubmit,
      labelSize: 'm',
      values: [
        {
          name: 'applicant2IBelieveApplicationIsTrue',
          label: l => l.iConfirm,
          hint: l => l.confirmSotHint,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  return {
    ...applicant1GenerateContent(content),
    ...label(content),
    form,
  };
};
