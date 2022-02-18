import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label: 'Is the child married or in a civil partnership?',
  hint: 'This includes any past marriages or civil partnerships. In the UK a child can get married at 16 with parental permission. In other countries this age may be lower. A child who is married or in a civil partnership cannot be adopted.',
  marriedYes: "You can only apply to adopt a child if they've not been married or in a civil partnership.",
  moreInfo: 'More about adoption',
  errors: {
    marriedEligible: {
      required: 'Please answer the question',
    },
  },
});

const cy = () => ({
  section: SECTION_IN_WELSH,
  label: 'Is the child married or in a civil partnership? (in welsh)',
  hint: 'This includes any past marriages or civil partnerships. In the UK a child can get married at 16 with parental permission. In other countries this age may be lower. A child who is married or in a civil partnership cannot be adopted. (in welsh)',
  marriedYes: "You can only apply to adopt a child if they've not been married or in a civil partnership. (in welsh)",
  moreInfo: 'More about adoption (in welsh)',
  errors: {
    marriedEligible: {
      required: 'Please answer the question (in welsh)',
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
      hint: l => l.hint,
      labelHidden: false,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          conditionalText: l =>
            `<p class="govuk-label">${l.marriedYes}</p> <p class ="govuk-label"><a href="https://www.gov.uk/child-adoption">${l.moreInfo}</a></p>`,
        },
        { label: l => l.no, value: YesOrNo.NO },
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
