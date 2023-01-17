import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../app/case/case';
import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../app/form/Form';

@autobind
export default class ManualAddressPostControllerBase extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn, protected readonly fieldPrefix: FieldPrefix) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

    if (req.session.errors.length === 0) {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any

      req.session.userCase[`${this.fieldPrefix}Address1`] = formData['street1'];
      req.session.userCase[`${this.fieldPrefix}Address2`] = formData['street2'];
      req.session.userCase[`${this.fieldPrefix}AddressTown`] = formData['town'];
      req.session.userCase[`${this.fieldPrefix}AddressCounty`] = formData['county'];
      req.session.userCase[`${this.fieldPrefix}AddressPostcode`] = formData['postcode'];

      req.session.userCase = await this.save(req, formData, this.getEventName(req));

      if (req.session.returnUrl === '/review-pay-submit/check-your-answers') {
        req.session.userCase.checkYourAnswersReturn = true;
      }
    }

    this.filterErrorsForSaveAsDraft(req);

    this.redirect(req, res);
  }
}
