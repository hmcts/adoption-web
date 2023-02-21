import { ResponsibilityReasons } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../../constants';

const en = () => ({
  section: SECTION,
  title: 'Why does the birth father not have parental responsibility?',
  hint: 'Select all options that are relevant.',
  removedByCourt: 'Parental responsibility removed by court',
  neverObtained: 'Parental responsibility never obtained',
  otherReason: 'Other',
  otherHint: 'Enter the reason why the birth father does not have parental responsibility',
  errors: {
    birthFatherNoResponsibility: {
      required: 'Select why the birth father does not have parental responsibility.',
    },
    otherResponsibilityReason: {
      required: 'Enter the reason why the birth father does not have parental responsibility.',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'Pam nad oes gan y tad genedigol gyfrifoldeb rhiant?',
  hint: 'Dewiswch bob opsiwn sy’n berthnasol i chi.',
  removedByCourt: 'Cyfrifoldeb rhiant wedi ei ddileu gan y llys',
  neverObtained: 'Ni chafwyd cyfrifoldeb rhiant erioed',
  otherReason: 'Arall',
  otherHint: 'Nodwch y rheswm pam nad oes gan y tad genedigol gyfrifoldeb rhiant.',
  errors: {
    birthFatherNoResponsibility: {
      required: 'Dewiswch pam nad oes gan y tad genedigol gyfrifoldeb rhiant.',
    },
    otherResponsibilityReason: {
      required: 'Nodwch y rheswm pam nad oes gan y tad genedigol gyfrifoldeb rhiant.',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthFatherNoResponsibility: {
      type: 'checkboxes',
      label: l => l.title,
      labelSize: 'l',
      hint: l => l.hint,
      labelHidden: true,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'birthFatherNoResponsibility',
          label: l => l.removedByCourt,
          value: ResponsibilityReasons.REMOVED_BY_COURT,
        },
        {
          name: 'birthFatherNoResponsibility',
          label: l => l.neverObtained,
          value: ResponsibilityReasons.NEVER_OBTAINED,
        },
        {
          name: 'birthFatherNoResponsibility',
          label: l => l.otherReason,
          value: ResponsibilityReasons.OTHER,
          subFields: {
            otherResponsibilityReason: {
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
