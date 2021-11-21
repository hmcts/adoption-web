import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ isDivorce, required }) => ({
  title: `Did you ${isDivorce ? 'get married' : 'form your civil partnership'} in the UK?`,
  line1: 'The UK is made up of England, Scotland, Wales and Northern Ireland.',
  errors: {
    inTheUk: {
      required,
    },
  },
});

const cy: typeof en = ({ isDivorce, required }) => ({
  title: `A wnaethoch chi ${isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'} yn y DU?`,
  line1: "Mae'r DU yn cynnwys Cymru, Lloegr, Yr Alban a Gogledd Iwerddon.",
  errors: {
    inTheUk: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    inTheUk: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
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
