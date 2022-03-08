import autobind from 'autobind-decorator';
import { Response } from 'express';

import { PlacementOrder } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { SIBLING_ORDER_CHECK_YOUR_ANSWERS } from '../../../steps/urls';

@autobind
export default class SiblingPlacementOrderPostController extends PostController<AnyObject> {
  protected ALLOWED_RETURN_URLS: string[] = [SIBLING_ORDER_CHECK_YOUR_ANSWERS];

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

    if (req.session.errors.length > 0) {
      this.redirect(req, res);
      return;
    }

    req.session.userCase = await this.save(
      req,
      {
        siblings: req.session.userCase.siblings,
        selectedSiblingPoId: req.session.userCase.selectedSiblingPoId,
        selectedSiblingId: req.session.userCase.selectedSiblingId,
      },
      this.getEventName(req)
    );

    super.checkReturnUrlAndRedirect(req, res, this.ALLOWED_RETURN_URLS);
  }
}
