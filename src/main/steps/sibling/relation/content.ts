import { SiblingRelationships } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: 'What is their relationship to the child being adopted?',
  sister: 'Sister',
  halfSister: 'Half-sister',
  stepSister: 'Step-sister',
  brother: 'Brother',
  halfBrother: 'Half-brother',
  stepBrother: 'Step-brother',
  errors: {
    selectedSiblingRelation: {
      required: 'Please select an answer',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'Beth yw eu perthynas i’r plentyn sy’n cael ei fabwysiadu?',
  sister: 'Chwaer',
  halfSister: 'Hanner chwaer',
  stepSister: 'Llyschwaer',
  brother: 'Brawd',
  halfBrother: 'Hanner brawd',
  stepBrother: 'Llysfrawd',
  errors: {
    selectedSiblingRelation: {
      required: 'Dewiswch ateb os gwelwch yn dda',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
    return {
      selectedSiblingRelation: {
        type: 'radios',
        classes: 'govuk-radios',
        label: l => l.title,
        section: l => l.section,
        values: [
          { label: l => l.sister, value: SiblingRelationships.SISTER },
          { label: l => l.halfSister, value: SiblingRelationships.HALF_SISTER },
          { label: l => l.stepSister, value: SiblingRelationships.STEP_SISTER },
          { label: l => l.brother, value: SiblingRelationships.BROTHER },
          { label: l => l.halfBrother, value: SiblingRelationships.HALF_BROTHER },
          { label: l => l.stepBrother, value: SiblingRelationships.STEP_BROTHER },
        ],
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
