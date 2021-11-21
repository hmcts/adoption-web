import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce }: CommonContent) => ({
  title: `Check if you can ${isDivorce ? 'get a divorce' : 'end your civil partnership'} in England and Wales`,
  line1: `You must have some connection to England or Wales for the courts to have the legal power to ${
    isDivorce ? 'grant you a divorce' : 'end your civil partnership'
  }. This legal power is known as ‘jurisdiction’.`,
  line2: 'The following questions will find out what connections you have to England or Wales.',
});

const cy: typeof en = ({ isDivorce }: CommonContent) => ({
  title: `Gwiriwch a allwch ${isDivorce ? 'gael ysgariad' : "dod â'ch partneriaeth sifil i ben"} yng Nghymru neu Loegr`,
  line1: `Rhaid bod gennych ryw fath o gysylltiad â Chymru neu Loegr i'r llysoedd feddu ar y pŵer cyfreithiol i ${
    isDivorce ? 'ganiatáu eich ysgariad' : "dod a'ch partneriaeth sifil i ben"
  }. Gelwir y pwer cyfreithiol hwn yn awdurdodaeth.`,
  line2: 'Bydd y cwestiynau canlynol yn canfod pa gysylltiadau sydd gennych â Chymru neu Loegr.',
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
