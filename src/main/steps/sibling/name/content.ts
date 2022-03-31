import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: 'Which siblings or half siblings have a court order in place?',
  line1:
    'We need details of all siblings or half siblings with a court order in place. You will be asked to complete details for each of them in turn.',
  firstName: 'First names',
  firstNameHint: '(Include any given or middle names)',
  lastName: 'Last names',
  lastNameHint: '(Include surname or family names)',
  errors: {
    siblingFirstName: {
      required: "Enter the child's first names",
    },
    siblingLastNames: {
      required: "Enter the child's last names",
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'Pa frodyr/chwiorydd neu hanner brodyr/hanner chwiorydd sydd â gorchymyn llys mewn lle?',
  line1:
    'Mae arnom angen manylion yr holl frodyr/chwiorydd neu’r hanner brodyr/hanner chwiorydd sydd â gorchymyn llys mewn lle. Gofynnir ichi lenwi’r manylion i bob un ohonynt fesul un.',
  firstName: 'Enwau cyntaf',
  firstNameHint: '(Cofiwch gynnwys unrhyw enwau bedydd neu enwau canol)',
  lastName: 'Cyfenwau',
  lastNameHint: '(Cofiwch gynnwys cyfenw neu enwau teuluol)',
  errors: {
    siblingFirstName: {
      required: 'Nac ydwdwch enw(au) cyntaf y plentyn',
    },
    siblingLastNames: {
      required: 'Nac ydwdwch gyfenw(au)’r plentyn',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    const siblings = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
    return {
      siblingFirstName: {
        type: 'text',
        classes: 'govuk-label',
        label: l => l.firstName,
        value: siblings?.siblingFirstName,
        hint: l => l.firstNameHint,
        validator: isFieldFilledIn,
      },
      siblingLastNames: {
        type: 'text',
        classes: 'govuk-label',
        label: l => l.lastName,
        value: siblings?.siblingLastNames,
        hint: l => l.lastNameHint,
        validator: isFieldFilledIn,
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
