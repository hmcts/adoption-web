import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { HOME_URL, LA_PORTAL_KBA_CASE_REF } from '../../urls';

@autobind
export default class SaveAsDraftPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (!req.session.laPortalKba) {
      req.session.destroy(() => res.redirect(HOME_URL));
    } else {
      req.session.destroy(() => res.redirect(LA_PORTAL_KBA_CASE_REF));
    }
  }
}
