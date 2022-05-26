import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../app/form/Form';
import { TASK_LIST_URL } from '../../steps/urls';

@autobind
export class SaveAsDraftPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (req.body.saveAsDraft) {
      //return res.redirect(SIGN_OUT_URL);
      req.session.destroy(() => res.redirect('/'));
      //return this.redirect(req, res, SIGN_OUT_URL);
    } else {
      console.log('8. submit ' + req.body.saveAsDraft);
      return this.redirect(req, res, TASK_LIST_URL);
    }
    // this.checkReturnUrlAndRedirect(req, res, this.ALLOWED_RETURN_URLS);
  }
}
