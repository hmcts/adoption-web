import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';

const en = ({ userCase }: CommonContent) => {
  const changeAddressBothApplicants = userCase?.changeAddressBothApplicants;

  return {
    section: 'Second applicant',
    title: 'Address changed',
    changeApplicantText: `${
      changeAddressBothApplicants === 'Yes'
        ? "Both applicants' addresses have now been changed"
        : 'Your address has now been changed'
    }`,
  };
};

const cy: typeof en = ({ userCase }: CommonContent) => {
  const changeAddressBothApplicants = userCase?.changeAddressBothApplicants;

  return {
    section: 'Second applicant (in welsh)',
    title: 'Address changed (in welsh)',
    changeApplicantText: `${
      changeAddressBothApplicants === 'Yes'
        ? "Both applicants' addresses have now been changed (in welsh)"
        : 'Your address has now been changed (in welsh)'
    }`,
  };
};

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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
