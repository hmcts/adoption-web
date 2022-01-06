import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getNextStepUrl } from '../../../../steps';

@autobind
export default class SelectAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

    if (req.session.errors.length === 0) {
      const selectedAddressIndex = Number(formData.applicant2SelectAddress);
      if (selectedAddressIndex >= 0) {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const selectedAddress = req.session.addresses[selectedAddressIndex] as any;
        req.session.userCase.applicant2Address1 = selectedAddress.street1;
        req.session.userCase.applicant2Address2 = selectedAddress.street2;
        req.session.userCase.applicant2AddressTown = selectedAddress.town;
        req.session.userCase.applicant2AddressCounty = selectedAddress.county;
        req.session.userCase.applicant2AddressPostcode = selectedAddress.postcode;

        formData.applicant2Address1 = selectedAddress.street1;
        formData.applicant2Address2 = selectedAddress.street2;
        formData.applicant2AddressTown = selectedAddress.town;
        formData.applicant2AddressCounty = selectedAddress.county;
        formData.applicant2AddressPostcode = selectedAddress.postcode;

        console.log('select-address: ' + JSON.stringify(selectedAddress));
        try {
          req.session.userCase = await this.save(req, formData, this.getEventName(req));
        } catch (err) {
          req.locals.logger.error('Error saving', err);
          //req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
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
