import { FieldPrefix } from '../../../app/case/case';
import { PageContent, TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import {
  nationalityFields,
  form as nationalityForm,
  generateContent as nationalityGenerateContent,
} from '../../common/components/nationality';
import { BIRTH_FATHER_NATIONALITY } from '../../urls';

const en = (nationalityContent: PageContent) => ({
  section: "Birth father's details",
  label: "What is the nationality of the child's birth father?",
  hint: 'Select all options that are relevant.',
  errors: {
    birthFatherNationality: {
      required: 'Select if they are British, Irish, citizen of a different country or not sure',
      notSureViolation: "Select a nationality or 'Not sure'",
      addButtonNotClicked: "Select 'Add' before you continue",
    },
    addAnotherNationality: (nationalityContent.errors as Record<string, unknown>).addAnotherNationality,
  },
  url: BIRTH_FATHER_NATIONALITY,
});

const cy: typeof en = (nationalityContent: PageContent) => ({
  section: 'Manylion y tad biolegol',
  label: 'Beth yw cenedligrwydd tad biolegol y plentyn?',
  hint: 'Dewiswch bob opsiwn sy’n berthnasol i chi.',
  errors: {
    birthFatherNationality: {
      required: "Dewiswch os ydyn nhw'n Brydeinig, Gwyddelig, dinesydd gwlad wahanol neu ddim yn siŵr",
      notSureViolation: 'Dewiswch genedligrwydd neu ‘Ddim yn siŵr’',
      addButtonNotClicked: 'Dewiswch ‘Ychwanegu’ cyn ichi symud ymlaen',
    },
    addAnotherNationality: (nationalityContent.errors as Record<string, unknown>).addAnotherNationality,
  },
  url: BIRTH_FATHER_NATIONALITY,
});

export const form: FormContent = {
  ...nationalityForm,
  fields: userCase => nationalityFields(userCase, FieldPrefix.BIRTH_FATHER),
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const nationalityContent = nationalityGenerateContent(content, FieldPrefix.BIRTH_FATHER);
  const translations = languages[content.language](nationalityContent);
  return {
    ...nationalityContent,
    ...translations,
  };
};
