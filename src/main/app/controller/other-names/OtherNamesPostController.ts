import autobind from 'autobind-decorator';
import { Response } from 'express';
import { v4 as generateUuid } from 'uuid';

import { ValidationError } from '../../../app/form/validation';
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
            id: generateUuid(),
            firstNames: formData[`${this.fieldPrefix}OtherFirstNames`],
            lastNames: formData[`${this.fieldPrefix}OtherLastNames`],
          });
          req.session.userCase[`${this.fieldPrefix}OtherFirstNames`] = '';
          req.session.userCase[`${this.fieldPrefix}OtherLastNames`] = '';
        }
        try {
          req.session.userCase = await this.save(
            req,
            {
              ...formData,
              [`${this.fieldPrefix}AdditionalNames`]: req.session.userCase[`${this.fieldPrefix}AdditionalNames`],
            },
            this.getEventName(req)
          );
        } catch (err) {
          req.locals.logger.error('Error saving', err);
          // req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
        }
      } else {
        try {
          req.session.userCase = await this.save(req, formData, this.getEventName(req));
        } catch (err) {
          req.locals.logger.error('Error saving', err);
          // req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
        }
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

    if (req.body.saveAsDraft) {
      // skip empty field errors in case of save as draft
      req.session.errors = req.session.errors.filter(item => item.errorType !== ValidationError.REQUIRED);
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
