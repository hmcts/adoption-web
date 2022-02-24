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
    dateChildMovedIn: {
      lessThanTenWeeks: 'You can only submit 10 weeks after the date the child started living continuously with you',
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
    dateChildMovedIn: {
      lessThanTenWeeks:
        'You can only submit 10 weeks after the date the child started living continuously with you (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    dateChildMovedIn: { type: 'hidden', hidden: true },
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
