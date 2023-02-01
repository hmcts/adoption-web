import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Application, NextFunction, Response } from 'express';

import { ApplyingWith, SectionStatus, State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { getApplicationStatus } from '../../steps/application/task-list/utils';
import {
  ACCESSIBILITY_STATEMENT,
  APPLICANT_2,
  APPLICATION_SUBMITTED,
  CHECK_ANSWERS_URL,
  CONTACT_US,
  COOKIES_PAGE,
  DOWNLOAD_APPLICATION_SUMMARY,
  LA_DOCUMENT_MANAGER,
  LA_PORTAL,
  LA_PORTAL_CONFIRMATION_PAGE,
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PRIVACY_POLICY,
  PageLink,
  TASK_LIST_URL,
  TERMS_AND_CONDITIONS,
  TIMED_OUT_URL,
} from '../../steps/urls';

/**
 * Adds the state redirect middleware to redirect when application is in certain states
 */
export class StateRedirectMiddleware {
  FOOTER_LINKS = [
    COOKIES_PAGE,
    PRIVACY_POLICY,
    ACCESSIBILITY_STATEMENT,
    TERMS_AND_CONDITIONS,
    CONTACT_US,
    TIMED_OUT_URL,
  ];
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    dayjs.extend(customParseFormat);

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if (req.session.userCase?.applyingWith === ApplyingWith.ALONE && req.path.startsWith(APPLICANT_2)) {
          return res.redirect(TASK_LIST_URL);
        }

        if (
          req.path.startsWith(LA_PORTAL) &&
          req.path !== LA_PORTAL_CONFIRMATION_PAGE &&
          [State.LaSubmitted].includes(req.session.userCase?.state)
        ) {
          return res.redirect(LA_PORTAL_CONFIRMATION_PAGE);
        }

        if (
          req.path.startsWith(CHECK_ANSWERS_URL) &&
          getApplicationStatus(req.session.userCase) === SectionStatus.CAN_NOT_START_YET
        ) {
          // can not go to check-your-answers page before completing all the sections
          return res.redirect(TASK_LIST_URL);
        }
        if (this.FOOTER_LINKS.find(item => req.path.startsWith(item))) {
          //Footer links are accessible from anywhere in the application
          return next();
        }
        if (
          [State.Submitted, State.AwaitingDocuments, State.AwaitingHWFDecision, State.LaSubmitted].includes(
            req.session.userCase?.state
          ) &&
          req.path !== APPLICATION_SUBMITTED &&
          req.path !== DOWNLOAD_APPLICATION_SUMMARY &&
          !req.path.startsWith(LA_DOCUMENT_MANAGER) &&
          !req.path.startsWith(LA_PORTAL)
        ) {
          return res.redirect(APPLICATION_SUBMITTED);
        }

        if (
          req.session.userCase?.state !== State.AwaitingPayment ||
          [PAY_YOUR_FEE, PAY_AND_SUBMIT, PAYMENT_CALLBACK_URL].includes(req.path as PageLink)
        ) {
          return next();
        }

        return next();
      })
    );
  }
}
