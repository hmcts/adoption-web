import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title:
    'Have you, and the other applicant if relevant, lived in the UK, Channel Islands or Isle of Man for the last 12 months (habitually resident)?',
  livedUKNo: 'You cannot apply to adopt a child unless you have a permanent home here.',
  moreInfo: 'More about adoption',
  errors: {
    livedUKEligible: {
      required: 'Please answer the question',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title:
    'A ydych chi, a’r ceisydd arall os yw’n berthnasol, wedi byw yn y DU, Ynysoedd y Sianel neu Ynys Manaw am y 12 mis diwethaf (preswylio’n arferol)?',
  livedUKNo: 'Ni allwch wneud cais i fabwysiadu plentyn oni bai bod gennych gartref parhaol yma.',
  moreInfo: 'Mwy o wybodaeth am fabwysiadu',
  errors: {
    livedUKEligible: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
  },
});

export const form: FormContent = {
  fields: {
    livedUKEligible: {
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
