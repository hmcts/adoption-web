import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormField } from '../../../app/form/Form';
import { CommonContent } from '../common.content';

import { Component } from './component';
import { defaultButtons } from './default-buttons';
import { InputValues } from './types';

export class Input extends Component {
  public form: FormContent;

  constructor(values: InputValues) {
    super(values);
    this.form = this.generateForm();
  }

  languages = {
    en: (): Record<string, unknown> => this.values.enContent,
    cy: (): Record<string, unknown> => this.values.cyContent,
  };

  generateForm = (): FormContent => ({
    fields: { ...generateInputField(this.values as InputValues) },
    ...defaultButtons,
  });

  generateContent: TranslationFn = (content: CommonContent) => ({
    ...this.languages[content.language](),
    form: this.form,
  });
}

export const generateInputField = (values: InputValues): Record<string, FormField> => ({
  [values.fieldName]: {
    type: 'input',
    label: l => l[`${values.path || ''}label`],
    hint: l => l[`${values.path || ''}hint`],
    labelSize: values.labelSize,
    validator: values.validator,
  },
});
