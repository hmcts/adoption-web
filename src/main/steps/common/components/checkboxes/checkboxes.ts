import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, notSure } from '../../../../app/form/validation';
import { CommonContent } from '../../common.content';
import { defaultButtons } from '../default-buttons';

export class Checkboxes {
  enContent: Record<string, unknown>;
  cyContent: Record<string, unknown>;
  flow: string;
  dataTypeSingular: string;
  dataTypePlural: string;
  checkboxLabelSize: string;
  values: Record<string, unknown>[];
  includeNotSureOption: boolean;
  form: FormContent;

  constructor(
    enContent: Record<string, unknown>,
    cyContent: Record<string, unknown>,
    flow: string,
    dataTypeSingular: string,
    dataTypePlural: string,
    checkboxLabelSize: string,
    values: Record<string, unknown>[],
    includeNotSureOption: boolean
  ) {
    this.enContent = enContent;
    this.cyContent = cyContent;
    this.flow = flow;
    this.dataTypeSingular = dataTypeSingular;
    this.dataTypePlural = dataTypePlural;
    this.checkboxLabelSize = checkboxLabelSize;
    this.values = values;
    this.includeNotSureOption = includeNotSureOption;
    this.form = this.generateForm();
  }

  languages = {
    en: (): Record<string, unknown> => ({ ...this.enContent, notSure: 'Not sure' }),
    cy: (): Record<string, unknown> => ({ ...this.cyContent, notSure: 'Not sure (in Welsh)' }),
  };

  generateForm = (): FormContent => {
    const form: FormContent = {
      fields: {
        [`${this.flow}${this.dataTypeSingular}`]: {
          type: 'checkboxes',
          label: l => l.label,
          labelSize: this.checkboxLabelSize,
          hint: l => l.hint,
          validator: this.includeNotSureOption
            ? value => atLeastOneFieldIsChecked(value) || notSure(value)
            : atLeastOneFieldIsChecked,
          values: this.values.map(({ field, value, subtext }) => ({
            name: `${this.flow}${this.dataTypeSingular}`,
            label: l => l[field as string],
            value: value as string,
            hint: subtext ? l => l[`${field}Subtext`] : undefined,
          })),
        },
      },
      ...defaultButtons,
    };

    if (this.includeNotSureOption) {
      this.appendNotSureOption(form);
    }

    return form;
  };

  // renderArraySubFields = (): void => {};

  appendNotSureOption = (form: FormContent): void => {
    const values = form.fields[`${this.flow}${this.dataTypeSingular}`].values;
    values.push({ divider: l => l.or });
    values.push({
      name: `${this.flow}${this.dataTypeSingular}`,
      label: l => l.notSure,
      value: 'Not sure',
    });
  };

  generateContent: TranslationFn = (content: CommonContent) => ({
    ...this.languages[content.language](),
    form: this.form,
  });
}
