import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: 'Is the child married or in a civil partnership?',
  hint: 'This includes any past marriages or civil partnerships. In some parts of the UK a child can get married at 16 with parental permission. In other countries this age may be lower. A child who is married or in a civil partnership cannot be adopted.',
  marriedYes: "You can only apply to adopt a child if they've not been married or in a civil partnership.",
  moreInfo: 'More about adoption',
  continue: 'Continue',
  errors: {
    marriedEligible: {
      required: 'Select if the child is married or in a civil partnership.',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'A yw’r plentyn wedi priodi neu mewn partneriaeth sifil?',
  hint: 'Mae hyn yn cynnwys unrhyw briodasau neu bartneriaethau sifil yn y gorffennol. Yn rhai rhannau o y DU gall plentyn briodi yn 16 oed heb ganiatâd gan riant. Mewn gwledydd eraill, gan yr oedran hwn fod yn is. Ni all plentyn sydd wedi /oedd wedi priodi, neu sydd mewn / wedi bod mewn partneriaeth sifil gael ei fabwysiadu.',
  marriedYes: 'Gallwch ond wneud cais i fabwysiadu plentyn os nad ydynt wedi priodi ac ddim mewn partneriaeth sifil.',
  moreInfo: 'Mwy o wybodaeth am fabwysiadu',
  continue: 'Parhau',
  errors: {
    marriedEligible: {
      required: "Nodwch a yw'r plentyn yn briod neu mewn partneriaeth sifil.",
    },
  },
});

export const form: FormContent = {
  fields: {
    marriedEligible: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      section: l => l.section,
      hint: l => l.hint,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          conditionalText: l =>
            `<p class="govuk-label">${l.marriedYes}</p> <p class="govuk-label"><a rel="noreferrer noopener" href="https://www.gov.uk/child-adoption" class="govuk-link">${l.moreInfo}</a></p>`,
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
