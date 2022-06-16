import { YesNoNotsure } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label: 'Does the child have any siblings or half siblings with court orders?',
  conditionalText:
    '<label class="govuk-label">You will be asked to provide each sibling court order individually.</label>',
  errors: {
    hasSiblings: {
      required: 'Please answer the question',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  label: 'Does the child have any siblings or half siblings with court orders? (in welsh)',
  conditionalText:
    '<label class="govuk-label">You will be asked to provide each sibling court order individually.</label> (in welsh)',
  errors: {
    hasSiblings: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
  },
});

export const form: FormContent = {
  fields: {
    hasSiblings: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      values: [
        { label: l => l.yes, value: YesNoNotsure.YES, conditionalText: l => l.conditionalText },
        { label: l => l.no, value: YesNoNotsure.NO },
        { label: l => l.notSure, value: YesNoNotsure.NOT_SURE },
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
