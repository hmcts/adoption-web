import { YesNoNotsure } from '../../../app/case/definition';
import { Radios } from '../../common/components/radios';
import { SECTION, SECTION_IN_WELSH } from '../constants';

import { cyNotSure, enNotSure, notSureInput } from './notSureInput/content';

const fieldName = 'birthFatherStillAlive';

const enContent = {
  section: SECTION,
  label: "Is the child's birth father still alive?",
  ...enNotSure.content,
  errors: {
    [fieldName]: {
      required: 'Please answer the question',
    },
    ...enNotSure.errors,
  },
};

const cyContent = {
  section: SECTION_IN_WELSH,
  label: "Is the child's birth father still alive? (in Welsh)",
  ...cyNotSure,
  errors: {
    [fieldName]: {
      required: 'Please answer the question (in Welsh)',
    },
    ...cyNotSure.errors,
  },
};

const values = [
  { key: 'yes', value: YesNoNotsure.YES },
  { key: 'no', value: YesNoNotsure.NO },
  { key: 'notSure', value: YesNoNotsure.NOT_SURE, subFields: [notSureInput] },
];

export const { form, generateContent } = new Radios({ enContent, cyContent, fieldName, values, label: 'label' });
