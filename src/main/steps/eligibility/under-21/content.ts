import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: 'Are you, and the other applicant if relevant, both aged 21 or over?',
  under21Yes: 'You must be 21 or over to adopt a child. This includes any other applicant.',
  moreInfo: 'More about adoption',
  errors: {
    under21Eligible: {
      required: 'Please answer the question',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'Ydych chi, a’r ceisydd arall os yw’n berthnasol, yn 21 oed neu’n hŷn?',
  under21Yes: 'Rhaid i chi fod yn 21 oed o leiaf i fabwysiadu plentyn. Mae hyn yn cynnwys unrhyw geisydd arall.',
  moreInfo: 'Mwy o wybodaeth am fabwysiadu',
  errors: {
    under21Eligible: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
  },
});

export const form: FormContent = {
  fields: {
    under21Eligible: {
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
          conditionalText: l =>
            `<p class="govuk-label">${l.under21Yes}</p> <p class="govuk-label"><a href="https://www.gov.uk/child-adoption">${l.moreInfo}</a></p>`,
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
