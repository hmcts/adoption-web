import { ApplyingWith } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../../steps/common/common.content';

const en = ({ userCase }: CommonContent) => {
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

const cy: typeof en = ({ userCase }: CommonContent) => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Ceisydd' : 'Ceisydd cyntaf';
  return {
    section,
    label: 'Beth yw eich galwedigaeth?',
    hint: 'Nodwch eich galwedigaeth yn llawn. Er enghraifft, ‘Athro Ysgol Uwchradd’ yn hytrach na ‘Athro’ yn unig. Os ydych yn hunangyflogedig, dywedwch hynny. Er enghraifft, ‘Saer hunangyflogedig.’',
    warningText: {
      text: 'Bydd yr wybodaeth hon yn ymddangos ar y dystysgrif mabwysiadu.',
      iconFallbackText: 'Rhybudd',
    },
    details: {
      summaryText: 'Nid wyf yn gweithio ar hyn o bryd',
      html: 'Os ydych yn ddi-waith, nodwch beth oedd eich galwedigaeth pan oeddech yn gweithio. Er enghraifft, ‘Cynorthwyydd Gweinyddol Di-waith’.<br><br>Os ydych wedi ymddeol, nodwch beth oedd eich galwedigaeth pan oeddech yn gweithio. Er enghraifft, ‘Triniwr Gwallt Wedi Ymddeol’.<br><br>Os ydych yn riant amser llawn, nodwch ‘Rhiant amser llawn’.',
    },
    errors: {
      applicant1Occupation: {
        required: 'Nodwch eich galwedigaeth',
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
