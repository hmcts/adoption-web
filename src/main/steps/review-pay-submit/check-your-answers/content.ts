import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = (): Record<string, unknown> => ({
  title: 'Check your answers',
  line1: 'This page will be updated soon with information filled so far.',
  line2: 'For now you can test Fee and Pay integration to pay the adoption application fee using online card payment.',
  continue: 'Pay and submit application',
});

const cy = (): Record<string, unknown> => ({
  title: 'Check your answers (in welsh)',
  line1: 'This page will be updated soon with information filled so far. (in welsh)',
  line2:
    'For now you can test Fee and Pay integration to pay the adoption application fee using online card payment. (in welsh)',
  continue: 'Pay and submit application (in welsh)',
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
