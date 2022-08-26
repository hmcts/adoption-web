import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../app/case/case';
import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';

@autobind
export default class ChangeAddressController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn, protected readonly fieldPrefix: FieldPrefix) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    req.session.returnUrl = undefined;

    if (req.session.errors.length > 0) {
      this.redirect(req, res);
      return;
    }

    if (formData['changeAddressBothApplicants'] === YesOrNo.YES) {
      req.session.userCase = await this.save(
        req,
        {
          ['applicant2Address1']: req.session.userCase['applicant1Address1'],
          ['applicant2Address2']: req.session.userCase['applicant1Address2'],
          ['applicant2AddressTown']: req.session.userCase['applicant1AddressTown'],
          ['applicant2AddressCounty']: req.session.userCase['applicant1AddressCounty'],
          ['applicant2AddressPostcode']: req.session.userCase['applicant1AddressPostcode'],
        },
        this.getEventName(req)
      );
    }

    Object.assign(req.session.userCase, formData);

    req.session.userCase.checkYourAnswersReturn = true;

    this.redirect(req, res);
  }
}
