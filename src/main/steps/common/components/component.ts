import { ComponentValues } from './types';

export abstract class Component {
  values: ComponentValues;

  constructor(values: ComponentValues) {
    this.values = values;
  }
}
