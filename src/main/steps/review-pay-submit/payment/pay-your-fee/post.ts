import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { CITIZEN_SUBMIT, PaymentMethod, PaymentStatus, State } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields } from '../../../../app/form/Form';
import { PaymentClient } from '../../../../app/payment/PaymentClient';
import { PaymentModel } from '../../../../app/payment/PaymentModel';
import { PAYMENT_CALLBACK_URL, TASK_LIST_URL } from '../../../urls';

@autobind
export default class PayYourFeePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(this.fields as FormFields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    const fee = req.session.userCase.applicationFeeOrderSummary?.Fees[0]?.value;
    if (!fee) {
      req.session.errors.push({ errorType: 'errorRetrievingFee', propertyName: 'paymentType' });
      this.saveAndRedirect(req, res, req.url);
      return;
    }

    Object.assign(req.session.userCase, formData);

    if (req.session.errors.length === 0) {
      if (formData['paymentType'] !== PaymentMethod.PAY_BY_CARD) {
        //other than pay by card
        this.saveAndRedirect(req, res, TASK_LIST_URL);
        return;
      }

      console.log('req.session.userCase.state', req.session.userCase.state);
      if (req.session.userCase.state !== State.AwaitingPayment) {
        req.session.userCase = await req.locals.api.triggerEvent(req.session.userCase.id, {}, CITIZEN_SUBMIT);
        console.log('req.session.userCase.state after', req.session.userCase.state);
      }

      const payments = new PaymentModel(req.session.userCase.payments || []);
      if (payments.isPaymentInProgress()) {
        return this.saveAndRedirect(req, res, PAYMENT_CALLBACK_URL);
      }

      const client = this.getPaymentClient(req, res);
      const payment = await client.create();
      const now = new Date().toISOString();

      payments.add({
        created: now,
        updated: now,
        feeCode: fee.FeeCode,
        amount: parseInt(fee.FeeAmount, 10),
        status: PaymentStatus.IN_PROGRESS,
        channel: payment._links.next_url.href,
        reference: payment.reference,
        transactionId: payment.external_reference,
      });

      req.session.userCase = await req.locals.api.addPayment(req.session.userCase.id, payments.list);

      console.log('req.session.userCase', JSON.stringify(req.session.userCase));

      this.saveAndRedirect(req, res, payment._links.next_url.href);
    } else {
      this.saveAndRedirect(req, res, req.url);
    }
  }

  private saveAndRedirect(req: AppRequest, res: Response, url: string) {
    req.session.save(err => {
      if (err) {
        throw err;
      }

      res.redirect(url);
    });
  }

  private getPaymentClient(req: AppRequest, res: Response) {
    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    return new PaymentClient(req.session, returnUrl);
  }
}
