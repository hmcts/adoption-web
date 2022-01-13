import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormField, FormInput } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../common.content';

import { defaultButtons } from './default-buttons';
import { RadioValues } from './types';

export class Radios {
  enContent: Record<string, unknown>;
  cyContent: Record<string, unknown>;
  fieldName: string;
  values: Record<string, unknown>[];
  form: FormContent;

  constructor(
    enContent: Record<string, unknown>,
    cyContent: Record<string, unknown>,
    fieldName: string,
    values: Record<string, unknown>[]
  ) {
    this.enContent = enContent;
    this.cyContent = cyContent;
    this.fieldName = fieldName;
    this.values = values;
    this.form = this.generateForm();
  }

  languages = {
    en: (): Record<string, unknown> => this.enContent,
    cy: (): Record<string, unknown> => this.cyContent,
  };

  generateForm = (): FormContent => ({
    fields: {
      [this.fieldName]: {
        type: 'radios',
        label: l => l.label,
        values: this.values.map(
          ({ key, value, input }): FormInput => ({
            label: l => l[key as string],
            value: value as string,
            subFields: input ? this.renderInput(key as string, input as Record<string, string>) : undefined,
          })
        ),
        validator: isFieldFilledIn,
      },
    },
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

export const generateRadiosField = (values: RadioValues): Record<string, FormField> => ({
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
