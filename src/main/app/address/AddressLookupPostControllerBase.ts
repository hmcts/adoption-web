import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../app/case/case';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';
import { Address, getAddressesFromPostcode } from '../postcode/postcode-lookup-api';

@autobind
export default class AddressLookupPostControllerBase extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn, protected readonly fieldPrefix: FieldPrefix) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const postcode = req.body[`${this.fieldPrefix}AddressPostcode`] as string;

    let addresses;

    const form = new Form(<FormFields>this.fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

    if (req.session.errors.length === 0) {
      const stubbedPostcode = this.checkStubbedPostcode(postcode);
      if (stubbedPostcode) {
        console.log('hello 1');
        addresses = stubbedPostcode;
      } else {
        addresses = await getAddressesFromPostcode(postcode, req.locals.logger);
        console.log('hello 2');
        req.session.userCase = await this.save(
          req,
          {
            [`${this.fieldPrefix}Address1`]: null,
            [`${this.fieldPrefix}Address2`]: null,
            [`${this.fieldPrefix}AddressTown`]: null,
            [`${this.fieldPrefix}AddressCounty`]: null,
            [`${this.fieldPrefix}AddressPostcode`]: postcode,
          },
          this.getEventName(req)
        );
      }
      req.session.addresses = addresses;
      console.log('hello 3' + { ...addresses });

      if (req.session.returnUrl === '/review-pay-submit/check-your-answers') {
        req.session.userCase.checkYourAnswersReturn = true;
      }
    }

    if (req.body.saveAsDraft) {
      console.log('hello');
      req.session.userCase = await this.save(
        req,
        {
          [`${this.fieldPrefix}Address1`]: null,
          [`${this.fieldPrefix}Address2`]: null,
          [`${this.fieldPrefix}AddressTown`]: null,
          [`${this.fieldPrefix}AddressCounty`]: null,
          [`${this.fieldPrefix}AddressPostcode`]: postcode,
        },
        this.getEventName(req)
      );
      // req.session.userCase[`${this.fieldPrefix}AddressPostcode`] = selectedAddress.postcode;
    }

    this.redirect(req, res);
  }

  private checkStubbedPostcode(postcode: string): Address[] | null {
    if (postcode === 'SW1A 1AA') {
      return [
        {
          fullAddress: 'BUCKINGHAM PALACE, LONDON, SW1A 1AA',
          street1: 'BUCKINGHAM PALACE',
          street2: '',
          town: 'LONDON',
          county: 'CITY OF WESTMINSTER',
          postcode: 'SW1A 1AA',
        },
      ];
    }

    if (postcode === 'SW1H 9AJ') {
      return [
        {
          fullAddress: 'MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ',
          street1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
          street2: '',
          town: 'LONDON',
          county: 'CITY OF WESTMINSTER',
          postcode: 'SW1H 9AJ',
        },
      ];
    }

    if (postcode === 'ZZ00 0ZZ') {
      return [];
    }

    return null;
  }
}
