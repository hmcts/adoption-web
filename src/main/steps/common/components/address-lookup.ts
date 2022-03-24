import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isInvalidPostcode } from '../../../app/form/validation';

const en = () => ({
  line1:
    "We'll send all court papers to this address unless you advise us that you are happy to be served court orders by email.",
  postcode: 'Postcode',
  findAddress: 'Find address',
  enterAddressManually: 'Or enter address manually',
  errors: {
    addressPostcode: {
      required: 'Enter a real postcode',
      invalid: 'Enter a real postcode',
    },
  },
  manualAddressUrl: '#',
});

const cy = () => ({
  line1:
    'Byddwn yn anfon yr holl bapurau llys i’r cyfeiriad hwn oni bai eich bod yn ein cynghori eich bod yn hapus i’r gorchmynion llys gael eu cyflwyno arnoch trwy e-bost.',
  postcode: 'Cod post',
  findAddress: 'Dod o hyd i gyfeiriad',
  enterAddressManually: 'Neu nodwch y cyfeiriad â llaw',
  errors: {
    addressPostcode: {
      required: 'Nac ydwdwch god post dilys',
      invalid: 'Nac ydwdwch god post dilys',
    },
  },
  manualAddressUrl: '#',
});

export const form: FormContent = {
  fields: {
    addressPostcode: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.postcode,
      labelSize: 'm',
      attributes: {
        maxLength: 14,
      },
      validator: isInvalidPostcode,
    },
  },
  submit: {
    text: l => l.findAddress,
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
