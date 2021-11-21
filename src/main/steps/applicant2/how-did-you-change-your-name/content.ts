import { ChangedNameHow } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, ValidationCheck } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/how-did-you-change-your-name/content';

const labels = applicant1Content => {
  return {
    errors: {
      applicant2NameChangedHow: {
        required: applicant1Content.errors.applicant1NameChangedHow.required,
        applicant2ChangedNameHowAnotherWay:
          applicant1Content.errors.applicant1NameChangedHow.applicant1ChangedNameHowAnotherWay,
      },
    },
  };
};

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2NameChangedHow: {
      type: 'checkboxes',
      label: l => l.title,
      labelHidden: true,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'applicant2NameChangedHow',
          label: l => l.sendingOffMarriageCertificate,
          value: ChangedNameHow.MARRIAGE_CERTIFICATE,
        },
        {
          name: 'applicant2NameChangedHow',
          label: l => l.deedPoll,
          value: ChangedNameHow.DEED_POLL,
          conditionalText: l => `<p class="govuk-label">${l.deedPollMoreDetails}</p>`,
        },
        {
          name: 'applicant2NameChangedHow',
          label: l => l.anotherWay,
          value: ChangedNameHow.OTHER,
          subFields: {
            applicant2ChangedNameHowAnotherWay: {
              type: 'textarea',
              label: l => l.anotherWayMoreDetails,
              labelSize: null,
            },
          },
          validator: ((value, formData) => {
            if (
              (value as string[])?.includes(ChangedNameHow.OTHER) &&
              !formData.applicant2ChangedNameHowAnotherWay?.length
            ) {
              return 'applicant2ChangedNameHowAnotherWay';
            }
          }) as ValidationCheck,
        },
      ],
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
