import { isFieldFilledIn } from '../../../app/form/validation';
import { Input } from '../../../steps/common/components/input';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const fieldName = 'birthFatherOccupation';

const enContent = {
  section: SECTION,
  title: "What is the occupation of the child's birth father?",
  hint: "Ask the adoption agency or social worker if you’re not sure. If the occupation is not known, you can type 'unknown'.",
  errors: {
    [fieldName]: {
      required: 'Enter an occupation',
    },
  },
};

const cyContent = {
  section: SECTION_IN_WELSH,
  title: "What is the occupation of the child's birth father? (in Welsh)",
  hint: "Ask the adoption agency or social worker if you’re not sure. If the occupation is not known, you can type 'unknown'. (in Welsh)",
  errors: {
    [fieldName]: {
      required: 'Enter an occupation (in Welsh)',
    },
  },
};

const validator = isFieldFilledIn;

const labelSize = 'm';

export const { form, generateContent } = new Input(enContent, cyContent, fieldName, validator, labelSize);
