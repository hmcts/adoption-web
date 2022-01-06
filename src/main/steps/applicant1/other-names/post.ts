//import { YesOrNo } from 'app/case/definition';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { getNextStepUrl } from '../../../steps';

@autobind
export default class OtherNamesPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);
    Object.assign(req.session.userCase, formData);
    console.log('post.ts 19');
    if (req.session.errors.length === 0) {
      console.log('post.ts 21');
      try {
        req.session.userCase = await this.save(req, formData, this.getEventName(req));
      } catch (err) {
        req.locals.logger.error('Error saving', err);
        //req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }

      if (formData.addButton) {
        if (!req.session.userCase.applicant1AdditionalNames) {
          req.session.userCase.applicant1AdditionalNames = [];
        }
        if (formData.applicant1AdditionalNames) {
          req.session.userCase.applicant1AdditionalNames.push(formData.applicant1AdditionalNames[0]);
          //req.session.userCase.applicant1AdditionalNames = '';
        }
      }
    }

    const nextUrl =
      req.session.errors.length > 0 || formData.addButton ? req.url : getNextStepUrl(req, req.session.userCase);

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
