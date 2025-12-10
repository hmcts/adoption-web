import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Application, NextFunction, Response } from 'express';
import type { LoggerInstance } from 'winston';

import { ApplyingWith, SectionStatus, State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { getApplicationStatus } from '../../steps/application/task-list/utils';
import {
  ACCESSIBILITY_STATEMENT,
  APPLICANT_2,
  APPLICATION_SUBMITTED,
  APPLYING_WITH_URL,
  CALLBACK_URL,
  CHECK_ANSWERS_URL,
  CONTACT_US,
  COOKIES_PAGE,
  CSRF_TOKEN_ERROR_URL,
  DOWNLOAD_APPLICATION_SUMMARY,
  ELIGIBILITY_URL,
  HOME_URL,
  KEEP_ALIVE_URL,
  LA_DOCUMENT_MANAGER,
  LA_PORTAL,
  LA_PORTAL_ACCESSIBILITY_STATEMENT,
  LA_PORTAL_CONFIRMATION_PAGE,
  LA_PORTAL_CONTACT_US,
  LA_PORTAL_COOKIES_PAGE,
  LA_PORTAL_PRIVACY_POLICY,
  LA_PORTAL_TERMS_AND_CONDITIONS,
  NEW_APPLICATION_REDIRECT,
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PRIVACY_POLICY,
  PageLink,
  SAVE_AND_RELOGIN,
  SIGN_IN_URL,
  SIGN_OUT_URL,
  TASK_LIST_URL,
  TERMS_AND_CONDITIONS,
  TEST_REQUEST,
  TIMED_OUT_REDIRECT,
  TIMED_OUT_URL,
} from '../../steps/urls';

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('app');

/**
 * Adds the state redirect middleware to redirect when application is in certain states
 */
export class StateRedirectMiddleware {
  PUBLIC_LINKS = [
    ELIGIBILITY_URL,
    TIMED_OUT_URL,
    COOKIES_PAGE,
    PRIVACY_POLICY,
    ACCESSIBILITY_STATEMENT,
    TERMS_AND_CONDITIONS,
    CONTACT_US,
    LA_PORTAL_COOKIES_PAGE,
    LA_PORTAL_PRIVACY_POLICY,
    LA_PORTAL_ACCESSIBILITY_STATEMENT,
    LA_PORTAL_TERMS_AND_CONDITIONS,
    LA_PORTAL_CONTACT_US,
  ];
  CITIZEN_SUBMITTED_CASE_URLS = [
    APPLICATION_SUBMITTED,
    LA_PORTAL,
    LA_DOCUMENT_MANAGER,
    APPLYING_WITH_URL,
    DOWNLOAD_APPLICATION_SUMMARY,
    NEW_APPLICATION_REDIRECT,
    SAVE_AND_RELOGIN,
    //HOME_URL, // Valid but prevents startsWith check
    CALLBACK_URL,
    CSRF_TOKEN_ERROR_URL,
    KEEP_ALIVE_URL,
    SIGN_IN_URL,
    SIGN_OUT_URL,
    TIMED_OUT_REDIRECT,
    TEST_REQUEST, // currently required for tests
  ];
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    dayjs.extend(customParseFormat);

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        logger.info(`StateRedirectMiddleware: Current path is ${req.path}`);
        logger.info(`StateRedirectMiddleware: Current state is ${req.session?.userCase?.state}`);

        if (req.session?.userCase?.applyingWith === ApplyingWith.ALONE && req.path.startsWith(APPLICANT_2)) {
          return res.redirect(TASK_LIST_URL);
        }

        if (this.PUBLIC_LINKS.some(item => req.path.startsWith(item))) {
          //Footer links are accessible from anywhere in the application
          return next();
        }
        if (
          req.path.startsWith(LA_PORTAL) &&
          req.path !== LA_PORTAL_CONFIRMATION_PAGE &&
          [State.LaSubmitted].includes(req.session?.userCase?.state)
        ) {
          logger.warn(
            `user id ${req.session.user?.id} tried to access ${req.path} \
             after caseId ${req.session?.userCase?.id} LA Submitted`
          );
          return res.redirect(LA_PORTAL_CONFIRMATION_PAGE);
        }

        const result = this.CITIZEN_SUBMITTED_CASE_URLS.some(item => req.path.startsWith(item));
        logger.info(`StateRedirectMiddleware: Path included in URLS? ${result}`);
        if (
          [State.Submitted, State.LaSubmitted].includes(req.session?.userCase?.state) &&
          req.path !== HOME_URL &&
          false === this.CITIZEN_SUBMITTED_CASE_URLS.some(item => req.path.startsWith(item))
        ) {
          logger.warn(
            `user id ${req.session.user?.id} tried to access ${req.path} \
             but caseId ${req.session?.userCase?.id} in state ${req.session?.userCase?.state}`
          );
          return res.redirect(HOME_URL);
        }

        if (
          req.path.startsWith(CHECK_ANSWERS_URL) &&
          getApplicationStatus(req.session.userCase) === SectionStatus.CAN_NOT_START_YET
        ) {
          // can not go to check-your-answers page before completing all the sections
          return res.redirect(TASK_LIST_URL);
        }
        if (
          req.session?.userCase?.state !== State.AwaitingPayment ||
          [PAY_YOUR_FEE, PAY_AND_SUBMIT, PAYMENT_CALLBACK_URL].includes(req.path as PageLink)
        ) {
          return next();
        }

        return next();
      })
    );
  }
}
