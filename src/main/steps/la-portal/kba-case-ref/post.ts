import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../..';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields } from '../../../app/form/Form';

@autobind
export default class LaPortalKbaPostController<T extends AnyObject> extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields) {
    super(fields);
  }

  /**
   * Parse the form body and decide whether this is a save and sign out, save and continue or session time out
   */
  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    const form = new Form(this.fields);

    const { _csrf, ...formData } = form.getParsedBody(req.body);
    if (!req.session.laPortalKba) {
      req.session.laPortalKba = {};
    }

    Object.assign(req.session.laPortalKba, formData);
    req.session.errors = form.getErrors(formData);

    const nextUrl = req.session.errors.length > 0 ? req.url : getNextStepUrl(req, req.session.laPortalKba);

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
