import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = ({ isDivorce, partner, civilPartner }) => ({
  title: 'You need to review your joint application',
  line1: `Your ${isDivorce ? partner : civilPartner} has created ${
    isDivorce ? 'a divorce application' : 'an application to end your civil partnership'
  }. They have indicated they want to submit the application jointly with you. A joint application is when you both review and submit the application together.`,
  line2: `You need to review the information they have provided. If you confirm it’s correct and confirm the application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  } can be made, then it can be submitted. If you do not confirm then you will be told what you can do next.`,
  line3: 'You will also be asked to provide some of your own information.',
});

// @TODO translations
const cy = en;

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
