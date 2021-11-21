import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/details-other-proceedings/content';

const labels = applicant1Content => ({
  applicant2LegalProceedingsDetails: 'Provide details about the other legal proceedings using the information above.',
  errors: {
    applicant2LegalProceedingsDetails: applicant1Content.errors.applicant1LegalProceedingsDetails,
  },
});

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2LegalProceedingsDetails: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.applicant2LegalProceedingsDetails,
      labelSize: 'normal',
      validator: isFieldFilledIn,
    },
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
