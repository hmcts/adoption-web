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
    line1:
      'Your full name should match exactly what is on your passport or other form of authorised ID such as a driving licence. If the names do not match, this could delay your application',
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
    line1:
      'Dylai eich enw llawn fod union yr un fath ag y mae ar eich pasbort neu fath arall o ddogfen adnabod awdurdodedig, er enghraifft trwydded yrru. Os nad ydynt yr un fath, gall arwain at oedi wrth ddelio â’ch cais.',
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
