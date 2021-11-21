import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = {
  title: 'Details of the other legal proceedings',
  line1: `The court needs to know the details of the other legal proceedings. Provide 
  as much information as possible, such as:`,
  point1: 'the names of the people involved',
  point2: 'the case number(s)',
  point3: "if the proceedings are ongoing of if they've finished",
  point4: 'what the proceedings are about',
  point5: 'the name and address of a court, including the country',
  point6: 'the date the proceedings began',
  point7: 'the dates of any hearings that have been scheduled',
  point8: 'the details of any orders that have been made',
  applicant1LegalProceedingsDetails: 'Provide details about the other legal proceedings.',
  errors: {
    applicant1LegalProceedingsDetails: {
      required: 'You have not provided any information. You need to enter details of the other legal proceedings.',
    },
  },
};

//TODO Translation
const cy = en;

export const form: FormContent = {
  fields: {
    applicant1LegalProceedingsDetails: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.applicant1LegalProceedingsDetails,
      labelSize: 'normal',
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
