import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getNextStepUrl } from '../../../../steps';

@autobind
export default class CheckboxesPostController extends PostController<AnyObject> {
  flow: string;
  dataTypeSingular: string;
  dataTypePlural: string;

  constructor(fields: FormFields | FormFieldsFn, flow: string, dataTypeSingular: string, dataTypePlural: string) {
    super(fields);
    this.flow = flow;
    this.dataTypeSingular = dataTypeSingular;
    this.dataTypePlural = dataTypePlural;
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

    if (req.session.errors.length === 0) {
      if (formData.addButton) {
        if (!req.session.userCase[`${this.flow}Additional${this.dataTypePlural}`]) {
          req.session.userCase[`${this.flow}Additional${this.dataTypePlural}`] = [];
        }
        if (formData[`addAnother${this.dataTypeSingular}`]) {
          req.session.userCase[`${this.flow}Additional${this.dataTypePlural}`].push(
            formData[`addAnother${this.dataTypeSingular}`]
          );
          req.session.userCase[`addAnother${this.dataTypeSingular}`] = '';
        }
      }
    }

    const nextUrl =
      req.session.errors.length > 0 || formData.addButton ? req.url : getNextStepUrl(req, req.session.userCase);

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
