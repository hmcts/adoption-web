import config from 'config';

import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Dividing your money and property',
  line1: `It’s usually more straightforward and less expensive if you agree with your ${partner} on how to divide your savings, property, pensions and other assets. There are mediation services available to help you come to an agreement. You’ll be given links to more information after you have submitted this application.`,
  agreeOnDividingAssets: 'If you agree about dividing money and property',
  agreeOnDividingAssetsDetails: `You can ask the court to make your agreement legally binding. This is known as applying for a ‘consent order’ (which is a type of financial order). There is an additional fee of ${config.get(
    'fees.consentOrder'
  )}. You can get legal advice or ask a solicitor to draft a consent order for you. You will be given links to further guidance after you have submitted this application.`,
  disagreeOnDividingAssets: 'If you disagree about dividing money and property',
  disagreeOnDividingAssetsDetails:
    'You can ask the court to decide for you. This is known as asking the court to make a ‘financial order’. This means the court will decide how assets will be split. You can also apply for a financial order for your children, if appropriate. The court can also order maintenance payments to be made.',
  readMore: 'Read more about child maintenance',
  readMoreContent: `The court can only make financial orders for children under certain circumstances. You can come to an agreement with your ${partner} and make it legally binding with a consent order, or you can use the Child Maintenance Service.`,
  costs: `Applying to the court to make a financial order is done separately, using another form. It costs an additional ${config.get(
    'fees.financialOrder'
  )}.`,
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: "Rhannu eich arian a'ch eiddo",
  line1: `Gan amlaf, mae'n symlach ac yn llai costus os ydych yn cytuno â'ch ${partner} ynghylch sut i rannu eich cynilion, eiddo, pensiynau ac asedau eraill. Mae yna wasanaethau cyfryngu ar gael i'ch helpu i ddod i gytundeb. Byddwch yn cael dolenni i ragor o wybodaeth ar ôl i chi gyflwyno'r cais hwn.`,
  agreeOnDividingAssets: 'Os ydych yn cytuno ynghylch rhannu arian ac eiddo',
  agreeOnDividingAssetsDetails: `Gallwch ofyn i'r llys wneud eich cytundeb yn gyfreithiol rwymol. Gelwir hyn yn gwneud cais am 'orchymyn cydsynio' (sef math o orchymyn ariannol). Mae ffi ychwanegol o ${config.get(
    'fees.consentOrder'
  )}. Gallwch gael cyngor cyfreithiol neu ofyn i gyfreithiwr ddrafftio gorchymyn cydsynio ar eich rhan. Byddwch yn cael dolenni i arweiniad pellach ar ôl i chi gyflwyno'r cais hwn.`,
  disagreeOnDividingAssets: 'Os ydych yn anghytuno ynghylch rhannu arian ac eiddo',
  disagreeOnDividingAssetsDetails:
    "Gallwch ofyn i'r llys benderfynu ar eich rhan. Gelwir hyn yn gofyn i'r llys wneud 'gorchymyn ariannol'. Mae hyn yn golygu y bydd y llys yn penderfynu sut y caiff asedau eu rhannu. Gallwch hefyd wneud cais am orchymyn ariannol i'ch plant, os yw'n briodol. Gall y llys hefyd orchymyn i daliadau cynhaliaeth gael eu gwneud.",
  readMore: 'Darllenwch fwy am gynhaliaeth plant',
  readMoreContent: `Dim ond o dan rai amgylchiadau y gall y llys wneud gorchmynion ariannol i blant. Gallwch ddod i gytundeb â'ch ${partner} a'i wneud yn gyfreithiol rwymol gyda gorchymyn cydsynio, neu gallwch ddefnyddio'r Gwasanaeth Cynhaliaeth Plant.`,
  costs: `Rhaid i chi wneud cais ar wahân i'r llys am orchymyn ariannol, gan ddefnyddio ffurflen arall. Mae'n costio ${config.get(
    'fees.financialOrder'
  )} yn ychwanegol.`,
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
