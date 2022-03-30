import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Application, NextFunction, Response } from 'express';

import { ApplyingWith, SectionStatus, State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { getApplicationStatus } from '../../steps/task-list/utils';
import {
  ACCESSIBILITY_STATEMENT,
  APPLICANT_2,
  APPLICATION_SUBMITTED,
  CHECK_ANSWERS_URL,
  CONTACT_US,
  COOKIES_PAGE,
  DOWNLOAD_APPLICATION_SUMMARY,
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PRIVACY_POLICY,
  PageLink,
  TASK_LIST_URL,
  TERMS_AND_CONDITIONS,
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
        if (req.session.userCase?.applyingWith === ApplyingWith.ALONE && req.path.startsWith(APPLICANT_2)) {
          return res.redirect(TASK_LIST_URL);
        }

        if (
          req.path.startsWith(CHECK_ANSWERS_URL) &&
          getApplicationStatus(req.session.userCase) === SectionStatus.CAN_NOT_START_YET
        ) {
          // can not go to check-your-answers page before completing all the sections
          return res.redirect(TASK_LIST_URL);
        }
        const FOOTER_LINKS = [COOKIES_PAGE, PRIVACY_POLICY, ACCESSIBILITY_STATEMENT, TERMS_AND_CONDITIONS, CONTACT_US];
        if (FOOTER_LINKS.find(item => req.path.startsWith(item))) {
          //Footer links are accessible from anywhere in the application
          return next();
        }
        if (
          [State.Submitted, State.AwaitingDocuments, State.AwaitingHWFDecision].includes(req.session.userCase?.state) &&
          req.path !== APPLICATION_SUBMITTED &&
          req.path !== DOWNLOAD_APPLICATION_SUMMARY
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
