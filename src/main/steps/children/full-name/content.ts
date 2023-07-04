import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isChildrenNameValid } from '../../../app/form/validation';

const en = () => ({
  section: "The child's details",
  title: "What is the child's full name?",
  line1:
    "Enter the child's full name, as it's written on their birth certificate. Ask the adoption agency or social worker if you're not sure.",
  firstName: 'First names',
  firstNameHint: '(Include any given or middle names)',
  lastName: 'Last names',
  lastNameHint: '(Include surname or family names)',
  errors: {
    childrenFirstName: {
      required: "Enter the child's first names",
      isValidChildName: "Enter valid child's first name",
    },
    childrenLastName: {
      required: "Enter the child's last names",
      isValidChildName: "Enter valid child's last name",
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y plentyn',
  title: 'Beth yw enw llawn y plentyn?',
  line1:
    'Nac ydwdwch enw llawn y plentyn, fel y mae wedi’i ysgrifennu ar eu tystysgrif geni. Gofynnwch i’r asiantaeth fabwysiadu neu’ch gweithiwr cymdeithasol os nad ydych yn siŵr.',
  firstName: 'Enwau cyntaf',
  firstNameHint: '(Cofiwch gynnwys unrhyw enwau bedydd neu enwau canol)',
  lastName: 'Cyfenwau',
  lastNameHint: '(Cofiwch gynnwys cyfenw neu enwau teuluol)',
  errors: {
    childrenFirstName: {
      required: 'Nac ydwdwch enw(au) cyntaf y plentyn',
      isValidChildName: 'Rhowch enw cyntaf plentyn dilys',
    },
    childrenLastName: {
      required: 'Nac ydwdwch gyfenw(au)’r plentyn',
      isValidChildName: 'Rhowch enw olaf plentyn dilys',
    },
  },
});

export const form: FormContent = {
  fields: {
    childrenFirstName: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.firstName,
      hint: l => l.firstNameHint,
      labelSize: null,
      parser: data => (data as Record<string, string>).childrenFirstName?.trim(),
      validator: isChildrenNameValid,
    },
    childrenLastName: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.lastName,
      hint: l => l.lastNameHint,
      labelSize: null,
      parser: data => (data as Record<string, string>).childrenLastName?.trim(),
      validator: isChildrenNameValid,
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
