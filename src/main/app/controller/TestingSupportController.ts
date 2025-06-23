import { Form, FormFields, FormFieldsFn } from 'app/form/Form';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from './AppRequest';

@autobind
export class TestingSupportController<T extends AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {}

  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    try {
      const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
      const form = new Form(fields);
      console.log('TestingSupportController executed');
      console.log(`Form Data: ${form}`);
    } catch (Error) {
      console.log(`Error: ${Error.toString}}`);
    }
  }
}

export type AnyObject = Record<string, unknown>;
