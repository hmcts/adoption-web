import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';

@autobind
export default class PlacementOrderPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const enum PlacementOrderTypeEnum {
      AdoptionOrder = 'Adoption Order',
      CareOrder = 'Care Order',
      ContactOrder = 'Contact Order',
      FreeingOrder = 'Freeing Order',
      PlacementOrder = 'Placement Order',
      SupervisionOrder = 'Supervision Order',
      Other = 'Other',
    }
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    const placementOrder = req.session.userCase.placementOrders?.find(
      item => item.placementOrderId === req.session.userCase.selectedPlacementOrderId
    );

    if (placementOrder) {
      placementOrder.placementOrderType = formData['selectedPlacementOrderType'] as PlacementOrderTypeEnum;
    }

    //Object.assign(placementOrder!, formData);

    this.filterErrorsForSaveAsDraft(req);

    if (req.session.errors.length > 0) {
      return this.redirect(req, res);
    }

    req.session.userCase = await this.save(
      req,
      {
        placementOrders: req.session.userCase.placementOrders,
        selectedPlacementOrderId: req.session.userCase.selectedPlacementOrderId,
      },
      this.getEventName(req)
    );

    super.checkReturnUrlAndRedirect(req, res, this.ALLOWED_RETURN_URLS);
  }
}
