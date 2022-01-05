import { YesNoUnsure, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../common.content';

export class radioGenerator {
  fieldName: string;
  values: YesOrNo | YesNoUnsure;
  enSection: string;
  enTitle: string;
  cySection: string;
  cyTitle: string;
  form: FormContent;

  constructor(
    enSection: string,
    enTitle: string,
    cySection: string,
    cyTitle: string,
    fieldName: string,
    values: YesOrNo | YesNoUnsure
  ) {
    this.enSection = enSection;
    this.enTitle = enTitle;
    this.cySection = cySection;
    this.cyTitle = cyTitle;
    this.fieldName = fieldName;
    this.values = values;
    this.form = this.generateForm();
  }

  en = (): Record<string, unknown> => ({
    section: this.enSection,
    title: this.enTitle,
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
    section: this.cySection,
    title: this.cyTitle,
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
        values: [
          { label: l => l.yes, value: YesNoUnsure.YES },
          { label: l => l.no, value: YesNoUnsure.NO },
          // typeof this.values == YesNoUnsure ? { label: l => l.unsure, value: YesNoUnsure.UNSURE } : undefined,
        ],
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
