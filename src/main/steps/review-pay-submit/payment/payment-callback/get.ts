import config from 'config';
import { Response } from 'express';

import { State } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { PaymentClient } from '../../../../app/payment/PaymentClient';
import { PaymentModel } from '../../../../app/payment/PaymentModel';
import { CHECK_ANSWERS_URL, PAYMENT_CALLBACK_URL, PAY_YOUR_FEE, TASK_LIST_URL } from '../../../urls';

export default class PaymentCallbackGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    console.log('req.session.userCase', JSON.stringify(req.session.userCase));
    if (req.session.userCase.state !== State.AwaitingPayment) {
      return res.redirect(CHECK_ANSWERS_URL);
    }

    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    const paymentClient = new PaymentClient(req.session, returnUrl);
    const payments = new PaymentModel(req.session.userCase.payments);

    console.log('payments.hasPayment', payments.hasPayment);
    if (!payments.hasPayment) {
      return res.redirect(CHECK_ANSWERS_URL);
    }

    const lastPaymentAttempt = payments.lastPayment;
    const payment = await paymentClient.get(lastPaymentAttempt.reference);

    console.log('payment?.status', payment?.status);
    if (payment?.status === 'Initiated') {
      return res.redirect(lastPaymentAttempt.channel);
    }

    console.log('lastPaymentAttempt.transactionId', lastPaymentAttempt.transactionId);
    payments.setStatus(lastPaymentAttempt.transactionId, payment?.status);

    req.session.userCase = await req.locals.api.addPayment(req.session.userCase.id, payments.list);

    console.log('req.session.userCase', JSON.stringify(req.session.userCase));

    req.session.save(() => {
      console.log('payments.wasLastPaymentSuccessful', payments.wasLastPaymentSuccessful);
      if (payments.wasLastPaymentSuccessful) {
        //TODO redirect to application submitted screen later
        // return res.redirect(APPLICATION_SUBMITTED);
        return res.redirect(TASK_LIST_URL);
      }

      res.redirect(req.query.back ? CHECK_ANSWERS_URL : PAY_YOUR_FEE);
    });
  }
}
