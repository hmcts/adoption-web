import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Check you're eligible to adopt",
  label: 'Has the child ever been married or in a civil partnership?',
  one: 'Yes',
  two: 'No',
  marriedYes: "You can only apply to adopt a child if they've not been married or in a civil partnership.",
  errors: {
    marriedEligible: {
      required: 'Select whether the child has ever been married or in a civil partnership',
    },
  },
});

const cy = () => ({
  section: "Check you're eligible to adopt (in welsh)",
  label: 'Has the child ever been married or in a civil partnership? (in welsh)',
  one: 'Yes (in welsh)',
  two: 'No (in welsh)',
  marriedYes: "You can only apply to adopt a child if they've not been married or in a civil partnership. (in welsh)",
  errors: {
    marriedEligible: {
      required: 'Select whether the child has ever been married or in a civil partnership (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    marriedEligible: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      labelHidden: false,
      values: [
        { label: l => l.one, value: YesOrNo.YES, conditionalText: l => `<p class="govuk-label">${l.marriedYes}</p>` },
        { label: l => l.two, value: YesOrNo.NO },
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
