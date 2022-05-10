import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { SIBLING_ORDER_SUMMARY } from '../../urls';

@autobind
export default class SiblingPostController extends PostController<AnyObject> {
  protected ALLOWED_RETURN_URLS: string[] = [SIBLING_ORDER_SUMMARY];

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    let sibling;
    if (req.body.selectedSiblingId) {
      // this flow will be invoked from select-sibling page
      this.handleSelectOrAddSiblingAction(req, formData, req.session.errors.length);
    } else {
      sibling = req.session.userCase.siblings?.find(item => item.siblingId === req.session.userCase.selectedSiblingId);
      if (sibling) {
        Object.assign(sibling, formData);
      }
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

  private handleSelectOrAddSiblingAction(
    req: AppRequest<AnyObject>,
    formData: Partial<Case>,
    errorCount: number
  ): void {
    //handle select or add sibling screen save button action
    if (req.body.selectedSiblingId === 'addAnotherSibling') {
      if (errorCount === 0) {
        // add empty sibling object in userCase
        req.session.userCase.selectedSiblingId = `${Date.now()}`;
        req.session.userCase.siblings?.push({
          siblingId: req.session.userCase.selectedSiblingId,
          siblingRelation: formData['siblingRelation'],
        });
      } else {
        req.session.userCase.selectedSiblingId = 'addAnotherSibling';
        req.session.userCase['siblingRelation'] = formData['siblingRelation'];
      }
    } else {
      //store selected sibling's id in userCase
      req.session.userCase.selectedSiblingId = formData['selectedSiblingId'];
    }
  }
}
