import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class PlacementOrderGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const placementOrders = req.session.userCase.placementOrders || [];

    if (!req.session.userCase.selectedPlacementOrderId) {
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

      super.get(req, res);
    });
  }
}
