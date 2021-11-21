import config from 'config';

import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ isDivorce, required, partner }) => ({
  title: `Help with the ${isDivorce ? 'divorce fee' : 'fee to end your civil partnership'}`,
  line1: `This ${isDivorce ? 'divorce application' : 'application to end your civil partnership'} costs ${config.get(
    'fees.applicationFee'
  )}. This service will not ask you to pay the fee. Your ${partner} will be asked to pay because they are the first applicant.`,
  line2: `Your ${partner} has said they need help paying the fee. They can only use Help With Fees on this application if you claim and are eligible for Help With Fees too.`,
  line3: 'You can claim Help With Fees if you: (one or more of the following):',
  helpPayingWhen: ['are on certain benefits', 'have a little or no savings', 'have low income'],
  yes: 'I need help paying the fee',
  no: 'I do not need help paying the fee',
  subHeading1: 'Do you need help paying the fee?',
  line4: `Your ${partner} can only use help with fees, if you apply and are eligible for Help With Fees too. You will not be asked to pay the fee by this service, no matter which answer you select.`,
  errors: {
    applicant2HelpPayingNeeded: {
      required,
    },
  },
});

const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    applicant2HelpPayingNeeded: {
      type: 'radios',
      classes: 'govuk-radios',
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
