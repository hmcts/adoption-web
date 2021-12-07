import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject } from '../../app/controller/PostController';
import { Form, FormFields } from '../../app/form/Form';
import { getNextEligibilityStepUrl } from '../../steps';

@autobind
export default class EligibilityPostController<T extends AnyObject> {
  constructor(protected readonly fields: FormFields) {}

  /**
   * Parse the form body and decide whether this is a save and sign out, save and continue or session time out
   */
  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    const form = new Form(this.fields);

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    if (!req.session.eligibility) {
      req.session.eligibility = {};
    }
    console.log(req.session.eligibility);
    console.log(formData);
    Object.assign(req.session.eligibility, formData);
    req.session.errors = form.getErrors(formData);

    const nextUrl = req.session.errors.length > 0 ? req.url : getNextEligibilityStepUrl(req, req.session.eligibility);

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
