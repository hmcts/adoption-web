import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';

const en = () => ({
  section: 'Application details',
  title: 'Are you applying on your own, or with someone else?',
  one: "I'm applying on my own",
  oneHint: 'For example, as a single parent.',
  two: "I'm applying with my spouse or civil partner",
  twoHint: 'For example, as a legally married couple or legal civil partner.',
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

const cy: typeof en = () => ({
  section: 'Manylion y cais',
  section1: 'Manylion y cais',
  title: 'A ydych yn gwneud cais ar ben eich hun, neu gyda rhywun arall?',
  one: 'Rwy’n gwneud cais ar ben fy hun',
  oneHint: 'Er enghraifft, fel rhiant sengl.',
  two: 'Rwy’n gwneud cais gyda fy mhriod / fy mhartner sifil',
  twoHint: 'Er enghraifft, fel cwpl priod cyfreithiol neu bartner sifil cyfreithiol.',
  three: 'Rwy’n gwneud cais gyda rhywun nad ydynt yn briod neu’n bartner sifil i mi',
  threeHint: 'Er enghraifft, gyda phartner hir dymor ond nid ydym mewn perthynas sy’n rhwymol yn gyfreithiol.',
  moreDetails: 'Rhowch drosolwg bras o beth yw eich perthynas â’r ceisydd arall.',
  errors: {
    applyingWith: {
      required: 'Dewiswch opsiwn sy’n disgrifio neuau pwy sy’n gwneud cais',
    },
    otherApplicantRelation: {
      required: 'Darparwch fanylion am eich perthynas â’r ceisydd arall',
      invalid: 'Rhaid i’r trosolwg fod yn 500 nod neu lai',
    },
  },
});

export const form: FormContent = {
  fields: {
    applyingWith: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      section: l => l.section,
      labelHidden: true,
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
