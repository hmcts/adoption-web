import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  title: 'Same sex married couples',
  jurisdictionResidualEligible:
    'Are the Applicant and Respondent registered as civil partners of each other in England or Wales or, in the case of a same sex couple, married each other under the law of England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case.',
});

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    jurisdictionResidualEligible: {
      type: 'checkboxes',
      values: [
        { name: 'jurisdictionResidualEligible', label: l => l.jurisdictionResidualEligible, value: Checkbox.Checked },
      ],
    },
  },
  submit: {
    text: l => l.continue,
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
    form,
  };
};
