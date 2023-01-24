import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title:
    'Is the UK, Channel Islands or Isle of Man the main country of residence (domicile) for you and the other applicant if relevant?',
  domicileNo: 'You cannot apply to adopt a child unless you have a permanent home here.',
  moreInfo: 'More about adoption',
  errors: {
    domicileEligible: {
      required:
        'Select if the UK, Channel Islands or Isle of Man is the main country of residence for you, and the other applicant.',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title:
    'Ai’r DU, Ynysoedd y Sianel, neu Ynys Manaw yw’r brif wlad preswylio (domisil) i chi a’r ceisydd arall os yw’n berthnasol?',
  domicileNo: 'Ni allwch wneud cais i fabwysiadu plentyn oni bai bod gennych gartref parhaol yma.',
  moreInfo: 'Mwy o wybodaeth am fabwysiadu',
  errors: {
    domicileEligible: {
      required:
        "Nodwch os mai'r DU, Ynysoedd y Sianel neu Ynys Manaw yw'r brif wlad yr ydych chi a'r ymgeisydd arall yn byw ynddi.",
    },
  },
});

export const form: FormContent = {
  fields: {
    domicileEligible: {
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
            `<p class="govuk-label">${l.domicileNo}</p> <p class="govuk-label"><a href="https://www.gov.uk/child-adoption" class="govuk-link">${l.moreInfo}</a></p>`,
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
