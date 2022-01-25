import autobind from 'autobind-decorator';
import { Response } from 'express';

import { PlacementOrder } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class SiblingPlacementOrderGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const sibling = req.session.userCase.siblings;
    const siblingObject = req.session.userCase.siblings?.find(
      item => item.siblingId === req.session.userCase.selectedSiblingId
    );

    const placementOrders = siblingObject?.siblingPlacementOrders || [];

    let redirect = false;
    if (req.query.add) {
      req.session.userCase.selectedSiblingPoId = `${req.query.add}`;
      req.session.userCase.addAnotherSiblingPlacementOrder = undefined;
      delete req.query.add;
      req.url = req.url.substring(0, req.url.indexOf('?'));
      redirect = true;
    } else if (!req.session.userCase.selectedSiblingPoId || req.session.userCase.selectedSiblingPoId === 'undefined') {
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

    req.session.userCase.siblings = sibling;

    try {
      req.session.userCase = await this.save(
        req,
        {
          siblings: req.session.userCase.siblings,
          selectedSiblingPoId: req.session.userCase.selectedSiblingPoId,
          selectedSiblingId: req.session.userCase.selectedSiblingId,
        },
        this.getEventName(req)
      );
    } catch (err) {
      req.locals.logger.error('Error saving', err);
      req.session.errors?.push({ errorType: 'errorSaving', propertyName: '*' });
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }

      if (redirect) {
        res.redirect(req.url);
      } else {
        super.get(req, res);
      }
    });
  }
}
