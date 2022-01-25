import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../..';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { ValidationError } from '../../../app/form/validation';

@autobind
export default class SiblingPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    const sibling = req.session.userCase.siblings?.find(
      item => item.siblingId === req.session.userCase.selectedSiblingId
    );

    Object.assign(sibling, formData);

    if (req.body.saveAsDraft) {
      // skip empty field errors in case of save as draft
      req.session.errors = req.session.errors.filter(item => item.errorType !== ValidationError.REQUIRED);
    }

    const nextUrl = req.session.errors.length > 0 ? req.url : getNextStepUrl(req, req.session.userCase);

    try {
      req.session.userCase = await this.save(
        req,
        {
          siblings: req.session.userCase.siblings,
          selectedSiblingId: req.session.userCase.selectedSiblingId,
        },
        this.getEventName(req)
      );
    } catch (err) {
      req.locals.logger.error('Error saving', err);
      req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
