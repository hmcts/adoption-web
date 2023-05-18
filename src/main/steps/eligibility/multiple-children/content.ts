import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: 'Application details',
  title: 'Are you applying to adopt more than one child?',
  continue: 'Continue',
  errors: {
    multipleChildrenEligible: {
      required: 'Select if you are applying to adopt more than one child',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y cais',
  title: 'Ydych chi’n gwneud cais i fabwysiadu mwy nag un plentyn?',
  continue: 'Parhau',
  errors: {
    multipleChildrenEligible: {
      required: 'Dewiswch a ydych chi’n gwneud cais i fabwysiadu mwy nag un plentyn',
    },
  },
});

export const form: FormContent = {
  fields: {
    multipleChildrenEligible: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      section: l => l.section,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        {
          label: l => l.no,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: '',
  },
  hideContactHelpSection: true,
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
