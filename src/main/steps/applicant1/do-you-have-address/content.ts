import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import type { CommonContent } from '../../common/common.content';

const en = ({ partner, isDivorce, required }: CommonContent, knowsPartnersEmailAddress: boolean) => ({
  title: `Do you have your ${partner}'s postal address?`,
  line1: `${
    knowsPartnersEmailAddress
      ? `The court needs your ${partner}'s address, to notify them about the ${
          isDivorce ? 'divorce' : 'ending your civil partnership'
        }.`
      : `It’s important you provide your ${partner}'s address. You did not provide their email address and the court needs a way to ‘serve’ (deliver) the ${
          isDivorce ? 'divorce' : 'ending your civil partnership'
        } papers to them.`
  }`,
  line2:
    'It can be their home address or their solicitor’s address. It can be UK or international. If you use their work address, you need to ask their permission.',
  line3: `If you do not know their current address then you can use their last-known address. ${
    !knowsPartnersEmailAddress
      ? 'If they do not respond at the address you provide, then you will need to make a separate application to serve (deliver) the papers to them another way.'
      : ''
  }`,
  haveTheirAddress: 'Yes, I have their address',
  doNotHaveTheirAddress: 'No, I do not have their address',
  errors: {
    applicant1KnowsApplicant2Address: {
      required,
    },
  },
});

const cy: typeof en = ({ partner, isDivorce, required }: CommonContent, knowsPartnersEmailAddress: boolean) => ({
  title: `A oes gennych gyfeiriad post eich ${partner}?`,
  line1: `${
    knowsPartnersEmailAddress
      ? `Mae angen cyfeiriad eich ${partner} ar y llys, i'w hysbysu am yr ${
          isDivorce ? 'ysgariad' : 'y cais i ddod â phartneriaeth sifil i ben'
        }.`
      : `Mae'n bwysig eich bod yn darparu cyfeiriad eich ${partner}. Ni wnaethoch ddarparu ei gyfeiriad/chyfeiriad e-bost ac mae'r llys angen ffordd i 'gyflwyno' (danfon) y papurau ${
          isDivorce ? 'ysgariad' : "dod â'ch partneriaeth sifil i ben"
        } iddo/iddi.`
  }`,
  line2:
    "Gall fod yn gyfeiriad cartref iddo/iddi neu'n gyfeiriad ei gyfreithiwr/chyfreithiwr. Gall fod yn y DU neu'n rhyngwladol. Os ydych yn defnyddio ei gyfeiriad/chyfeiriad gwaith, mae angen i chi ofyn am ganiatâd.",
  line3: `Os nad ydych yn gwybod beth yw ei gyfeiriad/chyfeiriad presennol yna gallwch ddefnyddio ei gyfeiriad/chyfeiriad hysbys diwethaf. ${
    !knowsPartnersEmailAddress
      ? "Os nad yw'n ymateb yn y cyfeiriad a roddwch, yna bydd angen i chi wneud cais ar wahân i gyflwyno (danfon) y papurau ato/ati mewn ffordd arall."
      : ''
  }`,
  haveTheirAddress: 'Oes, mae gennyf ei gyfeiriad/chyfeiriad',
  doNotHaveTheirAddress: 'Na, nid yw ei gyfeiriad/chyfeiriad gennyf',
  errors: {
    applicant1KnowsApplicant2Address: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1KnowsApplicant2Address: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.haveTheirAddress, value: YesOrNo.YES },
        { label: l => l.doNotHaveTheirAddress, value: YesOrNo.NO },
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
  const knowsPartnersEmailAddress = content.userCase?.applicant1DoesNotKnowApplicant2EmailAddress !== Checkbox.Checked;
  const translations = languages[content.language](content, knowsPartnersEmailAddress);
  return {
    ...translations,
    form,
  };
};
