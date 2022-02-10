import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = (): Record<string, unknown> => ({
  section: 'Review your application, pay and send',
  title: 'Check your answers',
  submitApplication: 'Submit your application',
  checkInfoBeforeSubmit:
    'You should check that all the information given in your application is correct before you submit. Once submitted, your application will be sent to the court for processing.',
  continue: 'Continue',
  errors: {
    dateError: {
      dateChildMovedIn: 'It has not been 10 weeks since the child started living with you',
    },
  },
});

const cy = (): Record<string, unknown> => ({
  section: 'Review your application, pay and send (in welsh)',
  title: 'Check your answers (in welsh)',
  submitApplication: 'Submit your application (in welsh)',
  checkInfoBeforeSubmit:
    'You should check that all the information given in your application is correct before you submit. Once submitted, your application will be sent to the court for processing. (in welsh)',
  continue: 'Continue (in welsh)',
  errors: {
    dateError: {
      dateChildMovedIn: 'It has not been 10 weeks since the child started living with you (in Welsh)',
    },
  },
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
