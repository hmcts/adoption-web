import autobind from 'autobind-decorator';
import { Response } from 'express';

import { PlacementOrder } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class SiblingPlacementOrderGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    let redirect = false;
    if (req.query.add) {
      this.addSiblingPlacementOrder(req);
      redirect = true;
    } else if (req.query.change) {
      this.changeSiblingPlacementOrder(req);
      redirect = true;
    } else if (req.query.remove) {
      this.removeSiblingPlacementOrder(req);
      redirect = true;
    }

    const siblings = req.session.userCase.siblings;
    const siblingObject = siblings?.find(item => item.siblingId === req.session.userCase.selectedSiblingId);
    const placementOrders = siblingObject?.siblingPlacementOrders || [];

    if (!req.session.userCase.selectedSiblingPoId) {
      //generate random id for placement order if there are no placement orders
      req.session.userCase.selectedSiblingPoId =
        (placementOrders as PlacementOrder[])[0]?.placementOrderId || `${Date.now()}`;
    }

    let placementOrder = siblingObject?.siblingPlacementOrders?.find(
      item => (item as PlacementOrder).placementOrderId === req.session.userCase.selectedSiblingPoId
    );

    if (!placementOrder) {
      placementOrder = {
        placementOrderId: req.session.userCase.selectedSiblingPoId,
      };
      placementOrders.push(placementOrder);
    }

    siblingObject!.siblingPlacementOrders = placementOrders;
    req.session.userCase.siblings = siblings;

    req.session.userCase = await this.save(
      req,
      {
        siblings: req.session.userCase.siblings,
        selectedSiblingPoId: req.session.userCase.selectedSiblingPoId,
        selectedSiblingId: req.session.userCase.selectedSiblingId,
      },
      this.getEventName(req)
    );

    const callback = redirect ? undefined : () => super.get(req, res);

    super.saveSessionAndRedirect(req, res, callback);
  }

  private addSiblingPlacementOrder(req: AppRequest) {
    req.session.userCase.selectedSiblingPoId = `${req.query.add}`;
    req.session.userCase.addAnotherSiblingPlacementOrder = undefined;
    delete req.query.add;
    req.url = req.url.substring(0, req.url.indexOf('?'));
  }

  private changeSiblingPlacementOrder(req: AppRequest) {
    const [siblingId, placementOrderId] = `${req.query.change}`.split('/');
    req.session.userCase.selectedSiblingId = siblingId;
    req.session.userCase.selectedSiblingPoId = placementOrderId;
    this.parseAndSetReturnUrl(req);
    delete req.query.change;
    req.url = req.url.substring(0, req.url.indexOf('?'));
  }

  private removeSiblingPlacementOrder(req: AppRequest) {
    const [siblingId, placementOrderId] = `${req.query.remove}`.split('/');
    req.session.userCase.selectedSiblingId = siblingId;
    req.session.userCase.selectedSiblingPoId = placementOrderId;
    delete req.query.remove;
    req.url = req.url.substring(0, req.url.indexOf('?'));
  }
}
