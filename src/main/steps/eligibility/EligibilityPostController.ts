import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject } from '../../app/controller/PostController';
import { Form, FormFields } from '../../app/form/Form';
import { getNextEligibilityStepUrl } from '../../steps';
import { HOME_URL, SIGN_IN_URL } from '../../steps/urls';

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
    Object.assign(req.session.eligibility, formData);
    req.session.errors = form.getErrors(formData);

    let nextUrl = req.session.errors.length > 0 ? req.url : getNextEligibilityStepUrl(req, req.session.eligibility);
    if (nextUrl === SIGN_IN_URL && req.session?.user) {
      nextUrl = HOME_URL;
      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect(nextUrl);
      });
    } else {
      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect(nextUrl);
      });
    }
  }
}
