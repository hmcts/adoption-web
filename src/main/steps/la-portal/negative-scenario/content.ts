import { TranslationFn } from '../../../app/controller/GetController';

const en = () => ({
  title: 'There is a problem',
  line1: 'Some of the information you have given does not match what is stored in our records.',
  line2: 'You should select the back link and check that spellings, dates and numbers are correct.',
  line3:
    'If this error comes up after you have checked all your details then there might be a problem with the information provided by the applicants. In that case you should contact the caseworker:',

  contactUs: 'Contact us for help',
});

const cy: typeof en = () => ({
  title: 'Mae yna broblem',
  line1:
    "Nid yw rhywfaint o'r wybodaeth rydych chi wedi'i rhoi yn cyd-fynd â'r hyn sydd wedi’i storio yn ein cofnodion.",
  line2: 'Dylech glicio ar y ddolen a gwirio bod y sillafiadau, y dyddiadau a’r rhifau yn gywir.',
  line3:
    "Os yw’r gwall hwn yn codi ar ôl i chi wirio eich holl fanylion, yna efallai bod problem gyda’r wybodaeth a ddarparwyd gan y ceiswyr. Yn yr achos hwnnw dylech gysylltu â'r gweithiwr achos:",

  contactUs: 'Cysylltwch â ni am help',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
