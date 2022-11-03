import { YesNoNotsure } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: 'Does the child have any siblings or half siblings with court orders?',
  conditionalText:
    '<label class="govuk-label">You will be asked to provide each sibling court order individually.</label>',
  errors: {
    hasSiblings: {
      required: 'Please select an answer',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'A oes gan y plentyn frodyr/chwiorydd neu hanner brodyr/chwiorydd sydd â gorchmynion llys?',
  conditionalText:
    '<label class="govuk-label">Gofynnir i chi ddarparu pob gorchymyn llys brodyr a chwiorydd yn unigol.</label>',
  errors: {
    hasSiblings: {
      required: 'Dewiswch ateb os gwelwch yn dda',
    },
  },
});

export const form: FormContent = {
  fields: {
    hasSiblings: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      section: l => l.section,
      hint: l => l.hint,
      labelHidden: true,
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
