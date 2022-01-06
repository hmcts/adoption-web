import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormField, FormFields, FormInput } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, notSure } from '../../../../app/form/validation';
import { mapSummaryListContent } from '../../../../steps/common/functions/mapSummaryListContent';
import { PageLink } from '../../../../steps/urls';
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
  url?: PageLink;
  form: FormContent;

  constructor(
    enContent: Record<string, unknown>,
    cyContent: Record<string, unknown>,
    flow: string,
    dataTypeSingular: string,
    dataTypePlural: string,
    checkboxLabelSize: string,
    values: Record<string, unknown>[],
    includeNotSureOption: boolean,
    url?: PageLink
  ) {
    this.enContent = enContent;
    this.cyContent = cyContent;
    this.flow = flow;
    this.dataTypeSingular = dataTypeSingular;
    this.dataTypePlural = dataTypePlural;
    this.checkboxLabelSize = checkboxLabelSize;
    this.values = values;
    this.includeNotSureOption = includeNotSureOption;
    this.url = url;
    this.form = this.generateForm();
  }

  languages = {
    en: (): Record<string, unknown> => ({ ...this.enContent, notSure: 'Not sure', add: 'Add' }),
    cy: (): Record<string, unknown> => ({ ...this.cyContent, notSure: 'Not sure (in Welsh)', add: 'Add (in Welsh)' }),
  };

  generateForm = (): FormContent => ({
    fields: this.renderCheckbox(),
    ...defaultButtons,
  });

  renderCheckbox = (): FormFields => ({
    [`${this.flow}${this.dataTypeSingular}`]: {
      type: 'checkboxes',
      label: (l: Record<string, never>): string => l.label,
      labelSize: this.checkboxLabelSize,
      hint: (l: Record<string, never>): string => l.hint,
      validator: this.includeNotSureOption
        ? value => atLeastOneFieldIsChecked(value) || notSure(value)
        : atLeastOneFieldIsChecked,
      values: this.renderCheckboxValues(),
    },
  });

  renderCheckboxValues = (): FormInput[] => {
    const checkboxValues = this.values.map(({ field, value, subtext, includeArraySubFields }) => ({
      name: `${this.flow}${this.dataTypeSingular}`,
      label: l => l[field as string],
      value: value as string,
      hint: subtext ? l => l[`${field}Subtext`] : undefined,
      subFields: includeArraySubFields ? this.renderArraySubFields() : undefined,
    }));

    if (this.includeNotSureOption) {
      this.appendNotSureOption(checkboxValues);
    }

    return checkboxValues;
  };

  renderArraySubFields = (): FormFields => ({
    [`${this.flow}Additional${this.dataTypePlural}`]: this.renderSummaryList(
      ['value1', 'value2'],
      'Remove',
      this.url ? this.url : '/#'
    ),
    [`addAnother${this.dataTypeSingular}Details`]: this.renderDetails(),
    ...this.renderAddAnotherSubFields(true),
  });

  renderSummaryList = (data: string[], label: string, url: PageLink): FormField => ({
    type: 'summarylist',
    values: [],
    rows: mapSummaryListContent(data, [label], url),
  });

  renderDetails = (): FormField => ({
    type: 'details',
    label: l => l.another,
    subFields: {
      ...this.renderAddAnotherSubFields(false),
    },
  });

  renderAddAnotherSubFields = (validate: boolean): FormFields => ({
    [`addAnother${this.dataTypeSingular}`]: {
      type: 'input',
      classes: 'govuk-!-width-two-thirds',
      label: l => l.inputLabel,
      labelSize: null,
      validator: validate ? isFieldFilledIn : undefined,
    },
    addButton: {
      type: 'button',
      label: l => l.add,
      classes: 'govuk-button--secondary',
      value: 'addButton',
    },
  });

  appendNotSureOption = (values: FormInput[]): void => {
    values.push(
      { divider: l => l.or, label: '' },
      {
        name: `${this.flow}${this.dataTypeSingular}`,
        label: l => l.notSure,
        value: 'Not sure',
      }
    );
  };

  generateContent: TranslationFn = (content: CommonContent) => ({
    ...this.languages[content.language](),
    form: this.form,
  });
}
