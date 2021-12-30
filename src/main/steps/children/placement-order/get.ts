import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class PlacementOrderGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const placementOrders = req.session.userCase.placementOrders || [];

    let addedNewPlacementOrder = false;
    if (req.query.add) {
      req.session.userCase.selectedPlacementOrderId = `${req.query.add}`;
      req.session.userCase.addAnotherPlacementOrder = undefined;
      delete req.query.add;
      req.url = req.url.substring(0, req.url.indexOf('?'));
      addedNewPlacementOrder = true;
    } else if (!req.session.userCase.selectedPlacementOrderId) {
      //generate random id for placement order
      req.session.userCase.selectedPlacementOrderId = `${Date.now()}`;
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

    req.session.save(err => {
      if (err) {
        throw err;
      }

      if (addedNewPlacementOrder) {
        res.redirect(req.url);
      } else {
        super.get(req, res);
      }
    });
  }
}
