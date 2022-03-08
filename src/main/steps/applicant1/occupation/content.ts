import { ApplyingWith } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../../steps/common/common.content';

export const en = ({ userCase }: CommonContent): Record<string, unknown> => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Applicant' : 'First applicant';
  return {
    section,
    label: "What's your occupation?",
    hint: 'Enter your full occupation. For example, ‘Secondary school teacher’ rather than just ‘Teacher’. If you’re self employed, say so. For example, ‘Self employed carpenter’.',
    warningText: {
      text: 'This information will appear on the adoption certificate.',
      iconFallbackText: 'Warning',
    },
    details: {
      summaryText: "I'm not working at the moment",
      html: `If you’re unemployed, say what your occupation was when you were working. For example, 'Unemployed administrative assistant'.
  <br>
  <br>
  If you’re retired, say that you’re retired and what your occupation was when you were working. For example, ‘Retired hairdresser’.
  <br>
  <br>
  If you’re a full time parent, enter ‘Full time parent’.`,
    },
    errors: {
      applicant1Occupation: {
        required: 'Enter your occupation',
      },
    },
  };
};

export const cy = ({ userCase }: CommonContent): Record<string, unknown> => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Applicant (in Welsh)' : 'First applicant (in Welsh)';
  return {
    section,
    label: "What's your occupation? (in Welsh)",
    hint: 'Enter your full occupation. For example, ‘Secondary school teacher’ rather than just ‘Teacher’. If you’re self employed, say so. For example, ‘Self employed carpenter’. (in Welsh)',
    warningText: {
      text: 'This information will appear on the adoption certificate. (in Welsh)',
      iconFallbackText: 'Warning (in Welsh)',
    },
    details: {
      summaryText: "I'm not working at the moment (in Welsh)",
      html: `If you’re unemployed, say what your occupation was when you were working. For example, 'Unemployed administrative assistant'.
    <br>
    <br>
    If you’re retired, say that you’re retired and what your occupation was when you were working. For example, ‘Retired hairdresser’.
    <br>
    <br>
    If you’re a full time parent, enter ‘Full time parent’. (in Welsh)`,
    },
    errors: {
      applicant1Occupation: {
        required: 'Enter your occupation (in Welsh)',
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1Occupation: {
      type: 'text',
      label: l => l.label,
      labelSize: 'l',
      hint: l => l.hint,
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: l => l.saveAsDraft,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => ({
  ...languages[content.language](content),
  form,
});
