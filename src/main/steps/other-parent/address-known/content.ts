import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: 'Do you have the address of the other person with parental responsibility for the child?',
  moreDetails: "Give a reason why the address is not known, for example 'no fixed address'.",
  errors: {
    otherParentAddressKnown: {
      required: 'Select whether you have the address for the other person with parental responsibility for the child',
    },
    otherParentAddressNotKnownReason: {
      required: 'Provide a reason',
      invalid: 'Reason must be 500 characters or fewer',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'A oes gennych gyfeiriad yr unigolyn arall sydd â chyfrifoldeb rhiant dros y plentyn?',
  moreDetails: 'Rhowch reswm pam bod y cyfeiriad yn anhysbys, er enghraifft ‘dim cyfeiriad parhaol’.',
  errors: {
    otherParentAddressKnown: {
      required: 'Nodwch a oes gennych gyfeiriad yr unigolyn arall sydd â chyfrifoldeb rhiant dros y plentyn',
    },
    otherParentAddressNotKnownReason: {
      required: 'Darparwch reswm',
      invalid: 'Rhaid i’r rheswm fod yn 500 nod neu llai',
    },
  },
});

export const form: FormContent = {
  fields: {
    otherParentAddressKnown: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      section: l => l.section,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            otherParentAddressNotKnownReason: {
              type: 'textarea',
              label: l => l.moreDetails,
              attributes: {
                rows: 1,
              },
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
