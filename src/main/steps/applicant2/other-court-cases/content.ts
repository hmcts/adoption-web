import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/other-court-cases/content';

const labels = content => ({
  errors: {
    applicant2LegalProceedings: content.errors.applicant1LegalProceedings,
  },
});

const applicant1FormFields = applicant1Form.fields as FormFields;
export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2LegalProceedings: applicant1FormFields.applicant1LegalProceedings,
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
