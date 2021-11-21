import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ required }) => ({
  title: 'Have you been living in England or Wales for the last 6 months?',
  errors: {
    applicant1LivingInEnglandWalesSixMonths: {
      required,
    },
  },
});

const cy: typeof en = ({ required }) => ({
  title: 'A ydych wedi bod yn byw yng Nghymru neu Loegr am y 6 mis diwethaf?',
  errors: {
    applicant1LivingInEnglandWalesSixMonths: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1LivingInEnglandWalesSixMonths: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
