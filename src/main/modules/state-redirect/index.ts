import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Application, NextFunction, Response } from 'express';

import { CaseWithId } from '../../app/case/case';
import { State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { PaymentModel } from '../../app/payment/PaymentModel';
import {
  APPLICATION_SUBMITTED,
  NO_RESPONSE_YET,
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PageLink,
  SWITCH_TO_SOLE_APPLICATION,
} from '../../steps/urls';

/**
 * Adds the state redirect middleware to redirect when application is in certain states
 */
export class StateRedirectMiddleware {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    dayjs.extend(customParseFormat);

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if (
          this.hasPartnerNotResponded(req.session.userCase) &&
          ![NO_RESPONSE_YET, SWITCH_TO_SOLE_APPLICATION].includes(req.path as PageLink)
        ) {
          return res.redirect(NO_RESPONSE_YET);
        }

        if (
          [State.Submitted, State.AwaitingDocuments, State.AwaitingHWFDecision].includes(req.session.userCase?.state) &&
          req.path !== APPLICATION_SUBMITTED
        ) {
          return res.redirect(APPLICATION_SUBMITTED);
        }

        if (
          req.session.userCase?.state !== State.AwaitingPayment ||
          [PAY_YOUR_FEE, PAY_AND_SUBMIT, PAYMENT_CALLBACK_URL].includes(req.path as PageLink)
        ) {
          return next();
        }

        const payments = new PaymentModel(req.session.userCase.payments);
        if (payments.hasPayment) {
          return res.redirect(PAYMENT_CALLBACK_URL);
        }

        return next();
      })
    );
  }

  private hasPartnerNotResponded(userCase: CaseWithId) {
    return (
      userCase?.state === State.AwaitingApplicant2Response && dayjs(userCase.dueDate, 'D MMMM YYYY').diff(dayjs()) < 0
    );
  }
}
