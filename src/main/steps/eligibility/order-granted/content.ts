import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { Language } from '../../common/common.content';

const en = () => ({
  section: 'Application details',
  title: 'Is the child you are applying to adopt the subject of a court granted Placement Order?',
  orderGrantedNo:
    'Unfortunately you cannot use the online adoption application. You must apply by post for all other types of adoption such as:',
  stepChild: 'adopting a stepchild',
  stepChildUrl: 'https://www.gov.uk/child-adoption/adopting-a-stepchild',
  overseaChild: 'adopting a child from overseas',
  overseaChildUrl: 'https://www.gov.uk/child-adoption/adopting-a-child-from-overseas',
  specialGuardian1: 'adopting a child when you’re their',
  specialGuardian2: 'special guardian',
  specialGuardianUrl: 'https://www.gov.uk/apply-special-guardian',
  ageSixWeeks: 'adopting a child under the age of 6 weeks whose parents have asked for the adoption',
  moreInfo1: 'You can find more information',
  moreInfo2: 'here',
  moreInfo3: 'or contact your social worker for support.',
  moreInfoUrl: 'https://www.gov.uk/child-adoption/applying-for-an-adoption-court-order',
  continue: 'Continue',
  errors: {
    orderGrantedEligible: {
      required: 'Select if the child you are applying to adopt the subject of a court granted Placement Order',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y cais',
  title: 'A yw’r plentyn yr ydych yn gwneud cais i’w fabwysiadu yn destun Gorchymyn Lleoli a ganiatawyd gan y llys?',
  orderGrantedNo:
    "Yn anffodus, ni allwch ddefnyddio'r cais mabwysiadu ar-lein. Mae'n rhaid i chi wneud cais drwy'r post ar gyfer pob math arall o fabwysiadu fel:",
  stepChild: 'mabwysiadu llysblentyn',
  stepChildUrl: 'https://www.gov.uk/mabwysiadu-plentyn/mabwysiadu-llysblentyn',
  overseaChild: 'mabwysiadu plentyn o wlad dramor',
  overseaChildUrl: 'https://www.gov.uk/mabwysiadu-plentyn/mabwysiadu-plentyn-o-wlad-dramor',
  specialGuardian1: 'mabwysiadu plentyn pan ydych yn',
  specialGuardian2: 'warcheidwad arbennig iddynt',
  specialGuardianUrl: 'https://www.gov.uk/apply-special-guardian',
  ageSixWeeks: "mabwysiadu plentyn o dan 6 wythnos oed y mae'r rhieni wedi gofyn i'r plentyn gael ei fabwysiadu",
  moreInfo1: 'Gallwch ddod o hyd i fwy o wybodaeth',
  moreInfo2: 'yma',
  moreInfo3: "neu gysylltu gyda'r gweithiwr cymdeithasol am gefnogaeth.",
  moreInfoUrl: 'https://www.gov.uk/mabwysiadu-plentyn/gwneud-cais-am-orchymyn-mabwysiadu-gan-y-llys',
  continue: 'Parhau',
  yes: 'Ydy',
  no: 'Nac ydy',
  errors: {
    orderGrantedEligible: {
      required:
        'Dewiswch a ydych yw’r plentyn yr ydych yn gwneud cais i’w fabwysiadu yn destun Gorchymyn Lleoli a ganiatawyd gan y llys.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const orderGrantedNotEligibleMessage = (language: Language): string => notEligibleMessage(languages[language]());

const notEligibleMessage = (l: Record<string, never> | ReturnType<typeof en>): string =>
  `<p class="govuk-label">${l.orderGrantedNo}</p>` +
  '<ul class="govuk-list govuk-list--bullet">' +
  `<li><a class="govuk-link" href="${l.stepChildUrl}">${l.stepChild}</a></li>` +
  `<li><a class="govuk-link" href="${l.overseaChildUrl}">${l.overseaChild}</a></li>` +
  `<li>${l.specialGuardian1} <a class="govuk-link" href="${l.specialGuardianUrl}">${l.specialGuardian2}</a></li>` +
  `<li>${l.ageSixWeeks}</li>` +
  '</ul>' +
  `<p class="govuk-label">${l.moreInfo1} <a class="govuk-link" href="${l.moreInfoUrl}">${l.moreInfo2}</a> ${l.moreInfo3}</p>`;

export const form: FormContent = {
  fields: {
    orderGrantedEligible: {
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
          conditionalText: notEligibleMessage,
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
