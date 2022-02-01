import { CaseWithId } from '../../../../app/case/case';
import { PaymentMethod } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const getFeeAmount = (userCase: CaseWithId): string => {
  const total = userCase.applicationFeeOrderSummary?.PaymentTotal;
  return total || '0';
};

const en = content => ({
  section: 'Review your application, pay and send',
  label: 'Paying your adoption court fees',
  hint: `The adoption court fees total <span class="govuk-!-font-weight-bold">£${getFeeAmount(content.userCase)}</span>.
  <br>If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your adoption application fees.`,
  payingByCard: 'I am paying by card',
  haveHWFRef: 'I have a help with fees reference number',
  hwfRefNumber: 'Enter your help with fees reference number',
  applyForHWF: 'I want to apply for help with fees',
  continue: 'Continue',
  errors: {
    paymentType: {
      errorRetrievingFee: 'Error in retrieving fee',
      required: 'Select an option',
    },
    hwfRefNumber: {
      required: 'Enter your reference number',
    },
  },
});

const cy: typeof en = content => ({
  section: 'Review your application, pay and send (in welsh)',
  label: 'Paying your adoption court fees (in welsh)',
  hint: `The adoption court fees total <span class="govuk-!-font-weight-bold">£${getFeeAmount(
    content.userCase
  )}</span> (in welsh).
  <br>If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your adoption application fees. (in welsh)`,
  payingByCard: 'I am paying by card (in welsh)',
  haveHWFRef: 'I have a help with fees reference number (in welsh)',
  hwfRefNumber: 'Enter your help with fees reference number (in welsh)',
  applyForHWF: 'I want to apply for help with fees (in welsh)',
  continue: 'Continue (in welsh)',
  errors: {
    paymentType: {
      errorRetrievingFee: 'Error in retrieving fee (in welsh)',
      required: 'Select an option (in welsh)',
    },
    hwfRefNumber: {
      required: 'Enter your reference number (in welsh)',
    },
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
        { label: l => l.payingByCard, value: PaymentMethod.PAY_BY_CARD },
        {
          label: l => l.haveHWFRef,
          value: PaymentMethod.PAY_BY_HWF,
          subFields: {
            hwfRefNumber: {
              type: 'text',
              classes: 'govuk-!-width-one-third',
              label: l => l.hwfRefNumber,
              labelSize: null,
              validator: isFieldFilledIn,
            },
          },
        },
        { label: l => l.applyForHWF, value: PaymentMethod.APPLY_FOR_HWF },
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
