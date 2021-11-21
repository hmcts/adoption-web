import { ChangedNameHow } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { generateContent as applicant1GenerateContent } from '../../applicant1/check-your-answers/content';
import { CommonContent } from '../../common/common.content';
import * as urls from '../../urls';

const labels = ({ userCase }: CommonContent) => ({
  stepAnswers: {
    [urls.APPLICANT_2 + urls.HOW_DID_YOU_CHANGE_YOUR_NAME]: {
      applicant2NameChangedHow: userCase?.applicant2NameChangedHow
        ?.join(' / ')
        .replace(ChangedNameHow.DEED_POLL, 'Deed poll')
        .replace(ChangedNameHow.MARRIAGE_CERTIFICATE, 'Marriage certificate')
        .replace(ChangedNameHow.OTHER, 'Another way'),
    },
    [urls.APPLICANT_2 + urls.UPLOAD_YOUR_DOCUMENTS]: {
      applicant2UploadedFiles: (userCase?.applicant2DocumentsUploaded || []).length
        ? `${userCase?.applicant2DocumentsUploaded?.reduce(
            (acc, curr) => `${acc}${curr.value?.documentFileName}\n`,
            ''
          )}`
        : false,
    },
  },
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  return {
    ...applicant1GenerateContent(content),
    ...labels(content),
    form,
  };
};
