import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormInput } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../common.content';

export class Radios {
  fieldName: string;
  values: Record<string, string>;
  enContent: Record<string, unknown>;
  cyContent: Record<string, unknown>;
  form: FormContent;

  constructor(
    enContent: Record<string, unknown>,
    cyContent: Record<string, unknown>,
    fieldName: string,
    values: Record<string, string>
  ) {
    this.enContent = enContent;
    this.cyContent = cyContent;
    this.fieldName = fieldName;
    this.values = values;
    this.form = this.generateForm();
  }

  en = (): Record<string, unknown> => ({
    ...this.enContent,
    yes: 'Yes',
    no: 'No',
    unsure: 'Not sure',
    errors: {
      [this.fieldName]: {
        required: 'Please answer the question',
      },
    },
  });

  cy = (): Record<string, unknown> => ({
    ...this.cyContent,
    yes: 'Yes (in Welsh)',
    no: 'No (in Welsh)',
    unsure: 'Not sure (in Welsh)',
    errors: {
      [this.fieldName]: {
        required: 'Please answer the question (in Welsh)',
      },
    },
  });

  generateForm = (): FormContent => ({
    fields: {
      [this.fieldName]: {
        type: 'radios',
        values: Object.entries(this.values).map(
          ([key, value]): FormInput => ({
            label: l => l[key],
            value,
          })
        ),
        validator: isFieldFilledIn,
      },
    },
    submit: {
      text: l => l.continue,
    },
    saveAsDraft: {
      text: l => l.saveAsDraft,
    },
  });

  languages = {
    en: this.en,
    cy: this.cy,
  };

  generateContent: TranslationFn = (content: CommonContent) => ({
    ...this.languages[content.language](),
    form: this.form,
  });
}
