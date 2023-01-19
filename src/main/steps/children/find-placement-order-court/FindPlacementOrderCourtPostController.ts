import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

@autobind
export default class FindFamilyCourtPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const filledPlacementOrderCourt = req.body.autoCompleteData ? req.body.autoCompleteData + '' : '';
    const isFilledPlacementOrderCourt = isFieldFilledIn(filledPlacementOrderCourt);
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

    this.filterErrorsForSaveAsDraft(req);

    if (isFilledPlacementOrderCourt) {
      if (req.session.errors.filter(e => e.propertyName === 'placementOrderCourt').length === 0) {
        req.session.errors.push({ propertyName: 'placementOrderCourt', errorType: isFilledPlacementOrderCourt });
      }
    }
    if (req.session.errors.length > 0) {
      this.redirect(req, res);
      return;
    }

    super.post(req, res);
  }
}
