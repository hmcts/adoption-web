import { Logger } from '@hmcts/nodejs-logging';
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
  PRIVACY_POLICY,
  SAVE_AND_RELOGIN,
  SIGN_IN_URL,
  SIGN_OUT_URL,
  TASK_LIST_URL,
  TERMS_AND_CONDITIONS,
  TEST_REQUEST,
  TIMED_OUT_REDIRECT,
  TIMED_OUT_URL,
} from '../../steps/urls';

const logger = Logger.getLogger('state-redirect');

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

        if (this.isPublicLink(req)) {
          return next();
        }

        if (this.isInvalidUrlForLaSubmittedCase(req)) {
          logger.error(
            `User id ${req.session.user?.id} tried to access ${req.path} \
             after caseId ${req.session?.userCase?.id} LA Submitted`
          );
          return res.redirect(LA_PORTAL_CONFIRMATION_PAGE);
        }

        if (this.isInvalidUrlAfterCitizenSubmit(req)) {
          logger.error(
            `User id ${req.session.user?.id} tried to access ${req.path} \
             but caseId ${req.session?.userCase?.id} in state ${req.session?.userCase?.state}`
          );
          return res.redirect(HOME_URL);
        }

        if (this.isInvalidUrlForSingleApplicant(req)) {
          return res.redirect(TASK_LIST_URL);
        }

        if (this.isTryingToCheckAnswersBeforeAllSectionsComplete(req)) {
          return res.redirect(TASK_LIST_URL);
        }

        return next();
      })
    );
  }

  private isPublicLink(req: AppRequest): boolean {
    return this.PUBLIC_LINKS.some(item => req.path.startsWith(item));
  }

  private isInvalidUrlForLaSubmittedCase(req: AppRequest): boolean {
    return (
      req.path.startsWith(LA_PORTAL) &&
      req.path !== LA_PORTAL_CONFIRMATION_PAGE &&
      [State.LaSubmitted].includes(req.session?.userCase?.state)
    );
  }

  private isInvalidUrlAfterCitizenSubmit(req: AppRequest): boolean {
    return (
      [State.Submitted, State.LaSubmitted].includes(req.session?.userCase?.state) &&
      req.path !== HOME_URL &&
      false === this.CITIZEN_SUBMITTED_CASE_URLS.some(item => req.path.startsWith(item))
    );
  }

  private isInvalidUrlForSingleApplicant(req: AppRequest): boolean {
    return req.session?.userCase?.applyingWith === ApplyingWith.ALONE && req.path.startsWith(APPLICANT_2);
  }

  private isTryingToCheckAnswersBeforeAllSectionsComplete(req: AppRequest): boolean {
    return (
      req.path.startsWith(CHECK_ANSWERS_URL) &&
      getApplicationStatus(req.session.userCase) === SectionStatus.CAN_NOT_START_YET
    );
  }
}
