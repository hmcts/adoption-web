import config from 'config';

import { ApplicationType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `How do you want to apply ${isDivorce ? 'for the divorce?' : 'to end your civil partnership?'}`,
  line1: `You can apply ${
    isDivorce ? 'for the divorce' : 'to end your civil partnership'
  } on your own (as a ‘sole applicant’) or with your ${partner} (in a ‘joint application’).`,
  subHeading1: 'Applying as a sole applicant',
  line2: `If you apply as a sole applicant, your ${partner} responds to your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } after you have submitted it. You will be applying on your own.`,
  subHeading2: `Applying jointly, with your ${partner}`,
  line3: `If you apply jointly, your ${partner} joins and reviews this online application before it’s submitted. You will be applying together.`,
  line4:
    'How you divide your money and property is dealt with separately. It should not affect your decision on whether to do a sole or a joint application.',
  line5: `If you need help paying the fee for ${
    isDivorce ? 'the divorce' : 'ending your civil partnership'
  }, then this works differently in a joint application.`,
  readMore: 'Find out more about help with fees.',
  helpText1: `This ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } costs ${config.get(
    'fees.applicationFee'
  )}. In a sole application you will have to pay the divorce fee. In a joint application, either you or your ${partner} will be able to pay. The payment system does not allow you to split the payment.`,
  helpText2: 'Help can be claimed to pay the fee, if the applicant: ',
  helpPayingWhen: ['is on certain benefits <em>or</em>', 'has a little or no savings <em>or</em>', 'has low income'],
  helpText3: `In a sole application, only you have to be eligible and claim help with fees. In a joint application, both you and your ${partner} have to be eligible and claim help with fees separately.`,
  soleApplication: 'I want to apply on my own, as a sole applicant',
  jointApplication: `I want to apply jointly, with my ${partner}`,
  errors: {
    applicationType: {
      required: 'You have not answered the question. You need to select an answer before continuing.',
    },
  },
});

//TODO Translation
const cy = en;

export const form: FormContent = {
  fields: {
    applicationType: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.soleApplication, value: ApplicationType.SOLE_APPLICATION },
        { label: l => l.jointApplication, value: ApplicationType.JOINT_APPLICATION },
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
