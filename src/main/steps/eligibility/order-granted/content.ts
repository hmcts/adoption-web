import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

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
  moreInfoUrl: 'https://www.gov.uk/child-adoption',
  continue: 'Continue',
  errors: {
    orderGrantedEligible: {
      required: 'Select if the child you are applying to adopt the subject of a court granted Placement Order',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y cais',
  title: 'Ydych chi’n gwneud cais i fabwysiadu mwy nag un plentyn?',
  orderGrantedNo:
    '(Welsh) - Unfortunately you cannot use the online adoption application.  You must apply by post for all other types of adoption such as:',
  stepChild: 'adopting a stepchild',
  stepChildUrl: 'https://www.gov.uk/mabwysiadu-plentyn/mabwysiadu-llysblentyn',
  overseaChild: 'adopting a child from overseas',
  overseaChildUrl: 'https://www.gov.uk/mabwysiadu-plentyn/mabwysiadu-plentyn-o-wlad-dramor',
  specialGuardian1: 'adopting a child when you’re their ',
  specialGuardian2: 'special guardian',
  specialGuardianUrl: 'https://www.gov.uk/apply-special-guardian',
  ageSixWeeks: 'adopting a child under the age of 6 weeks whose parents have asked for the adoption',
  moreInfo1: 'You can find more information',
  moreInfo2: 'here',
  moreInfo3: 'or contact your social worker for support.',
  moreInfoUrl: 'https://www.gov.uk/mabwysiadu-plentyn',
  continue: 'Parhau',
  yes: 'Ydw',
  no: 'Nac ydw',
  errors: {
    orderGrantedEligible: {
      required: 'Dewiswch a ydych chi’n gwneud cais i fabwysiadu mwy nag un plentyn',
    },
  },
});

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
          conditionalText: l =>
            `<p class="govuk-label">${l.orderGrantedNo}</p>` +
            '<ul class="govuk-list govuk-list--bullet">' +
            `<li><a class="govuk-link" href="${l.stepChildUrl}">${l.stepChild}</a></li>` +
            `<li><a class="govuk-link" href="${l.overseaChildUrl}">${l.overseaChild}</a></li>` +
            `<li>${l.specialGuardian1} <a class="govuk-link" href="${l.specialGuardianUrl}">${l.specialGuardian2}</a></li>` +
            `<li>${l.ageSixWeeks}</li>` +
            '</ul>' +
            `<p class="govuk-label">${l.moreInfo1} <a class="govuk-link" href="${l.moreInfoUrl}">${l.moreInfo2}</a> ${l.moreInfo3}</p>`,
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
