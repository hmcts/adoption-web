// import { Checkbox } from '../../../app/case/case';
// import { Gender } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ required }) => ({
  section: 'Applicant details',
  title: 'How many children are you applying to adopt?',
  one: '1',
  two: '2',
  threeOrMore: '3 or more',
  errors: {
    noOfChildren: {
      required,
    },
  },
});

const cy = ({ required }) => ({
  title: 'How many children are you applying to adopt? (in welsh)',
  one: '1',
  two: '2',
  threeOrMore: '3 or more (in welsh)',
  errors: {
    noOfChildren: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    noOfChildren: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      section: l => l.section,
      labelHidden: true,
      values: [
        { label: l => l.one, value: '1' },
        { label: l => l.two, value: '2' },
        { label: l => l.threeOrMore, value: '3+' },
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
