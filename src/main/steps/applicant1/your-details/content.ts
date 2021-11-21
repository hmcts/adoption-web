import { Checkbox } from '../../../app/case/case';
import { Gender } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ isDivorce, required }) => ({
  title: isDivorce ? 'Who are you applying to divorce?' : 'Are you male or female?',
  male: isDivorce ? 'My husband' : 'Male',
  female: isDivorce ? 'My wife' : 'Female',
  appliesToYou: 'Same-sex couples',
  sameSex: `We were a same-sex couple when we ${isDivorce ? 'got married' : 'formed our civil partnership'}`,
  errors: {
    gender: {
      required,
    },
  },
});

const cy = ({ isDivorce, required }) => ({
  title: isDivorce ? 'Pwy ydych chi eisiau ei (h)ysgaru?' : "Ydych chi'n wryw ynteu'n fenyw?",
  male: isDivorce ? 'Fy ngŵr' : 'Gwryw',
  female: isDivorce ? 'Fy ngwraig' : 'Benyw',
  appliesToYou: "Dewiswch y canlynol os yw'n berthnasol ichi:",
  sameSex: `Roedden ni'n gwpl o'r un rhyw pan wnaethom ni ${isDivorce ? 'briodi ' : 'ffurfio ein partneriaeth sifil'}`,
  errors: {
    gender: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    gender: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.male, value: Gender.MALE },
        { label: l => l.female, value: Gender.FEMALE },
      ],
      validator: value => isFieldFilledIn(value),
    },
    sameSex: {
      type: 'checkboxes',
      label: l => l.appliesToYou,
      values: [{ name: 'sameSex', label: l => l.sameSex, value: Checkbox.Checked }],
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
