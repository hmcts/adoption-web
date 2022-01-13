import config from 'config';

import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// TODO: Update this page
const en = () => ({
  title: 'Pay your adoption application fee',
  line1: `The adoption application fee is ${config.get(
    'fees.applicationFee'
  )}. Your application will not be submitted to the court until you have paid.`,
  line2:
    'You’ll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready.',
  continue: 'Pay and submit application',
});

const cy: typeof en = () => ({
  title: 'Pay your adoption application fee (in welsh)',
  line1: `The adoption application fee is ${config.get(
    'fees.applicationFee'
  )}. Your application will not be submitted to the court until you have paid. (in welsh)`,
  line2:
    'You’ll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready. (in welsh)',
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
