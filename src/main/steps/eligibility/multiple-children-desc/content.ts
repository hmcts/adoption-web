import { TranslationFn } from '../../../app/controller/GetController';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const en = content => ({
  title: 'Applying for more than one child',
  line1:
    "If you're applying for more than one child, you must submit a new application for each child. You will not be charged if you submit these before midnight on the day of your first application. If you submit after the day of the first application, you will be charged another £183.",
  line2:
    'Once you have submitted your first application, you can continue from the submission confirmation page and start your next application.',
  line3:
    "If you sign out, you must sign in again using the same email address and password used in your first application.You can save your progress in the application by selecting 'save as draft'. This saves your answers so you can continue working on the application at a later date. You can only submit once all sections are complete.",
  continue: 'Continue',
});

const cy: typeof en = () => ({
  title: 'Applying for more than one child',
  line1:
    'Gallwch wneud cais i fabwysiadu plentyn sydd yn eich gofal yn dilyn <a class="govuk-link" href="/eligibility/start">gorchymyn lleoli gan y llys.</a>',
  line2:
    "Gallwch ddechrau eich cais ar unrhyw adeg fodd bynnag, mae'n rhaid i'r plentyn fod wedi byw gyda chi am o leiaf 10 wythnos cyn y gallwch gyflwyno’r cais.",
  line3:
    "Gallwch gadw eich cais drwy ddewis 'save as draft'. Bydd hyn yn cadw eich atebion fel y gallwch barhau i weithio ar y cais yn hwyrach ymlaen. Dim ond unwaith y bydd pob adran wedi'i chwblhau y gallwch ei gyflwyno.",
  continue: 'Continue',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
