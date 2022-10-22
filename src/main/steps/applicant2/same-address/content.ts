import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = content => ({
  section: 'Second applicant',
  label: 'Do you also live at this address?',
  yes: 'Yes',
  no: 'No',
  applicant1Address: `<div class="govuk-inset-text">${content.userCase.applicant1Address1}<br>${content.userCase.applicant1AddressTown}<br>${content.userCase.applicant1AddressPostcode}</div>`,
  errors: {
    applicant2AddressSameAsApplicant1: {
      required: 'Please answer the question',
    },
  },
});

const cy: typeof en = content => ({
  section: 'Ail geisydd',
  label: 'A ydych chi’n byw yn y cyfeiriad hwn hefyd?',
  yes: 'Ydw',
  no: 'Nac ydw',
  applicant1Address: `<div class="govuk-inset-text">${content.userCase.applicant1Address1}<br>${content.userCase.applicant1AddressTown}<br>${content.userCase.applicant1AddressPostcode}</div>`,
  errors: {
    applicant2AddressSameAsApplicant1: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2AddressSameAsApplicant1: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.applicant1Address,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: isFieldFilledIn,
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
