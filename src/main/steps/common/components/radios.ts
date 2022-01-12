import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormField, FormInput } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../common.content';

import { defaultButtons } from './default-buttons';

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
    en: (): Record<string, unknown> => ({
      ...this.enContent,
      yes: 'Yes',
      no: 'No',
      unsure: 'Not sure',
    }),
    cy: (): Record<string, unknown> => ({
      ...this.cyContent,
      yes: 'Yes (in Welsh)',
      no: 'No (in Welsh)',
      unsure: 'Not sure (in Welsh)',
    }),
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
