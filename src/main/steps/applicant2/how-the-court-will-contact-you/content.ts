import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/how-the-court-will-contact-you/content';

const labels = content => {
  return {
    errors: {
      applicant2AgreeToReceiveEmails: content.errors.applicant1AgreeToReceiveEmails,
      applicant2PhoneNumber: content.errors.applicant1PhoneNumber,
    },
  };
};

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2AgreeToReceiveEmails: {
      type: 'checkboxes',
      label: l => l.byEmail,
      labelSize: 'm',
      hint: l =>
        `<p class="govuk-body">${l.byEmailLine1}</p>
        <p class="govuk-body">${l.byEmailLine2} <strong>${l.userEmail}</strong></p>`,
      validator: isFieldFilledIn,
      values: [
        {
          name: 'applicant2AgreeToReceiveEmails',
          label: l => l.applicantAgreeToReceiveEmails,
          value: Checkbox.Checked,
        },
      ],
    },
    applicant2PhoneNumber: {
      type: 'tel',
      label: l => l.byPhone,
      hint: l =>
        `<p class="govuk-body">${l.byPhoneLine1}</p>
        <label class="govuk-label govuk-!-font-weight-bold" for="applicant2PhoneNumber">${l.applicantPhoneNumber}</label>`,
      classes: 'govuk-input govuk-input--width-20',
      validator: isPhoneNoValid,
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
