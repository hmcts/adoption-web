import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../app/case/case';
import { ValidationError } from '../../app/form/validation';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';

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

    this.filterErrorsForSaveAsDraft(req);

    if (req.session.errors.length > 0) {
      return this.redirect(req, res);
    }

    if (formData.addButton) {
      if (!req.session.userCase[`${this.fieldPrefix}AdditionalNationalities`]) {
        req.session.userCase[`${this.fieldPrefix}AdditionalNationalities`] = [];
      }
      if (formData.addAnotherNationality) {
        req.session.userCase[`${this.fieldPrefix}AdditionalNationalities`]?.push({
          id: `${Date.now()}`,
          country: formData.addAnotherNationality,
        });
        req.session.userCase.addAnotherNationality = '';
      }
    } else if (formData.addAnotherNationality) {
      req.session.errors.push({
        propertyName: `${this.fieldPrefix}Nationality`,
        errorType: ValidationError.ADD_BUTTON_NOT_CLICKED,
      });
      return this.redirect(req, res, req.url);
    }

    req.session.userCase = await this.save(
      req,
      {
        [`${this.fieldPrefix}Nationality`]: req.session.userCase[`${this.fieldPrefix}Nationality`],
        [`${this.fieldPrefix}AdditionalNationalities`]:
          req.session.userCase[`${this.fieldPrefix}AdditionalNationalities`],
      },
      this.getEventName(req)
    );

    if (formData.addButton) {
      //redirect to same page when add button is clicked
      return this.redirect(req, res, req.url);
    }

    this.checkReturnUrlAndRedirect(req, res, this.ALLOWED_RETURN_URLS);
  }
}
