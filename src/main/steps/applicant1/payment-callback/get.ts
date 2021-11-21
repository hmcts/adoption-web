import config from 'config';
import { Response } from 'express';

import { ApplicationType, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { PaymentClient } from '../../../app/payment/PaymentClient';
import { PaymentModel } from '../../../app/payment/PaymentModel';
import {
  APPLICATION_SUBMITTED,
  CHECK_ANSWERS_URL,
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
} from '../../urls';

export default class PaymentCallbackGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.AwaitingPayment) {
      return res.redirect(CHECK_ANSWERS_URL);
    }

    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    const paymentClient = new PaymentClient(req.session, returnUrl);
    const payments = new PaymentModel(req.session.userCase.payments);

    if (!payments.hasPayment) {
      return res.redirect(CHECK_ANSWERS_URL);
    }

    const lastPaymentAttempt = payments.lastPayment;
    const payment = await paymentClient.get(lastPaymentAttempt.reference);

    if (payment?.status === 'Initiated') {
      return res.redirect(lastPaymentAttempt.channel);
    }

    payments.setStatus(lastPaymentAttempt.transactionId, payment?.status);

    req.session.userCase = await req.locals.api.addPayment(req.session.userCase.id, payments.list);

    req.session.save(() => {
      if (payments.wasLastPaymentSuccessful) {
        return res.redirect(APPLICATION_SUBMITTED);
      }

      res.redirect(
        req.query.back
          ? CHECK_ANSWERS_URL
          : req.session.userCase.applicationType === ApplicationType.JOINT_APPLICATION
          ? PAY_AND_SUBMIT
          : PAY_YOUR_FEE
      );
    });
  }
}
