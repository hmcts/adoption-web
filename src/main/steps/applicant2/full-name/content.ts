import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: 'Second applicant',
  title: "What's your full name?",
  firstNames: 'First names',
  firstHint:
    '(Include any given or middle names. Your full name should match exactly what is on your passport or other form of authorised ID such as a driving licence. If the names do not match, this could delay your application.)',
  lastNames: 'Last names',
  lastHint:
    '(Include surname or family names. Your full name should match exactly what is on your passport or other form of authorised ID such as a driving licence. If the names do not match, this could delay your application.)',
  warning:
    'If your name does not match your ID, this may delay your application and the issue of a new birth certificate.',
  errors: {
    applicant2FirstNames: {
      required: 'Enter your first names',
    },
    applicant2LastNames: {
      required: 'Enter your last names',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Ail geisydd',
  title: 'Beth yw eich enw llawn?',
  firstNames: 'Enwau cyntaf',
  firstHint:
    "(Cofiwch gynnwys unrhyw enwau bedydd neu enwau canol. Dylai eich enw llawn gyd-fynd yn union â'r hyn sydd ar eich pasbort neu fath arall o ID awdurdodedig fel trwydded yrru. Os nad yw'r enwau'n cyd-fynd, gallai hyn ohirio eich cais.)",
  lastNames: 'Cyfenwau',
  lastHint:
    "(Cofiwch gynnwys cyfenw neu enwau teuluol. Dylai eich enw llawn gyd-fynd yn union â'r hyn sydd ar eich pasbort neu fath arall o ID awdurdodedig fel trwydded yrru. Os nad yw'r enwau'n cyd-fynd, gallai hyn ohirio eich cais.)",
  warning:
    "Os nad yw eich enw'n cyd-fynd â'ch ID, gallai hyn ohirio eich cais a’r broses o gyhoeddi tystysgrif geni newydd.",
  errors: {
    applicant2FirstNames: {
      required: 'Nac ydwdwch eich enw(au) cyntaf',
    },
    applicant2LastNames: {
      required: 'Nac ydwdwch eich cyfenw(au)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2FirstNames: {
      type: 'text',
      label: l => l.firstNames,
      hint: l => l.firstHint,
      labelSize: 'normal',
      validator: input => isFieldFilledIn(input),
    },
    applicant2LastNames: {
      type: 'text',
      label: l => l.lastNames,
      hint: l => l.lastHint,
      labelSize: 'normal',
      validator: input => isFieldFilledIn(input),
    },
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: l => l.saveAsDraft,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => ({
  ...languages[content.language](),
  form,
});
