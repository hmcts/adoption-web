import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ isDivorce, required }) => ({
  title: 'Changes to your name',
  line1: 'The court needs to know if you have changed your name.',
  applicant1LastNameChangedWhenRelationshipFormed: `Did you change your last name when you ${
    isDivorce ? 'got married' : 'formed your civil partnership'
  }?`,
  applicant1LastNameChangedWhenRelationshipFormedHint: 'For example, from a maiden name',
  applicant1NameChangedSinceRelationshipFormed: `Have you changed any part of your name since ${
    isDivorce ? 'getting married' : 'forming your civil partnership'
  }?`,
  applicant1NameChangedSinceRelationshipFormedHint: 'For example, by deed poll',
  errors: {
    applicant1LastNameChangedWhenRelationshipFormed: { required },
    applicant1NameChangedSinceRelationshipFormed: { required },
  },
});

const cy = ({ required }) => ({
  title: "Newidiadau i'ch enw",
  line1: "Mae angen ichi roi gwybod i'r llys os ydych wedi newid eich enw",
  applicant1LastNameChangedWhenRelationshipFormed: 'A wnaethoch chi newid eich cyfenw pan wnaethoch chi briodi?',
  applicant1LastNameChangedWhenRelationshipFormedHint: "Er enghraifft, o'ch enw morwynaidd",
  applicant1NameChangedSinceRelationshipFormed: "A ydych wedi newid unrhyw ran o'ch enw ers priodi?",
  applicant1NameChangedSinceRelationshipFormedHint: 'Er enghraifft, trwy weithred newid enw',
  errors: {
    applicant1LastNameChangedWhenRelationshipFormed: { required },
    applicant1NameChangedSinceRelationshipFormed: { required },
  },
});

export const form: FormContent = {
  fields: {
    applicant1LastNameChangedWhenRelationshipFormed: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.applicant1LastNameChangedWhenRelationshipFormed,
      hint: l => l.applicant1LastNameChangedWhenRelationshipFormedHint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
    applicant1NameChangedSinceRelationshipFormed: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.applicant1NameChangedSinceRelationshipFormed,
      hint: l => l.applicant1NameChangedSinceRelationshipFormedHint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
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
