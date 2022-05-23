import autobind from 'autobind-decorator';
import { Response } from 'express';

import { ValidationError } from '../../../app/form/validation';
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

    const addButtonClicked = req.body.addAnotherNameHidden || req.body.addButton;

    req.session.errors = form.getErrors(req.body);
    Object.assign(req.session.userCase, formData);

    if (req.session.errors.length === 0) {
      if (addButton) {
        if (!req.session.userCase[`${this.fieldPrefix}AdditionalNames`]) {
          req.session.userCase[`${this.fieldPrefix}AdditionalNames`] = [];
        }

        if (formData[`${this.fieldPrefix}OtherFirstNames`] && formData[`${this.fieldPrefix}OtherLastNames`]) {
          req.session.userCase[`${this.fieldPrefix}AdditionalNames`].push({
            id: Date.now(),
            firstNames: formData[`${this.fieldPrefix}OtherFirstNames`],
            lastNames: formData[`${this.fieldPrefix}OtherLastNames`],
          });
          req.session.userCase[`${this.fieldPrefix}OtherFirstNames`] = '';
          req.session.userCase[`${this.fieldPrefix}OtherLastNames`] = '';
        }

        req.session.userCase = await this.save(
          req,
          {
            ...formData,
            [`${this.fieldPrefix}AdditionalNames`]: req.session.userCase[`${this.fieldPrefix}AdditionalNames`],
          },
          this.getEventName(req)
        );
      } else if (formData[`${this.fieldPrefix}OtherFirstNames`] && formData[`${this.fieldPrefix}OtherLastNames`]) {
        req.session.errors.push({
          propertyName: `${this.fieldPrefix}HasOtherNames`,
          errorType: ValidationError.ADD_BUTTON_NOT_CLICKED,
        });
        req.session.userCase.addAnotherNameHidden = `${!addButtonClicked}`;
      } else {
        req.session.userCase = await this.save(req, formData, this.getEventName(req));
      }
    } else if (req.session.userCase[`${this.fieldPrefix}AdditionalNames`]?.length && !addButtonClicked) {
      // Remove validation errors when there is more than one additional name
      // and user clicked "Save and Continue" button directly without expanding the details component
      const ignoreErrorFields = [`${this.fieldPrefix}OtherFirstNames`, `${this.fieldPrefix}OtherLastNames`];
      req.session.errors = req.session.errors.filter(item => !ignoreErrorFields.includes(item.propertyName));
    }

    if (req.session.errors.length && addButtonClicked) {
      // This is required so that details component will be displayed in open state along with errors
      req.session.userCase.addAnotherNameHidden = `${!!addButtonClicked}`;
    }

    this.filterErrorsForSaveAsDraft(req);

    if (req.session.errors.length > 0 || addButton) {
      this.redirect(req, res, req.url);
      return;
    }

    this.checkReturnUrlAndRedirect(req, res, this.ALLOWED_RETURN_URLS);
  }
}
