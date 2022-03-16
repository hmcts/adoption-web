import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';
import { v4 as generateUuid } from 'uuid';

import { CITIZEN_SUBMIT, PaymentStatus, State } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { getFee } from '../../../../app/fee/fee-lookup-api';
import { PaymentClient } from '../../../../app/payment/PaymentClient';
import { PaymentModel } from '../../../../app/payment/PaymentModel';
import { APPLICATION_SUBMITTED, PAYMENT_CALLBACK_URL } from '../../../urls';

const logger = Logger.getLogger('PayYourFeeGetController');

@autobind
export default class PayYourFeeGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.userCase.applicationFeeOrderSummary?.PaymentTotal) {
      const fee = await getFee(req.locals.logger);

      if (fee) {
        const total = fee.FeeAmount;
        req.session.userCase = await this.save(
          req,
          {
            applicationFeeOrderSummary: {
              PaymentReference: '',
              Fees: [{ id: generateUuid(), value: { ...fee } }],
              PaymentTotal: `${total}`,
            },
          },
          this.getEventName(req)
        );

        req.session.save(err => {
          if (err) {
            logger.error('Error occured while fetcing the fee from fee-register API');
            throw err;
          }
        });
        return;
      } else {
        logger.error('Unable to get fee from fee-register API');
        throw new Error('Unable to get fee from fee-register API');
      }
    }

    const applicationFeeOrderSummary = req.session.userCase.applicationFeeOrderSummary;
    const fee = applicationFeeOrderSummary?.Fees[0]?.value;

    if (req.session.userCase.state !== State.AwaitingPayment) {
      logger.info(`${req.session.userCase.state} state and triggering CITIZEN_SUBMIT event.`);
      req.session.userCase = await req.locals.api.triggerEvent(req.session.userCase.id, {}, CITIZEN_SUBMIT);
    }

    const payments = new PaymentModel(req.session.userCase?.payments);
    if (payments.isPaymentInProgress()) {
      logger.info('payment is in progress and redirecting to PAYMENT_CALLBACK_URL url.');
      const callback = () => res.redirect(PAYMENT_CALLBACK_URL);
      return super.saveSessionAndRedirect(req, res, callback);
    }

    if (payments.paymentTotal === +applicationFeeOrderSummary.PaymentTotal) {
      logger.info(
        'payments.paymentTotal equals to applicationFeeOrderSummary.PaymentTotal and redirecting to APPLICATION_SUBMITTED url.'
      );
      const callback = () => res.redirect(APPLICATION_SUBMITTED);
      return super.saveSessionAndRedirect(req, res, callback);
    }

    const client = this.getPaymentClient(req, res);
    logger.info('calling PAYMENT_CALLBACK_URL');
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

    logger.info('calling req.locals.api.addPayment API');
    req.session.userCase = await req.locals.api.addPayment(req.session.userCase?.id, payments.list);

    const callback = () => res.redirect(payment._links.next_url.href);
    logger.info('Redirecting to payment._links.next_url.href');
    super.saveSessionAndRedirect(req, res, callback);
  }

  private getPaymentClient(req: AppRequest, res: Response) {
    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    return new PaymentClient(req.session, returnUrl);
  }
}
