import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { APPLICANT_SOCIAL_WORKER, CHILDREN_FIND_PLACEMENT_ORDER_COURT, SOCIAL_WORKER } from '../../urls';

@autobind
export default class FindFamilyCourtPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const filledPlacementOrderCourt = req.body.autoCompleteData ? req.body.autoCompleteData + '' : '';
    const isFilledPlacementOrderCourt = isFieldFilledIn(filledPlacementOrderCourt);
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

    this.filterErrorsForSaveAsDraft(req);
    if (isFilledPlacementOrderCourt) {
      if (req.session.errors.filter(e => e.propertyName === 'placementOrderCourt').length === 0) {
        if (req.path === CHILDREN_FIND_PLACEMENT_ORDER_COURT) {
          req.session.errors.push({
            id: 'location-picker',
            errorType: isFilledPlacementOrderCourt,
            propertyName: 'placementOrderCourt',
          });
        } else if (req.path === SOCIAL_WORKER) {
          req.session.errors.push({
            id: 'location-picker',
            errorType: isFilledPlacementOrderCourt,
            propertyName: 'childLocalAuthority',
          });
        } else if (req.path === APPLICANT_SOCIAL_WORKER) {
          req.session.errors.push({
            id: 'location-picker',
            errorType: isFilledPlacementOrderCourt,
            propertyName: 'applicantLocalAuthority',
          });
        }
      }
    }
    if (req.session.errors.length > 0) {
      this.redirect(req, res);
      return;
    }

    await super.post(req, res);
  }
}
