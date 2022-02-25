import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label:
    'Have you, and the other applicant if relevant, lived in the UK, Channel Islands or Isle of Man for the last 12 months (habitually resident)?',
  livedUKNo: 'You cannot apply to adopt a child unless you have a permanent home here.',
  moreInfo: 'More about adoption',
  errors: {
    livedUKEligible: {
      required: 'Please answer the question',
    },
  },
});

const cy = () => ({
  section: SECTION_IN_WELSH,
  label:
    'Have you, and the other applicant if relevant, lived in the UK, Channel Islands or Isle of Man for the last 12 months (habitually resident)? (in welsh)',
  livedUKNo: 'You cannot apply to adopt a child unless you have a permanent home here. (in welsh)',
  moreInfo: 'More about adoption (in welsh)',
  errors: {
    livedUKEligible: {
      required: 'Please answer the question (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    livedUKEligible: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      labelHidden: false,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          conditionalText: l =>
            `<p class="govuk-label">${l.livedUKNo}</p> <p class="govuk-label"><a href="https://www.gov.uk/child-adoption">${l.moreInfo}</a></p>`,
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
