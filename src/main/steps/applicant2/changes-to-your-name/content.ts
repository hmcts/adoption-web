import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/changes-to-your-name/content';
import { CommonContent } from '../../common/common.content';

const labels = ({ required }: CommonContent) => {
  return {
    errors: {
      applicant2LastNameChangedWhenRelationshipFormed: {
        required,
      },
      applicant2NameChangedSinceRelationshipFormed: {
        required,
      },
    },
  };
};

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2LastNameChangedWhenRelationshipFormed: (applicant1Form.fields as FormFields)
      .applicant1LastNameChangedWhenRelationshipFormed,
    applicant2NameChangedSinceRelationshipFormed: (applicant1Form.fields as FormFields)
      .applicant1NameChangedSinceRelationshipFormed,
  },
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(content),
    form,
  };
};
