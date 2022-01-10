import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../..';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';

@autobind
export default class PlacementOrderPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    const placementOrder = req.session.userCase.placementOrders?.find(
      item => item.placementOrderId === req.session.userCase.selectedPlacementOrderId
    );
    console.log('po 22:' + JSON.stringify(placementOrder));
    console.log('po 23:' + JSON.stringify(formData));
    Object.assign(placementOrder, formData);

    const nextUrl = req.session.errors.length > 0 ? req.url : getNextStepUrl(req, req.session.userCase);

    try {
      req.session.userCase = await this.save(
        req,
        {
          placementOrders: req.session.userCase.placementOrders,
          selectedPlacementOrderId: req.session.userCase.selectedPlacementOrderId,
        },
        this.getEventName(req)
      );
    } catch (err) {
      req.locals.logger.error('Error saving', err);
      //req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
