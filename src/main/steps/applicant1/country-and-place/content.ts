import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, notAnswered }: CommonContent, certInEnglish: boolean) => {
  const formedCeremony = isDivorce ? 'got married' : 'formed your civil partnership';

  return {
    title: `Where you ${formedCeremony}`,
    ceremonyCountry: `Enter the country where you ${formedCeremony}`,
    ceremonyCountryHint: `For example, ${certInEnglish ? 'Australia' : 'France'}.`,
    ceremonyPlace: `Enter the place where you ${formedCeremony}`,
    ceremonyPlaceHint: `Copy all the information relating to the place, exactly as it appears on your ${
      !certInEnglish ? 'translated' : ''
    } certificate.`,
    errors: {
      ceremonyCountry: {
        required: `${notAnswered} You need to enter the country.`,
      },
      ceremonyPlace: {
        required: `${notAnswered} You need to enter the place.`,
      },
    },
  };
};

const cy = ({ isDivorce, notAnswered }: CommonContent, certInEnglish: boolean) => {
  const formedCeremony = isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil';

  return {
    title: `Lle y gwnaethoch ${formedCeremony}`,
    ceremonyCountry: `Nodwch enw'r wlad lle y gwnaethoch ${formedCeremony}`,
    ceremonyCountryHint: `Er enghraifft, ${certInEnglish ? 'Awstralia' : 'Ffrainc'}.`,
    ceremonyPlace: `Nodwch enw'r lle y gwnaethoch ${formedCeremony}`,
    ceremonyPlaceHint: `Copïwch yr holl wybodaeth am y lle, yn union fel y mae'n ymddangos ar eich tystysgrif${
      !certInEnglish ? " wedi'i chyfieithu" : ''
    }.`,
    errors: {
      ceremonyCountry: {
        required: `${notAnswered} Mae angen ichi nodi'r wlad.`,
      },
      ceremonyPlace: {
        required: `${notAnswered} Mae angen i chi nodi enw'r lle.`,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    ceremonyCountry: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.ceremonyCountry,
      hint: l => l.ceremonyCountryHint,
      validator: isFieldFilledIn,
    },
    ceremonyPlace: {
      type: 'text',
      label: l => l.ceremonyPlace,
      hint: l => l.ceremonyPlaceHint,
      validator: isFieldFilledIn,
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
  const certInEnglish = content.userCase?.certificateInEnglish === YesOrNo.YES;
  const translations = languages[content.language](content, certInEnglish);
  return {
    ...translations,
    form,
  };
};
