import { SiblingPOType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label: 'What type of order is it?',
  adoptionOrder: 'Adoption order',
  careOrder: 'Care order',
  contactOrder: 'Contact order',
  freeingOrder: 'Freeing order',
  placementOrder: 'Placement order',
  superVisOrder: 'Supervision order',
  other: 'Other',
  errors: {
    siblingPoType: {
      required: 'Please select an answer',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  label: 'Pa fath o neuchymyn ydyw?',
  adoptionOrder: 'Adoption order (in welsh)',
  careOrder: 'Care order (in welsh)',
  contactOrder: 'Contact order (in welsh)',
  freeingOrder: 'Freeing order (in welsh)',
  placementOrder: 'Placement order (in welsh)',
  superVisOrder: 'Supervision order (in welsh)',
  other: 'Other (in welsh)',
  errors: {
    siblingPoType: {
      required: 'Please select an answer (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
    return {
      siblingPoType: {
        type: 'radios',
        classes: 'govuk-radios',
        label: l => l.label,
        values: [
          { label: l => l.adoptionOrder, value: SiblingPOType.ADOPTION_ORDER },
          { label: l => l.careOrder, value: SiblingPOType.CARE_ORDER },
          { label: l => l.contactOrder, value: SiblingPOType.CONTACT_ORDER },
          { label: l => l.freeingOrder, value: SiblingPOType.FREEING_ORDER },
          { label: l => l.placementOrder, value: SiblingPOType.PLACEMENT_ORDER },
          { label: l => l.superVisOrder, value: SiblingPOType.SUPERVIS_ORDER },
          { label: l => l.other, value: SiblingPOType.OTHER },
        ],
        attributes: {
          spellcheck: false,
        },
        validator: isFieldFilledIn,
        ...sibling,
      },
    };
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
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
