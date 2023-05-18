import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { TASK_LIST_URL } from '../../urls';

@autobind
export default class SaveAsDraftPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    req.session.userCase.canPaymentIgnored = false;
    if (req.body.saveAsDraft) {
      req.session.destroy(() => res.redirect('/'));
    } else {
      return this.redirect(req, res, TASK_LIST_URL);
    }
  }
}
