import { isFieldFilledIn } from '../../../../app/form/validation';
import { InputValues } from '../../../common/components/common/types';

export const fieldName = 'birthFatherUnsureAliveReason';

export const enNotSure = {
  content: {
    [`${fieldName}label`]:
      "Provide more details. For example, 'the birth father is uncontactable'. Your adoption agency or social worker can help you to complete this section.",
  },
  errors: {
    [fieldName]: {
      required: 'Enter more details',
    },
  },
};

export const cyNotSure = {
  content: {
    [`${fieldName}label`]:
      "Provide more details. For example, 'the birth father is uncontactable'. Your adoption agency or social worker can help you to complete this section. (in Welsh)",
  },
  errors: {
    [fieldName]: {
      required: 'Enter more details (in Welsh)',
    },
  },
};

export const notSureInput: InputValues = {
  type: 'input',
  validator: isFieldFilledIn,
  fieldName,
  label: `${fieldName}label`,
  labelSize: null,
};
