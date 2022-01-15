import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { PaymentStatus } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../app/controller/PostController';
import { PaymentClient } from '../../../../app/payment/PaymentClient';
import { PaymentModel } from '../../../../app/payment/PaymentModel';
import { PAYMENT_CALLBACK_URL, SAVE_AND_SIGN_OUT } from '../../../urls';

@autobind
export default class PaymentPostController {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (req.body.saveAndSignOut) {
      return res.redirect(SAVE_AND_SIGN_OUT);
    }

    //TODO need to uncomment this
    // if (req.session.userCase.state !== State.AwaitingPayment) {
    //   req.session.userCase = await req.locals.api.triggerEvent(req.session.userCase.id, {}, CITIZEN_SUBMIT);
    // }

    const payments = new PaymentModel(req.session.userCase.payments || []);
    if (payments.isPaymentInProgress()) {
      return this.saveAndRedirect(req, res, PAYMENT_CALLBACK_URL);
    }

    const fee = req.session.fee;
    const client = this.getPaymentClient(req, res);
    const payment = await client.create();
    const now = new Date().toISOString();

    payments.add({
      created: now,
      updated: now,
      feeCode: fee.code,
      amount: parseInt(fee.fee_amount, 10),
      status: PaymentStatus.IN_PROGRESS,
      channel: payment._links.next_url.href,
      reference: payment.reference,
      transactionId: payment.external_reference,
    });

    req.session.userCase = await req.locals.api.addPayment(req.session.userCase.id, payments.list);

    this.saveAndRedirect(req, res, payment._links.next_url.href);
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
