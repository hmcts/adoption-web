import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormField } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../common.content';

import { Component } from './component';
import { defaultButtons } from './default-buttons';
import { RadiosValues } from './types';

export class Radios extends Component {
  form: FormContent;

  constructor(values: RadiosValues) {
    super(values);
    this.form = this.generateForm();
  }

  languages = {
    en: (): Record<string, unknown> => this.values.enContent,
    cy: (): Record<string, unknown> => this.values.cyContent,
  };

  generateForm = (): FormContent => ({
    fields: { ...generateRadiosField(this.values as RadiosValues) },
    ...defaultButtons,
  });

  renderInput = (key: string, input: Record<string, string>): Record<string, FormField> => ({
    [(input as Record<string, string>).fieldName]: {
      type: 'input',
      label: l => l[`${key}Input`],
      labelSize: null,
      validator: isFieldFilledIn,
    },
  });

  generateContent: TranslationFn = (content: CommonContent) => ({
    ...this.languages[content.language](),
    form: this.form,
  });
}

export const generateRadiosField = (values: RadiosValues): Record<string, FormField> => ({
  [values.fieldName]: {
    type: 'radios',
    label: l => l[`${values.path}label`],
    values: values.values.map(({ key, value, subFields }) => ({
      label: l => l[key as string],
      value: value as string,
      subFields,
    })),
    validator: isFieldFilledIn,
  },
});
