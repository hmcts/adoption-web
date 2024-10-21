import { Logger } from '@hmcts/nodejs-logging';
import config from 'config';
import { Response } from 'express';

import { CITIZEN_SUBMIT, State } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { PaymentClient } from '../../../../app/payment/PaymentClient';
import { PaymentModel } from '../../../../app/payment/PaymentModel';
import { APPLICATION_SUBMITTED, CHECK_ANSWERS_URL, PAYMENT_CALLBACK_URL, STATEMENT_OF_TRUTH } from '../../../urls';
const logger = Logger.getLogger('payment-callback');

export default class PaymentCallbackGetController {
  exceptionCauser(enterZero: number): number {
    logger.info('Causing Exception');
    return 12 / enterZero;
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const payments = new PaymentModel(req.session.userCase.payments);
    if (req.session.userCase.state === State.Draft && payments.wasLastPaymentSuccessful) {
      req.session.userCase = await req.locals.api.triggerEvent(req.session.userCase.id, {}, CITIZEN_SUBMIT);
    }
    if (req.session.userCase.state !== State.AwaitingPayment) {
      return res.redirect(CHECK_ANSWERS_URL);
    }

    const caseId = req.session.userCase.id;
    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    const paymentClient = new PaymentClient(req.session, returnUrl);

    logger.info(`caseId=${caseId} hasPayment=${payments.hasPayment}`);
    if (!payments.hasPayment) {
      return res.redirect(CHECK_ANSWERS_URL);
    }

    if (req.session.userCase.applicant1FirstNames === 'Error') {
      const impossibleResult = this.exceptionCauser(0);
      logger.info('This should not be logged: ' + impossibleResult);
    }

    //const lastPaymentAttempt = payments.lastPayment; //TODO remove

    for await (const element of payments.list.reverse()) {
      const payment = await paymentClient.get(element.value.reference);

      logger.info(`caseId=${caseId} lastPaymentStatus=${payment?.status}`);
      /* if (payment?.status === 'Initiated') {
        return res.redirect(lastPaymentAttempt.channel);
      } */
      logger.info(`caseId=${caseId} lastPaymentTransactionId=${element.id}`);

      payments.setStatus(element.id, payment?.status, payment?.channel);

      //TODO? payments.get(element.id).status === PaymentStatus.SUCCESS (add helper method to payment model)
      if (payment?.status === 'Success') {
        break;
      }
    } // TODO error handling.....?

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
