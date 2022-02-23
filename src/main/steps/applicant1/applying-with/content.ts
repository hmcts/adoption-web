import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';

const en = () => ({
  section: 'Application details',
  label: 'Are you applying on your own, or with someone else?',
  one: "I'm applying on my own",
  oneHint: 'For example, as a single parent.',
  two: "I'm applying with my spouse or civil partner",
  twoHint: 'For example, as a married couple with joint parenting responsibilities.',
  three: "I'm applying with someone who is not my spouse or civil partner",
  threeHint: 'For example, with a long-term partner but not in a legally binding relationship.',
  moreDetails: 'Give a brief overview of what your relationship is with the other applicant.',
  errors: {
    applyingWith: {
      required: 'Select an option which best describes who is applying',
    },
    otherApplicantRelation: {
      required: 'Provide details of your relationship with the other applicant',
      invalid: 'Overview must be 500 characters or fewer',
    },
  },
});

const cy = () => ({
  section: 'Application details (in welsh)',
  label: 'Are you applying on your own, or with someone else?(in welsh)',
  one: "I'm applying on my own (in welsh)",
  oneHint: 'For example, as a single parent. (in welsh)',
  two: "I'm applying with my spouse or civil partner (in welsh)",
  twoHint: 'For example, as a married couple with joint parenting responsibilities. (in welsh)',
  three: "I'm applying with someone who is not my spouse or civil partner (in welsh)",
  threeHint: 'For example, with a long-term partner but not in a legally binding relationship. (in welsh)',
  moreDetails: 'Give a brief overview of what your relationship is with the other applicant. (in welsh)',
  errors: {
    applyingWith: {
      required: 'Select an option which best describes who is applying (in welsh)',
    },
    otherApplicantRelation: {
      required: 'Provide details of your relationship with the other applicant (in welsh)',
      invalid: 'Overview must be 500 characters or fewer (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applyingWith: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: 'alone',
          hint: l => l.oneHint,
        },
        {
          label: l => l.two,
          value: 'withSpouseOrCivilPartner',
          hint: l => l.twoHint,
        },
        {
          label: l => l.three,
          value: 'withSomeoneElse',
          hint: l => l.threeHint,
          subFields: {
            otherApplicantRelation: {
              type: 'textarea',
              label: l => l.moreDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
      ],
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
