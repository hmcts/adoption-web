import { Logger } from '@hmcts/nodejs-logging';
import config from 'config';
import { Response } from 'express';

import { State } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { PaymentClient } from '../../../../app/payment/PaymentClient';
import { PaymentModel } from '../../../../app/payment/PaymentModel';
import { APPLICATION_SUBMITTED, CHECK_ANSWERS_URL, PAYMENT_CALLBACK_URL, STATEMENT_OF_TRUTH } from '../../../urls';
const logger = Logger.getLogger('payment-callback');

export default class PaymentCallbackGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.AwaitingPayment) {
      return res.redirect(CHECK_ANSWERS_URL);
    }

    const caseId = req.session.userCase.id;
    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    const paymentClient = new PaymentClient(req.session, returnUrl);
    const payments = new PaymentModel(req.session.userCase.payments);

    logger.info(`caseId=${caseId} hasPayment=${payments.hasPayment}`);
    if (!payments.hasPayment) {
      return res.redirect(CHECK_ANSWERS_URL);
    }

    const lastPaymentAttempt = payments.lastPayment;
    const payment = await paymentClient.get(lastPaymentAttempt.reference);

    logger.info(`caseId=${caseId} lastPaymentStatus=${payment?.status}`);
    if (payment?.status === 'Initiated') {
      return res.redirect(lastPaymentAttempt.channel);
    }

    logger.info(`caseId=${caseId} lastPaymentTransactionId=${lastPaymentAttempt.transactionId}`);
    payments.setStatus(lastPaymentAttempt.transactionId, payment?.status, payment?.channel);

    req.session.userCase = await req.locals.api.addPayment(req.session.userCase.id, payments.list);

    req.session.save(() => {
      logger.info(`caseId=${caseId} wasLastPaymentSuccessful=${payments.wasLastPaymentSuccessful}`);
      if (payments.wasLastPaymentSuccessful) {
        return res.redirect(APPLICATION_SUBMITTED);
      }

      res.redirect(req.query.back ? CHECK_ANSWERS_URL : STATEMENT_OF_TRUTH);
    });
  }
}
