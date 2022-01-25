import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../app/case/case';
import { getNextStepUrl } from '../../steps';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';
import { ValidationError } from '../form/validation';

@autobind
export default class NationalityPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn, protected readonly fieldPrefix: FieldPrefix) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

    if (req.session.errors.length === 0) {
      if (formData.addButton) {
        if (!req.session.userCase[`${this.fieldPrefix}AdditionalNationalities`]) {
          req.session.userCase[`${this.fieldPrefix}AdditionalNationalities`] = [];
        }
        if (formData.addAnotherNationality) {
          req.session.userCase[`${this.fieldPrefix}AdditionalNationalities`]?.push(formData.addAnotherNationality);
          req.session.userCase.addAnotherNationality = '';
        }
      }

      try {
        req.session.userCase = await this.save(
          req,
          {
            [`${this.fieldPrefix}Nationality`]: req.session.userCase[`${this.fieldPrefix}Nationality`],
            [`${this.fieldPrefix}AdditionalNationalities`]:
              req.session.userCase[`${this.fieldPrefix}AdditionalNationalities`],
          },
          this.getEventName(req)
        );
      } catch (err) {
        req.locals.logger.error('Error saving', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }

    if (req.body.saveAsDraft) {
      // skip empty field errors in case of save as draft
      req.session.errors = req.session.errors.filter(item => item.errorType !== ValidationError.REQUIRED);
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
