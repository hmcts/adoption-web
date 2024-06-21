import { ApplyingWith } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';
import { form as fullNameForm, generateContent as fullNameGenerateContent } from '../../common/components/full-name';

const en = ({ userCase }: CommonContent) => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Applicant' : 'First applicant';
  return {
    section,
    title: "What's your full name?",
    warning:
      'If your name does not match your ID, this may delay your application and the issue of a new birth certificate.',
    firstNamesHint: '(Include any given or middle names. Your full name should match exactly what is on your passport or other form of authorised ID such as a driving licence. If the names do not match, this could delay your application.)',
    lastNamesHint: '(Include surname or family names. Your full name should match exactly what is on your passport or other form of authorised ID such as a driving licence. If the names do not match, this could delay your application.)',
    errors: {
      applicant1FirstNames: {
        required: 'Enter your first names',
      },
      applicant1LastNames: {
        required: 'Enter your last names',
      },
    },
  };
};

const cy: typeof en = ({ userCase }: CommonContent) => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Ceisydd' : 'Ceisydd cyntaf';
  return {
    section,
    title: 'Beth yw eich enw llawn?',
    warning:
      'Os nad yw eich enw\'n cyd-fynd â\'ch ID, gallai hyn ohirio eich cais a’r broses o gyhoeddi tystysgrif geni newydd.',
    firstNamesHint: '(Cofiwch gynnwys unrhyw enwau bedydd neu enwau canol. Dylai eich enw llawn gyd-fynd yn union â\'r hyn sydd ar eich pasbort neu fath arall o ID awdurdodedig fel trwydded yrru. Os nad yw\'r enwau\'n cyd-fynd, gallai hyn ohirio eich cais.)',
    lastNamesHint: '(Cofiwch gynnwys cyfenw neu enwau teuluol. Dylai eich enw llawn gyd-fynd yn union â\'r hyn sydd ar eich pasbort neu fath arall o ID awdurdodedig fel trwydded yrru. Os nad yw\'r enwau\'n cyd-fynd, gallai hyn ohirio eich cais.)',
    errors: {
      applicant1FirstNames: {
        required: 'Nodwch eich enw(au) cyntaf',
      },
      applicant1LastNames: {
        required: 'Nodwch eich cyfenw(au)',
      },
    },
  };
};

const fullNameFormFields = fullNameForm.fields as FormFields;
export const form: FormContent = {
  ...fullNameForm,
  fields: {
    applicant1FirstNames: fullNameFormFields.firstNames,
    applicant1LastNames: fullNameFormFields.lastNames,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const fullNameContent = fullNameGenerateContent(content);
  return {
    ...fullNameContent,
    ...languages[content.language](content),
    form,
  };
};
