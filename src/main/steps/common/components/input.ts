import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { Validator } from '../../../app/form/validation';
import { CommonContent } from '../common.content';

export class Input {
  fieldName: string;
  enContent: Record<string, unknown>;
  cyContent: Record<string, unknown>;
  labelSize?: string;
  errors?: Record<string, string>;
  validator: Validator;
  form: FormContent;

  constructor(
    enContent: Record<string, unknown>,
    cyContent: Record<string, unknown>,
    fieldName: string,
    validator: Validator,
    labelSize?: string,
    errors?: Record<string, string>
  ) {
    this.enContent = enContent;
    this.cyContent = cyContent;
    this.fieldName = fieldName;
    this.validator = validator;
    this.labelSize = labelSize;
    this.errors = errors;
    this.form = this.generateForm();
  }

  languages = {
    en: (): Record<string, unknown> => this.enContent,
    cy: (): Record<string, unknown> => this.cyContent,
  };

  generateForm = (): FormContent => ({
    fields: {
      [this.fieldName]: {
        type: 'input',
        label: l => l.label,
        hint: l => l.hint,
        labelSize: this.labelSize,
        validator: this.validator,
      },
    },
    submit: {
      text: l => l.continue,
    },
    saveAsDraft: {
      text: l => l.saveAsDraft,
    },
  });

  generateContent: TranslationFn = (content: CommonContent) => ({
    ...this.languages[content.language](),
    form: this.form,
  });
}
