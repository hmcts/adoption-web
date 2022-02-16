import autobind from 'autobind-decorator';
import { Response } from 'express';

import { PlacementOrder, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields } from '../../../app/form/Form';

@autobind
export default class SiblingRemovePlacementOrderPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = this.fields as FormFields;
    const form = new Form(fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    this.filterErrorsForSaveAsDraft(req);

    if (req.session.errors.length > 0) {
      this.redirect(req, res);
      return;
    }

    if (formData['confirm'] === YesOrNo.YES) {
      const siblingObject = req.session.userCase.siblings?.find(
        item => item.siblingId === req.session.userCase.selectedSiblingId
      );

      //remove placement order from sibling placement orders list
      const siblingPlacementOrders = (siblingObject?.siblingPlacementOrders as PlacementOrder[])?.filter(
        item => item.placementOrderId !== req.session.userCase.selectedSiblingPoId
      );

      if (siblingPlacementOrders.length === 0) {
        // remove sibling object if there are no placement orders left
        req.session.userCase.siblings = req.session.userCase.siblings?.filter(
          item => item.siblingId !== req.session.userCase.selectedSiblingId
        );
      } else {
        siblingObject!.siblingPlacementOrders = siblingPlacementOrders;
      }

      req.session.userCase = await this.save(
        req,
        {
          siblings: req.session.userCase.siblings,
          selectedSiblingPoId: undefined,
          selectedSiblingId: undefined,
        },
        this.getEventName(req)
      );
    }

    super.redirect(req, res);
  }
}
