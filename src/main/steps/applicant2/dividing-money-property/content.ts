import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/dividing-money-property/content';

const labels = {
  readMore: 'Read more about child maintenance and financial orders',
};

export const form: FormContent = {
  ...applicant1Form,
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels,
    form,
  };
};
