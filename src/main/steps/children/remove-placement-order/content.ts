import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { defaultButtons } from '../../../steps/common/components/common/default-buttons';

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const en = content => {
  const enContent = {
    section: "The child's details",
    errors: {
      confirm: {
        required: 'Please select an answer',
      },
    },
  };
  return {
    ...enContent,
    title: 'Are you sure you want to remove this ?',
  };
};
//eslint-disable-next-line @typescript-eslint/no-unused-vars
const cy: typeof en = content => {
  const cyContent = {
    section: 'Manylion y plentyn',
    errors: {
      confirm: {
        required: 'Dewiswch ateb os gwelwch yn dda',
      },
    },
  };
  return {
    ...cyContent,
    title: "Ydych chi'n siŵr eich bod am ddileu hwn ?",
  };
};

export const form: FormContent = {
  fields: {
    confirm: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      section: l => l.section,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: isFieldFilledIn,
    },
  },
  ...defaultButtons,
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
