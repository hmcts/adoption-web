import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import { FieldPrefix } from '../case/case';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';

@autobind
export default class SelectAddressPostControllerBase extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn, protected readonly fieldPrefix: FieldPrefix) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

    if (req.session.errors.length === 0) {
      const selectedAddressIndex = Number(formData[`${this.fieldPrefix}SelectAddress`]);
      if (selectedAddressIndex >= 0) {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const selectedAddress = req.session.addresses[selectedAddressIndex] as any;

        req.session.userCase[`${this.fieldPrefix}Address1`] = selectedAddress.street1;
        req.session.userCase[`${this.fieldPrefix}Address2`] = selectedAddress.street2;
        req.session.userCase[`${this.fieldPrefix}AddressTown`] = selectedAddress.town;
        req.session.userCase[`${this.fieldPrefix}AddressCounty`] = selectedAddress.county;
        req.session.userCase[`${this.fieldPrefix}AddressPostcode`] = selectedAddress.postcode;

        formData[`${this.fieldPrefix}Address1`] = selectedAddress.street1;
        formData[`${this.fieldPrefix}Address2`] = selectedAddress.street2;
        formData[`${this.fieldPrefix}AddressTown`] = selectedAddress.town;
        formData[`${this.fieldPrefix}AddressCounty`] = selectedAddress.county;
        formData[`${this.fieldPrefix}AddressPostcode`] = selectedAddress.postcode;

        try {
          req.session.userCase = await this.save(req, formData, this.getEventName(req));
        } catch (err) {
          req.locals.logger.error('Error saving', err);
          req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
        }
      }
    }

    const nextUrl = req.session.errors.length > 0 ? req.url : getNextStepUrl(req, req.session.userCase);

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
