import { Radios } from '../../common/components/radios';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const enContent = {
  section: SECTION,
  label: "Is the child's birth father still alive?",
  notSureInput:
    "Provide more details. For example, 'the birth father is uncontactable'. Your adoption agency or social worker can help you to complete this section.",
  errors: {
    birthFatherStillAlive: {
      required: 'Please answer the question',
    },
    birthFatherUnsureAliveReason: {
      required: 'Enter more details',
    },
  },
};

const cyContent = {
  section: SECTION_IN_WELSH,
  label: "Is the child's birth father still alive? (in Welsh)",
  notSureInput:
    "Provide more details. For example, 'the birth father is uncontactable'. Your adoption agency or social worker can help you to complete this section. (in Welsh)",
  errors: {
    birthFatherStillAlive: {
      required: 'Please answer the question (in Welsh)',
    },
    birthFatherUnsureAliveReason: {
      required: 'Enter more details (in Welsh)',
    },
  },
};

const fieldName = 'birthFatherStillAlive';

const values = [
  { key: 'yes', value: YesNoNotsure.YES },
  { key: 'no', value: 'No' },
  { key: 'notSure', value: 'NotSure', input: { fieldName: 'birthFatherUnsureAliveReason' } },
];

export const { form, generateContent } = new Radios(enContent, cyContent, fieldName, values);
