import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "The child's details",
  title: "After adoption, what will be the child's full name?",
  line1:
    'If you are changing the child’s name, you should enter all their names here as accurately as possible. This is what will appear on both the adoption certificate and in the adoption register. Enter both first and last names even if there is no change.',
  firstName: 'First names',
  firstNameHint: '(Include any given or middle names)',
  lastName: 'Last names',
  lastNameHint: '(Include surname or family names)',
  errors: {
    childrenFirstNameAfterAdoption: {
      required: 'Enter their first names',
    },
    childrenLastNameAfterAdoption: {
      required: 'Enter their last names',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y plentyn',
  title: 'Beth fydd enw llawn y plentyn ar ôl mabwysiadu?',
  line1:
    'Os ydych yn newid enw’r plentyn, dylech nodi pob enw yma mor gywir â phosibl. Dyma beth fydd yn ymddangos ar y dystysgrif mabwysiadu ac yn y gofrestr plant mabwysiedig. Nodwch eu henwau cyntaf ac olaf, hyd yn oed os nad ydynt yn cael eu newid.',
  firstName: 'Enwau cyntaf',
  firstNameHint: '(Cofiwch gynnwys unrhyw enwau bedydd neu enwau canol)',
  lastName: 'Cyfenwau',
  lastNameHint: '(Cofiwch gynnwys cyfenw neu enwau teuluol)',
  errors: {
    childrenFirstNameAfterAdoption: {
      required: 'Nac ydwdwch eu henw(au) cyntaf',
    },
    childrenLastNameAfterAdoption: {
      required: 'Nac ydwdwch eu cyfenw(au)',
    },
  },
});

export const form: FormContent = {
  fields: {
    childrenFirstNameAfterAdoption: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.firstName,
      hint: l => l.firstNameHint,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    childrenLastNameAfterAdoption: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.lastName,
      hint: l => l.lastNameHint,
      labelSize: null,
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
