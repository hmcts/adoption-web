import config from 'config';

import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, divorce, endingCivilPartnership, userCase }: CommonContent) => ({
  title: 'How to apply to serve (deliver) the papers another way',
  line1: `You have to make a separate application to serve the ${
    isDivorce ? divorce : endingCivilPartnership
  } papers another way. You will be given a link to the form after you have submitted this application. It will be reviewed by a judge and costs an additional ${config.get(
    'fees.alternativeService'
  )}.`,
  line3: `For example, you could apply to have the papers served (delivered) by ${
    userCase?.applicant2EmailAddress ? 'the email address you entered earlier' : 'email, text message or social media'
  }.`,
  line4: `Continue with your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
});

const cy: typeof en = ({ isDivorce, userCase }: CommonContent) => ({
  title: 'Sut i wneud cais i gyflwyno (danfon) y papurau drwy ddull arall',
  line1: `Rydych wedi gwneud cais ar wahân i gyflwyno'r ${
    isDivorce ? 'papurau ysgaru' : 'papurau diweddu eich partneriaeth sifil'
  } drwy ddull arall. Fe gewch ddolen i'r ffurfen ar ôl ichi gyflwyno'r cais hwn. Bydd yn cael ei adolygu gan farnwr ac mae cost ychwanegol o ${config.get(
    'fees.alternativeService'
  )}.`,
  line3: `Er enghraifft, gallwch wneud cais i'r papurau gael eu cyflwyno (danfon) ${
    userCase?.applicant2EmailAddress
      ? "i'r cyfeiriad e-bost wnaethoch chi ei nodi yn gynharach"
      : 'trwy neges e-bost, neges destun, neu drwy gyfrwng cymdeithasol'
  }.`,
  line4: `Parhau gyda'ch ${isDivorce ? 'cais am ysgariad' : 'cais i ddiweddu eich partneriaeth sifil'}.`,
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
