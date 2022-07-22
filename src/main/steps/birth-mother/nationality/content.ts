import { FieldPrefix } from '../../../app/case/case';
import { PageContent, TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import {
  nationalityFields,
  form as nationalityForm,
  generateContent as nationalityGenerateContent,
} from '../../common/components/nationality';
import { BIRTH_MOTHER_NATIONALITY } from '../../urls';

const en = (nationalityContent: PageContent) => ({
  section: "Birth mother's details",
  label: "What is the nationality of the child's birth mother?",
  hint: 'Select all options that are relevant.',
  errors: {
    birthMotherNationality: {
      required: 'Select if they are British, Irish, citizen of a different country or not sure',
      notSureViolation: "Select a nationality or 'Not sure'",
      addButtonNotClicked: "Select 'Add' before you continue",
    },
    addAnotherNationality: (nationalityContent.errors as Record<string, unknown>).addAnotherNationality,
  },
  url: BIRTH_MOTHER_NATIONALITY,
});

const cy: typeof en = (nationalityContent: PageContent) => ({
  section: 'Manylion y fam fiolegol',
  label: 'Beth yw cenedligrwydd mam fiolegol y plentyn?',
  hint: 'Select all options that are relevant. (in welsh)',
  errors: {
    birthMotherNationality: {
      required: 'Select if they are British, Irish, citizen of a different country or not sure (in welsh)',
      notSureViolation: 'Dewiswch genedligrwydd neu ‘Ddim yn siŵr’',
      addButtonNotClicked: "Select 'Add' before you continue (in welsh)",
    },
    addAnotherNationality: (nationalityContent.errors as Record<string, unknown>).addAnotherNationality,
  },
  url: BIRTH_MOTHER_NATIONALITY,
});

export const form: FormContent = {
  ...nationalityForm,
  fields: userCase => nationalityFields(userCase, FieldPrefix.BIRTH_MOTHER),
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const nationalityContent = nationalityGenerateContent(content, FieldPrefix.BIRTH_MOTHER);
  const translations = languages[content.language](nationalityContent);
  return {
    ...nationalityContent,
    ...translations,
  };
};
