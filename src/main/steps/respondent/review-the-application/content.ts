import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant1GenerateContent } from '../../applicant1/review-the-application/content';

export const form: FormContent = {
  fields: {
    confirmReadPetition: {
      type: 'checkboxes',
      labelHidden: true,
      values: [
        {
          name: 'confirmReadPetition',
          label: l => l.confirmReadPetition,
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
    form,
  };
};
