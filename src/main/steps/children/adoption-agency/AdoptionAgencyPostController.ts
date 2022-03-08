import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';

@autobind
export default class AdoptionAgencyPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    const adoptionAgency = req.session.userCase.adopAgencyOrLAs?.find(
      item => item.adopAgencyOrLaId === req.session.userCase.selectedAdoptionAgencyId
    );

    Object.assign(adoptionAgency!, formData);

    this.filterErrorsForSaveAsDraft(req);

    if (req.session.errors.length) {
      return this.redirect(req, res, req.url);
    }

    req.session.userCase = await this.save(
      req,
      {
        adopAgencyOrLAs: req.session.userCase.adopAgencyOrLAs,
        selectedAdoptionAgencyId: req.session.userCase.selectedAdoptionAgencyId,
      },
      this.getEventName(req)
    );

    super.checkReturnUrlAndRedirect(req, res, this.ALLOWED_RETURN_URLS);
  }
}
