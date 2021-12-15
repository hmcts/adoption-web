import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = (content) => ({
  title: 'Pay adoption fee',
  line1: `The adoption application fee is £${content.fee}`,
  line2: 'You’ll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready.',
  continue: 'Pay and submit application',
});

const cy = (content) => ({
  title: 'Pay adoption fee (in welsh)',
  line1: `The adoption application fee is £${content.fee} (in welsh)`,
  line2: 'You’ll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready. (in welsh)',
  continue: 'Pay and submit application (in welsh)',
});

export const form: FormContent = {
  fields: {},
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
