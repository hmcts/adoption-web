import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// TODO: Update this page
const en = content => ({
  section: 'Review your application, pay and send',
  label: 'Pay your adoption application fee',
  hint: `The adoption court fees total <span class="govuk-!-font-weight-bold">£${content.fee?.feeAmount || 0}</span>.
  <br>If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your adoption application fees.`,
  payingByCard: 'I am paying by card',
  continue: 'Continue',
  errors: {
    paymentType: { errorRetrievingFee: 'Error in retrieving fee', required: 'Please select an answer' },
  },
});

const cy: typeof en = content => ({
  section: 'Review your application, pay and send (in welsh)',
  label: 'Pay your adoption application fee (in welsh)',
  hint: `The adoption court fees total <span class="govuk-!-font-weight-bold">£${
    content.fee?.feeAmount || 0
  }</span> (in welsh).
  <br>If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your adoption application fees. (in welsh)`,
  payingByCard: 'I am paying by card (in welsh)',
  continue: 'Continue (in welsh)',
  errors: {
    paymentType: { errorRetrievingFee: 'Error in retrieving fee', required: 'Please select an answer' },
  },
});

export const form: FormContent = {
  fields: {
    paymentType: {
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
