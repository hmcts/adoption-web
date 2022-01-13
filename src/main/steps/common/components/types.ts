import { FormField } from '../../../app/form/Form';
import { Validator } from '../../../app/form/validation';

export interface ComponentValues {
  enContent: Record<string, unknown>;
  cyContent: Record<string, unknown>;
  fieldName: string;
  labelSize?: string;
  subFields?: ComponentValues[];
  path?: string;
}

export interface RadiosValues extends ComponentValues {
  values: RadiosItem[];
}

export interface RadiosItem {
  key: string;
  value: string;
  subFields?: Record<string, FormField>;
}

export interface InputValues extends ComponentValues {
  validator: Validator;
}
