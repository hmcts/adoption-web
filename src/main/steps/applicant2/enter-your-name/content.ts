import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/enter-your-name/content';

const labels = content => ({
  errors: {
    applicant2FirstNames: content.errors.applicant1FirstNames,
    applicant2MiddleNames: content.errors.applicant1MiddleNames,
    applicant2LastNames: content.errors.applicant1LastNames,
  },
});

const applicant1FormFields = applicant1Form.fields as FormFields;
export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2FirstNames: applicant1FormFields.applicant1FirstNames,
    applicant2MiddleNames: applicant1FormFields.applicant1MiddleNames,
    applicant2LastNames: applicant1FormFields.applicant1LastNames,
  },
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(applicant1Content),
    form,
  };
};
