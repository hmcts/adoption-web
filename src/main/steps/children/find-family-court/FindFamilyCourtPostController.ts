import autobind from 'autobind-decorator';
import { Response } from 'express';

import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';

import { getCourtEmailId } from './util';

@autobind
export default class FindFamilyCourtPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

    if (req.session.errors.length === 0) {
      const findFamilyCourt = req.session.userCase.findFamilyCourt;
      const familyCourtName =
        findFamilyCourt === YesOrNo.YES
          ? req.session.userCase.placementOrders![0].placementOrderCourt
          : req.session.userCase.familyCourtName;
      const familyCourtEmailId = getCourtEmailId(familyCourtName as string);

      req.session.userCase = await this.save(
        req,
        {
          findFamilyCourt,
          familyCourtName,
          familyCourtEmailId,
        },
        this.getEventName(req)
      );
    }
    this.filterErrorsForSaveAsDraft(req);

    super.checkReturnUrlAndRedirect(req, res, this.ALLOWED_RETURN_URLS);
  }
}
