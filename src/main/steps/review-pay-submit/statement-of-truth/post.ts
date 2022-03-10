import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';
import { v4 as generateUuid } from 'uuid';

import { ApplyingWith, CITIZEN_SUBMIT, PaymentStatus, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { getFee } from '../../../app/fee/fee-lookup-api';
import { Form } from '../../../app/form/Form';
import { PaymentClient } from '../../../app/payment/PaymentClient';
import { PaymentModel } from '../../../app/payment/PaymentModel';
import { APPLICATION_SUBMITTED, PAYMENT_CALLBACK_URL } from '../../urls';

@autobind
export default class StatementOfTruthPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

    this.filterErrorsForSaveAsDraft(req);

    if (req.session.errors.length > 0) {
      this.redirect(req, res);
      return;
    }

    const applicant1IBelieveApplicationIsTrue = req.session.userCase.applicant1IBelieveApplicationIsTrue;
    const applicant1SotFullName = req.session.userCase.applicant1SotFullName;

    if (req.session.userCase.applyingWith === ApplyingWith.ALONE) {
      req.session.userCase = await this.save(
        req,
        {
          applicant1IBelieveApplicationIsTrue,
          applicant1SotFullName,
        },
        this.getEventName(req)
      );
    } else {
      const applicant2IBelieveApplicationIsTrue = req.session.userCase.applicant2IBelieveApplicationIsTrue;
      const applicant2SotFullName = req.session.userCase.applicant2SotFullName;

      req.session.userCase = await this.save(
        req,
        {
          applicant1IBelieveApplicationIsTrue,
          applicant1SotFullName,
          applicant2IBelieveApplicationIsTrue,
          applicant2SotFullName,
        },
        this.getEventName(req)
      );
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    await this.fetchFee(req);
    const applicationFeeOrderSummary = req.session.userCase.applicationFeeOrderSummary; //{PaymentReference: {}, Fees:{},PaymentTotal: {}};
    console.log(' 31: ' + applicationFeeOrderSummary);
    const fee = applicationFeeOrderSummary?.Fees[0]?.value;
    console.log(' 33: ' + fee);

    if (!fee) {
      console.log(' 36: ' + fee);
      req.session.errors.push({ errorType: 'errorRetrievingFee', propertyName: 'paymentType' });
      this.redirect(req, res, req.url);
      return;
    }

    console.log('req.session.userCase.state', req.session.userCase.state);
    if (req.session.userCase.state !== State.AwaitingPayment) {
      req.session.userCase = await req.locals.api.triggerEvent(req.session.userCase.id, {}, CITIZEN_SUBMIT);
      console.log('req.session.userCase.state after', req.session.userCase.state);
    }

    const payments = new PaymentModel(req.session.userCase.payments);
    if (payments.isPaymentInProgress()) {
      return this.redirect(req, res, PAYMENT_CALLBACK_URL);
    }

    console.log('payments.paymentTotal', payments.paymentTotal);
    if (payments.paymentTotal === +applicationFeeOrderSummary.PaymentTotal) {
      //user has already made a payment
      //TODO reditect to application submitted screen in future
      return this.redirect(req, res, APPLICATION_SUBMITTED);
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

    this.redirect(req, res, payment._links.next_url.href);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  private getPaymentClient(req: AppRequest, res: Response) {
    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    return new PaymentClient(req.session, returnUrl);
  }

  public async fetchFee(req: AppRequest): Promise<void> {
    if (!req.session.userCase.applicationFeeOrderSummary?.PaymentTotal) {
      const fee = await getFee(req.locals.logger);
      console.log(' 96: ' + fee);

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
            throw err;
          }
          //super.get(req, res);
        });
        return;
      } else {
        throw new Error('Unable to get fee from fee-register API');
      }
    }

    //super.get(req, res);
  }
}
