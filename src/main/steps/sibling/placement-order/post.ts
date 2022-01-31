import autobind from 'autobind-decorator';
import { Response } from 'express';

import { PlacementOrder } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';

@autobind
export default class SiblingPlacementOrderPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    const siblingObject = req.session.userCase.siblings?.find(
      item => item.siblingId === req.session.userCase.selectedSiblingId
    );

    const placementOrder = siblingObject?.siblingPlacementOrders?.find(
      item => (item as PlacementOrder).placementOrderId === req.session.userCase.selectedSiblingPoId
    );

    Object.assign(placementOrder, formData);

    this.filterErrorsForSaveAsDraft(req);

    req.session.userCase = await this.save(
      req,
      {
        siblings: req.session.userCase.siblings,
        selectedSiblingPoId: req.session.userCase.selectedSiblingPoId,
        selectedSiblingId: req.session.userCase.selectedSiblingId,
      },
      this.getEventName(req)
    );

    this.redirect(req, res);
  }
}
