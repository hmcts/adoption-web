import config from 'config';

import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import type { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, divorce, endingCivilPartnership }: CommonContent) => {
  const dissolution = isDivorce ? divorce : endingCivilPartnership;
  return {
    title: 'You need to get their address',
    line1:
      'Save your application and try to find their address. It can be their postal address or their solicitor’s address. It can be UK or international. If you use their work address, you need to ask their permission.',
    line2: 'To find their address you could try contacting their:',
    bullet1: 'relatives',
    bullet2: 'friends',
    bullet3: 'last-known employer',
    bullet4: 'trade union or professional organisation',
    cannotGetAddressTitle: 'If you cannot get their address',
    cannotGetAddressLine1: `If you know you cannot get their address then you can apply to have the ${dissolution} papers ‘served’ (delivered) to them another way. For example by email, text message or social media. This is a separate application which will be reviewed by a judge and costs an additional ${config.get(
      'fees.alternativeService'
    )}.`,
    iWantToHavePapersServedAnotherWay: `I want to apply to have the ${dissolution} papers ‘served’ (delivered) to them another way.`,
  };
};

const cy: typeof en = ({ isDivorce, divorce, endingCivilPartnership }: CommonContent) => {
  const dissolution = isDivorce ? divorce : endingCivilPartnership;
  return {
    title: "Mae angen i chi ddod o hyd i'w gyfeiriad/chyfeiriad",
    line1:
      "Cadwch eich cais a cheisiwch ddod o hyd i'w gyfeiriad/chyfeiriad. Gall fod yn gyfeiriad post neu gyfeiriad ei gyfreithiwr/chyfreithiwr. Gall fod yn y DU neu'n rhyngwladol. Os ydych yn defnyddio ei gyfeiriad/chyfeiriad gwaith, mae angen i chi ofyn am ei ganiatâd/chaniatâd.",
    line2: "I ddod o hyd i'w gyfeiriad/chyfeiriad gallech geisio cysylltu â'i:",
    bullet1: 'b/pherthnasau',
    bullet2: 'ffrindiau',
    bullet3: 'cyflogwr hysbys diwethaf',
    bullet4: 'undeb llafur neu sefydliad proffesiynol',
    cannotGetAddressTitle: "Os na allwch ddod o hyd i'w gyfeiriad/chyfeiriad",
    cannotGetAddressLine1: `Os ydych chi'n gwybod na allwch ddod o hyd i'w gyfeiriad/chyfeiriad, yna gallwch wneud cais i gael y papurau ${dissolution} wedi'u 'cyflwyno' (wedi'u danfon) iddo/iddi mewn ffordd arall. Er enghraifft drwy e-bost, neges testun neu gyfryngau cymdeithasol. Bydd hwn yn gais ar wahân a fydd yn cael ei adolygu gan farnwr a bydd yn costio ${config.get(
      'fees.alternativeService'
    )} yn ychwanegol.`,
    iWantToHavePapersServedAnotherWay: `Rwyf eisiau gwneud cais i gael y papurau ${dissolution} wedi'u 'cyflwyno' (wedi'u danfon) iddo/iddi mewn ffordd arall.`,
  };
};

export const form: FormContent = {
  fields: {
    iWantToHavePapersServedAnotherWay: {
      type: 'checkboxes',
      labelHidden: true,
      values: [
        {
          name: 'iWantToHavePapersServedAnotherWay',
          label: l => l.iWantToHavePapersServedAnotherWay,
          value: Checkbox.Checked,
        },
      ],
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
