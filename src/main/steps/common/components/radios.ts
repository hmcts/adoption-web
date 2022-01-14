import { FormField } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

import { Component } from './component';
import { defaultButtons } from './default-buttons';
import { generateInputField } from './input';
import { RadiosValues } from './types';

export class Radios extends Component {
  constructor(values: RadiosValues) {
    super(values);

    this.form = {
      fields: { ...generateRadiosField(values as RadiosValues) },
      ...defaultButtons,
    };
  }
}

export const generateRadiosField = (values: RadiosValues): Record<string, FormField> => ({
  [values.fieldName]: {
    type: 'radios',
    label: l => l[`${values.label}`],
    hint: l => l[`${values.hint}`],
    values: values.values.map(({ key, value, input }) => ({
      label: l => l[key],
      value,
      subFields: input ? generateInputField(input) : undefined,
    })),
    validator: isFieldFilledIn,
  },
});
