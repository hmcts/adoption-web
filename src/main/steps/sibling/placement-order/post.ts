import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Sibling, SiblingPOType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { CHECK_ANSWERS_URL, SIBLING_ORDER_CHECK_YOUR_ANSWERS } from '../../../steps/urls';

@autobind
export default class SiblingPlacementOrderPostController extends PostController<AnyObject> {
  protected ALLOWED_RETURN_URLS: string[] = [SIBLING_ORDER_CHECK_YOUR_ANSWERS, CHECK_ANSWERS_URL];

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    const siblingObject = req.session.userCase.siblings?.find(
      item => item.siblingId === req.session.userCase.selectedSiblingId
    ) as Sibling;

    Object.assign(siblingObject, formData);
    console.log(req.session.userCase.siblings);
    if (formData['selectedSiblingPoType']) {
      siblingObject.siblingPoType = formData['selectedSiblingPoType'] as SiblingPOType;
      siblingObject.siblingPlacementOtherType = formData['selectedSiblingOtherPlacementOrderType'];
    }

    this.filterErrorsForSaveAsDraft(req);

    if (req.session.errors.length > 0) {
      this.redirect(req, res);
      return;
    }

    req.session.userCase = await this.save(
      req,
      {
        siblings: req.session.userCase.siblings,
        selectedSiblingId: req.session.userCase.selectedSiblingId,
      },
      this.getEventName(req)
    );

    super.checkReturnUrlAndRedirect(req, res, this.ALLOWED_RETURN_URLS);
  }
}
