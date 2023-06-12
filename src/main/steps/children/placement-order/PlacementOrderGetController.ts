import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { getCourtList } from '../../../app/court/court-venues-api';

@autobind
export default class PlacementOrderGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    let placementOrders = req.session.userCase.placementOrders || [];

    let redirect = false;
    if (req.query.add) {
      req.session.userCase.selectedPlacementOrderId = `${req.query.add}`;
      req.session.userCase.addAnotherPlacementOrder = undefined;
      delete req.query.add;
      req.url = req.url.substring(0, req.url.indexOf('?'));
      redirect = true;
    } else if (req.query.change) {
      req.session.userCase.selectedPlacementOrderId = `${req.query.change}`;
      this.parseAndSetReturnUrl(req);
      delete req.query.change;
      req.url = req.url.substring(0, req.url.indexOf('?'));
      redirect = true;
    } else if (req.query.confirm) {
      req.session.userCase.selectedPlacementOrderId = `${req.query.confirm}`;
    } else if (req.query.remove) {
      placementOrders = placementOrders.filter(item => item.placementOrderId !== `${req.query.remove}`);
      req.session.userCase.selectedPlacementOrderId = placementOrders[0].placementOrderId;
      req.session.userCase.addAnotherPlacementOrder = undefined;
      delete req.query.remove;
      req.url = req.url.substring(0, req.url.indexOf('?'));
      redirect = true;
    } else if (
      !req.session.userCase.selectedPlacementOrderId ||
      req.session.userCase.selectedPlacementOrderId === 'undefined'
    ) {
      //generate random id for placement order if there are no placement orders
      req.session.userCase.selectedPlacementOrderId = placementOrders[0]?.placementOrderId || `${Date.now()}`;
    }

    let placementOrder = placementOrders.find(
      item => item.placementOrderId === req.session.userCase.selectedPlacementOrderId
    );

    if (!placementOrder) {
      placementOrder = {
        placementOrderId: req.session.userCase.selectedPlacementOrderId,
      };

      placementOrders.push(placementOrder);
    }

    req.session.userCase.placementOrders = placementOrders;

    req.session.userCase = await this.save(
      req,
      {
        placementOrders: req.session.userCase.placementOrders,
        selectedPlacementOrderId: req.session.userCase.selectedPlacementOrderId,
      },
      this.getEventName(req)
    );

    if (!req.session.userCase.selectedPlacementOrderId) {
      req.session.userCase.selectedPlacementOrderId = placementOrders[0]?.placementOrderId;
    }

    req.session.userCase.selectedPlacementOrderType = placementOrder?.placementOrderType;
    req.session.userCase.selectedOtherPlacementOrderType = placementOrder?.otherPlacementOrderType;
    const courtList = await getCourtList(req);
    req.session.courtList = courtList;
    const callback = redirect ? undefined : () => super.get(req, res);

    super.saveSessionAndRedirect(req, res, callback);
  }
}
