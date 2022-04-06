import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';

@autobind
export default class SameAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

    this.filterErrorsForSaveAsDraft(req);

    if (req.session.errors.length === 0) {
      const { userCase } = req.session;

      userCase.applicant2Address1 = userCase.applicant1Address1;
      userCase.applicant2Address2 = userCase.applicant1Address2;
      userCase.applicant2AddressTown = userCase.applicant1AddressTown;
      userCase.applicant2AddressCounty = userCase.applicant1AddressCounty;
      userCase.applicant2AddressPostcode = userCase.applicant1AddressPostcode;

      formData.applicant2Address1 = userCase.applicant1Address1;
      formData.applicant2Address2 = userCase.applicant1Address2;
      formData.applicant2AddressTown = userCase.applicant1AddressTown;
      formData.applicant2AddressCounty = userCase.applicant1AddressCounty;
      formData.applicant2AddressPostcode = userCase.applicant1AddressPostcode;

      req.session.userCase = await this.save(req, formData, this.getEventName(req));
    }

    this.redirect(req, res);
  }
}
