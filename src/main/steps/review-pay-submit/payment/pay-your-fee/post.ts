import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { PaymentStatus } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields } from '../../../../app/form/Form';
import { PaymentClient } from '../../../../app/payment/PaymentClient';
import { PaymentModel } from '../../../../app/payment/PaymentModel';
import { PAYMENT_CALLBACK_URL } from '../../../urls';

@autobind
export default class PayYourFeePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    //TODO need to uncomment this
    // if (req.session.userCase.state !== State.AwaitingPayment) {
    //   req.session.userCase = await req.locals.api.triggerEvent(req.session.userCase.id, {}, CITIZEN_SUBMIT);
    // }

    const payments = new PaymentModel(req.session.userCase.payments || []);
    if (payments.isPaymentInProgress()) {
      return this.redirect(req, res, PAYMENT_CALLBACK_URL);
    }

    const form = new Form(this.fields as FormFields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    const fee = req.session.fee;
    if (!fee) {
      req.session.errors.push({ errorType: 'errorRetrievingFee', propertyName: 'paymentType' });
      this.redirect(req, res, req.url);
      return;
    }

    if (req.session.errors.length === 0) {
      const client = this.getPaymentClient(req, res);
      const payment = await client.create();
      const now = new Date().toISOString();

      payments.add({
        created: now,
        updated: now,
        feeCode: fee.feeCode,
        amount: parseInt(fee.feeAmount, 10),
        status: PaymentStatus.IN_PROGRESS,
        channel: payment._links.next_url.href,
        reference: payment.reference,
        transactionId: payment.external_reference,
      });

      console.log(JSON.stringify(payments));

      //TODO uncomment this once CCD events are available
      // req.session.userCase = await req.locals.api.addPayment(req.session.userCase.id, payments.list);

      this.redirect(req, res, payment._links.next_url.href);
    } else {
      this.redirect(req, res, req.url);
    }
  }

  private getPaymentClient(req: AppRequest, res: Response) {
    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    return new PaymentClient(req.session, returnUrl);
  }
}
