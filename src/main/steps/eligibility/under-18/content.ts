import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label: 'Will the child be under 18 years old on the date you submit your application?',
  under18No:
    'You can only apply to adopt a child if they are under 18 years old on the date your application is submitted.',
  moreInfo: 'More about adoption',
  errors: {
    under18Eligible: {
      required: 'Please answer the question',
    },
  },
});

const cy = () => ({
  section: SECTION_IN_WELSH,
  label: 'A fydd y plentyn dan 18 oed ar y dyddiad byddwch yn cyflwyno’ch cais?',
  under18No: 'Gallwch ond mabwysiadu plentyn os ydynt dan 18 oed ar y dyddiad mae eich cais yn cael ei gyflwyno.',
  moreInfo: 'Mwy o wybodaeth am fabwysiadu',
  errors: {
    under18Eligible: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
  },
});

export const form: FormContent = {
  fields: {
    under18Eligible: {
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
            `<p class="govuk-label">${l.under18No}</p> <p class="govuk-label"><a href="https://www.gov.uk/child-adoption">${l.moreInfo}</a></p>`,
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
