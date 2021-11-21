import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

const en = ({ partner, isDivorce }: CommonContent) => ({
  title: 'How to apply for a financial order',
  line1: `You will need to complete another form (Form A or Form A1) and pay an additional fee. You can apply at any time, so long as your ${partner} is still alive.`,
  line2: `You will be given a link to the relevant forms and more guidance after you have submitted this ${
    isDivorce ? 'divorce' : 'ending your civil partnership'
  } application. You can get legal advice or ask a solicitor to draft a financial order for you.`,
  line3: `Continue with your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
});

// @TODO translations
const cy: typeof en = en;

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
