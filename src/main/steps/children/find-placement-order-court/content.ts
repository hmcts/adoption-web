import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const getCourtListItems = (courtList, selectedCourt) =>
  courtList
    .filter(item => item.site_name !== selectedCourt)
    .map(item => ({ text: item.site_name, value: item.site_name }));

const en = content => ({
  section: "The child's details",
  label: 'Which court made the placement order?',
  options: [
    ...getCourtListItems(content.courtList, content.userCase.placementOrderCourt),
    { text: content.userCase.placementOrderCourt, value: content.userCase.placementOrderCourt, selected: true },
  ],
  errors: {
    placementOrderCourt: {
      required: 'Enter the name of the court',
    },
  },
});

const cy: typeof en = content => ({
  section: 'Manylion y plentyn',
  label: 'Pa lys wnaeth wneud y gorchymyn lleoli?',
  options: [
    ...getCourtListItems(content.courtList, content.userCase.placementOrderCourt),
    { text: content.userCase.placementOrderCourt, value: content.userCase.placementOrderCourt, selected: true },
  ],
  errors: {
    placementOrderCourt: {
      required: 'Nac ydwdwch enw’r llys',
    },
  },
});

export const form: FormContent = {
  fields: {
    // h1: {
    //   label: l => l.label,
    //   type: 'heading'
    // },
    placementOrderCourt: {
      type: 'select-dropdown',
      id: 'location-picker',
      options: l => l.options,
      validator: isFieldFilledIn,
      label: l => l.label,
      classes: 'l',
      labelSize: 'l',
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
