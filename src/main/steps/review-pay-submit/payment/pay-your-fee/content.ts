import config from 'config';

import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// TODO: Update this page
const en = () => ({
  section: 'Review your application, pay and send',
  label: 'Pay your adoption application fee',
  hint: `The adoption court fees total <span class="govuk-!-font-weight-bold">£${config.get(
    'fees.applicationFee'
  )}</span>.
  <br>If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your adoption application fees.`,
  payingByCard: 'I am paying by card',
  continue: 'Continue',
});

const cy: typeof en = () => ({
  section: 'Review your application, pay and send (in welsh)',
  label: 'Pay your adoption application fee (in welsh)',
  hint: `The adoption court fees total <span class="govuk-!-font-weight-bold">£${config.get(
    'fees.applicationFee'
  )}</span> (in welsh).
  <br>If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your adoption application fees. (in welsh)`,
  payingByCard: 'I am paying by card (in welsh)',
  continue: 'Continue (in welsh)',
});

export const form: FormContent = {
  fields: {
    applyingWith: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      values: [{ label: l => l.payingByCard, value: 'payingByCard' }],
      validator: isFieldFilledIn,
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
