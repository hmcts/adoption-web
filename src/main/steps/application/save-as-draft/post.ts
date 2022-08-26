import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { CHECK_ANSWERS_URL, TASK_LIST_URL } from '../../urls';

@autobind
export default class SaveAsDraftPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (req.body.saveAsDraft) {
      req.session.destroy(() => res.redirect('/'));
    } else if (req.session.userCase.checkYourAnswersReturn) {
      return this.redirect(req, res, CHECK_ANSWERS_URL);
    } else {
      return this.redirect(req, res, TASK_LIST_URL);
    }
  }
}
