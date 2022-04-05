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
      'Darparwch fwy o fanylion. Er enghraifft, ‘nid oes modd cysylltu â’r tad biolegol’. Gall eich asiantaeth fabwysiadu neu eich gweithiwr cymdeithasol eich helpu i lenwi’r rhan hon.',
  },
  errors: {
    [fieldName]: {
      required: 'Rhowch fwy o fanylion',
    },
  },
};

export const notSureInput: InputValues = {
  type: 'text',
  validator: isFieldFilledIn,
  fieldName,
  label: `${fieldName}label`,
  labelSize: null,
};
