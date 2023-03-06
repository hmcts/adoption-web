import { ResponsibilityReasons } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: 'How parental responsibility was granted to the other person?',
  hint: 'Select all options that are relevant.',
  courtOrder: 'Court order',
  birthCertificate: 'Birth certificate',
  responsibilityOrder: 'Parental responsibility order',
  responsibilityAgreement: 'Parental responsibility agreement',
  otherReason: 'Other',
  otherHint: 'Enter the reason how parental responsibility was granted to the other person.',
  errors: {
    otherParentResponsibilityReason: {
      required: 'Select how parental responsibility was granted to the other person.',
    },
    otherParentOtherResponsibilityReason: {
      required: 'Enter the reason how parental responsibility was granted to the other person.',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'Sut caniatawyd cyfrifoldeb rhiant i’r unigolyn arall?',
  hint: 'Dewiswch bob opsiwn sy’n berthnasol i chi.',
  courtOrder: 'Gorchymyn llys',
  birthCertificate: 'Tystysgrif geni',
  responsibilityOrder: 'Gorchymyn cyfrifoldeb rhiant',
  responsibilityAgreement: 'Cytundeb cyfrifoldeb rhiant',
  otherReason: 'Arall',
  otherHint: 'Rhowch y rheswm dros sut caniatawyd cyfrifoldeb rhiant i’r unigolyn arall.',
  errors: {
    otherParentResponsibilityReason: {
      required: 'Dewiswch sut y caniatawyd cyfrifoldeb rhiant i’r unigolyn arall',
    },
    otherParentOtherResponsibilityReason: {
      required: 'Rhowch y rheswm dros sut caniatawyd cyfrifoldeb rhiant i’r unigolyn arall.',
    },
  },
});

export const form: FormContent = {
  fields: {
    otherParentResponsibilityReason: {
      type: 'checkboxes',
      label: l => l.title,
      labelSize: 'l',
      hint: l => l.hint,
      labelHidden: true,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'otherParentResponsibilityReason',
          label: l => l.birthCertificate,
          value: ResponsibilityReasons.BIRTH_CERTIFICATE,
        },
        {
          name: 'otherParentResponsibilityReason',
          label: l => l.courtOrder,
          value: ResponsibilityReasons.COURT_ORDER,
        },
        {
          name: 'otherParentResponsibilityReason',
          label: l => l.responsibilityOrder,
          value: ResponsibilityReasons.RESPONSIBILITY_ORDER,
        },
        {
          name: 'otherParentResponsibilityReason',
          label: l => l.responsibilityAgreement,
          value: ResponsibilityReasons.RESPONSIBILITY_AGREEMENT,
        },
        {
          name: 'otherParentResponsibilityReason',
          label: l => l.otherReason,
          value: ResponsibilityReasons.OTHER,
          subFields: {
            otherParentOtherResponsibilityReason: {
              name: 'otherParentOtherResponsibilityReason',
              type: 'text',
              classes: 'govuk-!-width-two-thirds',
              label: l => l.otherHint,
              labelSize: null,
              validator: isFieldFilledIn,
            },
          },
        },
      ],
    },
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: l => l.saveAsDraft,
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
