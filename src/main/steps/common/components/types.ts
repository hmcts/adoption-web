import { FormField } from '../../../app/form/Form';
import { Validator } from '../../../app/form/validation';

export type ComponentValues = {
  enContent: Record<string, unknown>;
  cyContent: Record<string, unknown>;
  fieldName: string;
  labelSize?: string;
  subFields?: ComponentValues[];
  path?: string;
};

export interface RadioValues extends ComponentValues {
  values: RadioItem[];
}

export interface RadioItem {
  key: string;
  value: string;
  subFields?: Record<string, FormField>;
}

export interface InputValues extends ComponentValues {
  validator: Validator;
}
