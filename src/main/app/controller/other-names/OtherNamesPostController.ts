import autobind from 'autobind-decorator';
import { Response } from 'express';
import { v4 as generateUuid } from 'uuid';

import { getNextStepUrl } from '../../../steps';
import { FieldPrefix } from '../../case/case';
import { Form, FormFields, FormFieldsFn } from '../../form/Form';
import { AppRequest } from '../AppRequest';
import { AnyObject, PostController } from '../PostController';

@autobind
export default class OtherNamesPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn, protected readonly fieldPrefix: FieldPrefix) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, addButton, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);
    Object.assign(req.session.userCase, formData);
    if (req.session.errors.length === 0) {
      console.log('post.ts 19 ' + JSON.stringify(formData));
      if (addButton) {
        if (!req.session.userCase[`${this.fieldPrefix}AdditionalNames`]) {
          req.session.userCase[`${this.fieldPrefix}AdditionalNames`] = [];
        }

        if (formData[`${this.fieldPrefix}OtherFirstNames`] && formData[`${this.fieldPrefix}OtherLastNames`]) {
          req.session.userCase[`${this.fieldPrefix}AdditionalNames`].push({
            id: generateUuid(),
            firstNames: formData[`${this.fieldPrefix}OtherFirstNames`],
            lastNames: formData[`${this.fieldPrefix}OtherLastNames`],
          });
          req.session.userCase[`${this.fieldPrefix}OtherFirstNames`] = '';
          req.session.userCase[`${this.fieldPrefix}OtherLastNames`] = '';
        }
        try {
          console.log('post.ts 32 data before save' + JSON.stringify(formData));
          console.log(
            'post.ts 33 data before save' + JSON.stringify(req.session.userCase[`${this.fieldPrefix}AdditionalNames`])
          );
          req.session.userCase = await this.save(
            req,
            {
              ...formData,
              [`${this.fieldPrefix}AdditionalNames`]: req.session.userCase[`${this.fieldPrefix}AdditionalNames`],
            },
            this.getEventName(req)
          );
          console.log('after save', req.session.userCase);
        } catch (err) {
          req.locals.logger.error('Error saving', err);
          // req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
        }
      } else {
        console.log('post.ts 41' + JSON.stringify(formData));
        try {
          req.session.userCase = await this.save(req, formData, this.getEventName(req));
        } catch (err) {
          req.locals.logger.error('Error saving', err);
          // req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
        }
      }
    }

    const nextUrl = req.session.errors.length > 0 || addButton ? req.url : getNextStepUrl(req, req.session.userCase);

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
