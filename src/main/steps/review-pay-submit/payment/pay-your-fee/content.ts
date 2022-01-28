import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// TODO: Update this page
const en = content => ({
  section: 'Review your application, pay and send',
  label: 'Paying your adoption court fees',
  hint: `The adoption court fees total <span class="govuk-!-font-weight-bold">£${content.fee?.feeAmount || 0}</span>.
  <br>If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your adoption application fees.`,
  payingByCard: 'I am paying by card',
  haveHWFRef: 'I have a help with fees reference number',
  hwfRefNumber: 'Enter your help with fees reference number',
  applyForHWF: 'I want to apply for help with fees',
  continue: 'Continue',
  errors: {
    paymentType: { errorRetrievingFee: 'Error in retrieving fee', required: 'Please select an answer' },
  },
});

const cy: typeof en = content => ({
  section: 'Review your application, pay and send (in welsh)',
  label: 'Paying your adoption court fees (in welsh)',
  hint: `The adoption court fees total <span class="govuk-!-font-weight-bold">£${
    content.fee?.feeAmount || 0
  }</span> (in welsh).
  <br>If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your adoption application fees. (in welsh)`,
  payingByCard: 'I am paying by card (in welsh)',
  haveHWFRef: 'I have a help with fees reference number (in welsh)',
  hwfRefNumber: 'Enter your help with fees reference number (in welsh)',
  applyForHWF: 'I want to apply for help with fees (in welsh)',
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
      values: [
        { label: l => l.payingByCard, value: 'payingByCard' },
        {
          label: l => l.haveHWFRef,
          value: 'haveHWFRef',
          subFields: {
            hwfRefNumber: {
              type: 'text',
              label: l => l.hwfRefNumber,
              labelSize: null,
              validator: isFieldFilledIn,
            },
          },
        },
        { label: l => l.applyForHWF, value: 'applyForHWF' },
      ],
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
