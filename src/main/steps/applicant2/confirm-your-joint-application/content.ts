import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant1GenerateContent } from '../../applicant1/confirm-your-joint-application/content';

const labels = content => {
  return {
    errors: {
      applicant2IConfirmPrayer: {
        ...content.errors.applicant1IConfirmPrayer,
      },
      applicant2IBelieveApplicationIsTrue: {
        ...content.errors.applicant1IBelieveApplicationIsTrue,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant2IConfirmPrayer: {
      type: 'checkboxes',
      label: l => l.confirm,
      labelSize: 'm',
      values: [
        {
          name: 'applicant2IConfirmPrayer',
          label: l => l.confirmPrayer,
          hint: l => l.confirmPrayerHint,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
    applicant2IBelieveApplicationIsTrue: {
      type: 'checkboxes',
      labelHidden: true,
      values: [
        {
          name: 'applicant2IBelieveApplicationIsTrue',
          label: l => l.confirmApplicationIsTrue,
          hint: l => l.confirmApplicationIsTrueHint,
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
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(applicant1Content),
    form,
  };
};
