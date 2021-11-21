import dayjs from 'dayjs';

import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner, required, userCase }: CommonContent) => ({
  title: `Disputing the ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  line1: `If you want to dispute the ${
    isDivorce ? 'application for divorce' : 'application to end your civil partnership'
  }
  then you’ll have to submit another form (known as ‘the answer’) with your reason for disputing.
  This will cost you £245, unless you are eligible for Help With Fees.`,
  readMore: 'Find out more about Help With Fees',
  helpText: 'You may be able to get help paying the fee if you (one or more of the following):',
  helpPayingWhen: ['is on certain benefits', 'has a little or no savings', 'has low income'],
  line2: `You will have until ${dayjs(userCase?.issueDate)
    .add(37, 'day')
    .format('D MMMM YYYY')} to submit the form. If you do not submit the form by the deadline,
   then your ${partner} will usually be able to continue with the ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  }.`,
  line3: `The only valid reasons for disputing the ${
    isDivorce ? 'divorce' : 'ending of your civil partnership'
  } are because (one or both of the following):`,
  point1: `you do not believe the courts of England and Wales have the legal power (jurisdiction) to grant the
  ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  point2: `you do not believe your ${isDivorce ? 'marriage' : 'civil partnership'} is legally valid. For example,
  if one of you was already married or in a civil partnership when you ${
    isDivorce ? 'got married' : 'formed your civil partnership'
  }`,
  point3: `this ${isDivorce ? 'marriage' : 'civil partnership'} has already been legally ended`,
  line4: 'Are you sure you want to dispute the application?',
  disputedSelected: `<strong>You are about to confirm that you want to dispute the ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  }.</strong>`,
  yes: `I confirm I want to dispute the ${isDivorce ? 'divorce' : 'application to end your civil partnership'}`,
  no: `I do not want to dispute the ${isDivorce ? 'divorce' : 'application to end your civil partnership'}`,
  errors: {
    confirmDisputeApplication: {
      required,
    },
  },
});

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    confirmDisputeApplication: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          conditionalText: l => `<p class="govuk-label">${l.disputedSelected}</p>`,
        },
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
