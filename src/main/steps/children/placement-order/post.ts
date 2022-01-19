import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../..';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { ValidationError } from '../../../app/form/validation';

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

    Object.assign(placementOrder, formData);

    if (req.body.saveAsDraft) {
      // skip empty field errors in case of save as draft
      req.session.errors = req.session.errors.filter(item => item.errorType !== ValidationError.REQUIRED);
    }

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
