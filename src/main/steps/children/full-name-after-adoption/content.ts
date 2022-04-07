import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "The child's details",
  title: "What will the child's full name be after adoption?",
  line1: 'This will be on the adoption certificate so enter all their names as accurately as possible.',
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
    'Bydd hwn wedi’i nodi ar y dystysgrif geni, felly sicrhewch bod eu henwau wedi’u nodi mor gywir ac sy’n bosib.',
  firstName: 'Enwau cyntaf',
  firstNameHint: '((Cofiwch gynnwys unrhyw enwau bedydd neu enwau canol))',
  lastName: 'Cyfenwau',
  lastNameHint: '((Cofiwch gynnwys cyfenw neu enwau teuluol))',
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
