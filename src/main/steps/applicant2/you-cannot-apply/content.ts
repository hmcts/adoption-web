import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = ({ isDivorce, partner }) => ({
  title: isDivorce ? 'You cannot apply to get a divorce' : 'You cannot apply to end your civil partnership',
  line1: `Your ${isDivorce ? 'marriage' : 'relationship'} must have irretrievably broken down
      for you to ${isDivorce ? 'get a divorce' : 'end your civil partnership'}. This is the law in England and Wales.`,
  line2: `If you end this joint application then your ${partner} will be notified by email. If they still want to ${
    isDivorce ? 'get a divorce' : 'end your civil partnership'
  } then they can apply as a sole applicant. This would mean you would have to respond to ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }. You can also launch a sole application, if you want.`,
  line3: 'If you are not sure what to do then you can save and sign out and get legal advice.',
  continue: 'End joint application',
});

const cy: typeof en = ({ isDivorce, partner }) => ({
  ...en({ isDivorce, partner }),
  title: `Ni allwch wneud cais i ${isDivorce ? 'gael ysgariad' : 'ddod â’ch partneriaeth sifil i ben'}`,
  line1: `Rhaid bod eich ${isDivorce ? 'priodas' : 'perthynas'} wedi chwalu'n gyfan gwbl i chi allu ${
    isDivorce ? 'cael ysgariad' : "dod â'ch partneriaeth sifil i ben"
  }. Dyma yw'r gyfraith yng Nghymru a Lloegr.`,
});

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
  const translation = languages[content.language](content);
  return {
    ...translation,
    form,
  };
};
