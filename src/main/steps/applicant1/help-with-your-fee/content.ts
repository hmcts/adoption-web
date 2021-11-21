import config from 'config';

import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ isDivorce, required, isJointApplication, partner }) => ({
  title: isJointApplication
    ? `Help paying the ${isDivorce ? 'divorce fee' : 'fee to end your civil partnership'}`
    : `Do you need help paying the fee for ${isDivorce ? 'your divorce' : 'ending your civil partnership'}?`,
  line1: `This ${isDivorce ? 'divorce application' : 'application'} costs ${config.get('fees.applicationFee')}. ${
    isJointApplication
      ? `Either you or your ${partner} will be able to pay. The payment system does not allow you to split the payment.`
      : 'You may be able to get help paying the fee if you:'
  }`,
  line2: isJointApplication && 'Help can be claimed to pay the fee, if both of you:',
  helpPayingWhen: ['are on certain benefits <em>or</em>', 'have a little or no savings <em>or</em>', 'have low income'],
  yes: 'I need help paying the fee',
  no: 'I do not need help paying the fee',
  line3:
    'Both of you have to be eligible and apply for help with fees separately, because this is a joint application.',
  subHeading1: 'Do you need help paying the fee?',
  line4: `Do not answer this question on behalf of your ${partner}. If you select that you need help paying the fee then they will be asked.`,

  errors: {
    applicant1HelpPayingNeeded: {
      required,
    },
  },
});

const cy: typeof en = ({ isDivorce, required, isJointApplication, partner }) => ({
  ...en({ isDivorce, required, isJointApplication, partner }),
  title: `A oes angen help arnoch i dalu'r ffi am ${
    isDivorce ? 'eich ysgariad?' : "ddod â'ch partneriaeth sifil i ben?"
  }`,
  line1: `Mae'r ${isDivorce ? 'cais am ysgariad' : 'cais'} hwn yn costio ${config.get(
    'fees.applicationFee'
  )}. Efallai y byddwch yn gallu cael help i dalu'r ffi:`,
  helpPayingWhen: [
    'os ydych yn cael budd-daliadau penodol, <em>neu</em>',
    'os oes gennych ychydig o gynilion neu ddim cynilion o gwbl, <em>neu</em>',
    'os ydych ar incwm isel',
  ],
  yes: "Mae angen help arnaf i dalu'r ffi",
  no: "Nid oes angen help arnaf i dalu'r ffi",
  errors: {
    applicant1HelpPayingNeeded: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1HelpPayingNeeded: {
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
