import { ResponsibilityReasons } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../../constants';

const en = () => ({
  section: SECTION,
  title: 'How was parental responsibility granted to the birth father?',
  hint: 'Select all options that are relevant.',
  courtOrder: 'Court order',
  birthCertificate: 'Birth certificate',
  responsibilityOrder: 'Parental responsibility order',
  responsibilityAgreement: 'Parental responsibility agreement',
  otherReason: 'Other',
  otherHint: 'Enter the reason how parental responsibility was granted to the birth father.',
  errors: {
    birthFatherResponsibilityReason: {
      required: 'Select how parental responsibility was granted to the birth father.',
    },
    birthFatherOtherResponsibilityReason: {
      required: 'Enter the reason how parental responsibility was granted to the birth father',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'Sut caniatawyd cyfrifoldeb rhiant i’r tad genedigol?',
  hint: 'Dewiswch bob opsiwn sy’n berthnasol i chi.',
  courtOrder: 'Gorchymyn llys',
  birthCertificate: 'Tystysgrif geni',
  responsibilityOrder: 'Gorchymyn cyfrifoldeb rhiant',
  responsibilityAgreement: 'Cytundeb cyfrifoldeb rhiant',
  otherReason: 'Arall',
  otherHint: "Nodwch y rheswm sut y rhoddwyd cyfrifoldeb rhiant i'r tad biolegol.",
  errors: {
    birthFatherResponsibilityReason: {
      required: 'Dewiswch sut caniatawyd cyfrifoldeb rhiant i’r tad genedigol',
    },
    birthFatherOtherResponsibilityReason: {
      required: "Nodwch y rheswm sut y rhoddwyd cyfrifoldeb rhiant i'r tad biolegol.",
    },
  },
});

export const form: FormContent = {
  fields: {
    birthFatherResponsibilityReason: {
      type: 'checkboxes',
      label: l => l.title,
      labelSize: 'l',
      hint: l => l.hint,
      labelHidden: true,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'birthFatherResponsibilityReason',
          label: l => l.birthCertificate,
          value: ResponsibilityReasons.BIRTH_CERTIFICATE,
        },
        {
          name: 'birthFatherResponsibilityReason',
          label: l => l.courtOrder,
          value: ResponsibilityReasons.COURT_ORDER,
        },
        {
          name: 'birthFatherResponsibilityReason',
          label: l => l.responsibilityOrder,
          value: ResponsibilityReasons.RESPONSIBILITY_ORDER,
        },
        {
          name: 'birthFatherResponsibilityReason',
          label: l => l.responsibilityAgreement,
          value: ResponsibilityReasons.RESPONSIBILITY_AGREEMENT,
        },
        {
          name: 'birthFatherResponsibilityReason',
          label: l => l.otherReason,
          value: ResponsibilityReasons.OTHER,
          subFields: {
            birthFatherOtherResponsibilityReason: {
              name: 'birthFatherOtherResponsibilityReason',
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
