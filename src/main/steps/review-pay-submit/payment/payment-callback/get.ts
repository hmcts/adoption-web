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
  public async get(req: AppRequest, res: Response): Promise<void> {
    const payments = new PaymentModel(req.session.userCase.payments);
    if (req.session.userCase.state === State.Draft && payments.hasSuccessfulPayment) {
      req.session.userCase = await req.locals.api.triggerEvent(req.session.userCase.id, {}, CITIZEN_SUBMIT);
    }
    if (req.session.userCase.state === State.Submitted || req.session.userCase.state === State.LaSubmitted) {
      return res.redirect(APPLICATION_SUBMITTED);
    } else if (req.session.userCase.state !== State.AwaitingPayment) {
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

    let hasInitiatedOrUndefinedPayment = false;

    for (let i = payments.list.length - 1; i >= 0; i--) {
      const element = payments.list[i];

      try {
        const payment = await paymentClient.getCompletedPayment(element.value.reference, caseId);

        logger.info(`caseId=${caseId} lastPaymentStatus=${payment?.status} lastPaymentTransactionId=${element.id}`);

        payments.setStatus(element.id, payment?.status, payment?.channel);

        if (payment?.status === 'Success') {
          break;
        }
      } catch (e) {
        logger.error(`caseId=${caseId} Unable to fetch final payment status for reference ${element.value.reference}. Checking for other payments.`, e);
        hasInitiatedOrUndefinedPayment = true;
      }
      
    }

    req.session.userCase = await req.locals.api.addPayment(req.session.userCase.id, payments.list);

    req.session.save(() => {
      logger.info(`caseId=${caseId} hasSuccessfulPayment=${payments.hasSuccessfulPayment}`);

      if (payments.hasSuccessfulPayment) {
        return res.redirect(APPLICATION_SUBMITTED);
      }

      if (hasInitiatedOrUndefinedPayment) {
        // TODO Hand control back to the user
        // throwing should redirect to the INTERNAL_SERVER_ERROR error page?
        throw new Error(`caseId=${caseId} Unable to fetch final payment status of payment. Please try again later.`);
      }

      res.redirect(req.query.back ? CHECK_ANSWERS_URL : STATEMENT_OF_TRUTH);
    });
  }
}
