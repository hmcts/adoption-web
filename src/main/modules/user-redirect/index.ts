import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Application, NextFunction, Response } from 'express';
import type { LoggerInstance } from 'winston';

import { AppRequest } from '../../app/controller/AppRequest';
import { ErrorController } from '../../steps/error/error.controller';
import {
  ACCESSIBILITY_STATEMENT,
  CALLBACK_URL,
  CONTACT_US,
  COOKIES_PAGE,
  CSRF_TOKEN_ERROR_URL,
  ELIGIBILITY_URL,
  HOME_URL,
  KEEP_ALIVE_URL,
  LA_DOCUMENT_MANAGER,
  LA_PORTAL,
  LA_PORTAL_ACCESSIBILITY_STATEMENT,
  LA_PORTAL_CONTACT_US,
  LA_PORTAL_COOKIES_PAGE,
  LA_PORTAL_KBA_CASE_REF,
  LA_PORTAL_NEG_SCENARIO,
  LA_PORTAL_PRIVACY_POLICY,
  LA_PORTAL_TERMS_AND_CONDITIONS,
  PRIVACY_POLICY,
  SAVE_AND_RELOGIN,
  SIGN_IN_URL,
  SIGN_OUT_URL,
  TERMS_AND_CONDITIONS,
  TEST_REQUEST,
  TIMED_OUT_REDIRECT,
  TIMED_OUT_URL,
} from '../../steps/urls';
import { UserRole } from 'app/case/definition';

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('app');

/**
 * Adds the state redirect middleware to redirect when application is in certain states
 */
export class UserRedirectMiddleware {
  PUBLIC_LINKS = [
    //HOME_URL, // Valid but prevents startsWith check
    ELIGIBILITY_URL,
    SIGN_IN_URL,
    LA_PORTAL_KBA_CASE_REF,
    LA_PORTAL_NEG_SCENARIO,
    CSRF_TOKEN_ERROR_URL,
    KEEP_ALIVE_URL,
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
  LA_URLS = [LA_PORTAL, LA_DOCUMENT_MANAGER];
  CITIZEN_AND_LA_URLS = [
    SAVE_AND_RELOGIN,
    CALLBACK_URL,
    SIGN_OUT_URL,
    TIMED_OUT_REDIRECT,
    TEST_REQUEST, // currently required for tests
  ];
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    dayjs.extend(customParseFormat);

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        //TODO remove logging
        logger.info(`UserRedirectMiddleware: Current path is ${req.path}`);
        logger.info(`UserRedirectMiddleware: User
          id ${req.session.user?.id}, 
          roles: ${req.session.user?.roles}, 
          isSystemUser: ${req.session.user?.isSystemUser}, 
          email: ${req.session.user?.email}`);
        logger.info(`UserRedirectMiddleware: Current case is ${req.session?.userCase?.id}`);

        const errorController = new ErrorController();

        // Citizen Users (all LA Portal links are notFound)
        if (req.session.user?.roles.includes(UserRole.CITIZEN)) {
          if (this.LA_URLS.some(item => req.path.startsWith(item))) {
            logger.warn(
              `Citizen user id ${req.session.user?.id} tried to access: ${req.path} (caseId ${req.session?.userCase?.id})`
            );
            return errorController.notFound(req, res);
          }
          return next();
        }

        // Public links
        if (req.path === HOME_URL || this.PUBLIC_LINKS.some(item => req.path.startsWith(item))) {
          return next();
        }

        // LA Users
        if (req.session.user?.isSystemUser) {
          if (
            this.LA_URLS.some(item => req.path.startsWith(item)) ||
            this.CITIZEN_AND_LA_URLS.some(item => req.path.startsWith(item))
          ) {
            return next();
          }
          logger.warn(
            `LA user id ${req.session.user?.id} tried to access: ${req.path} (caseId ${req.session?.userCase?.id})`
          );
          return errorController.notFound(req, res);
        }

        logger.warn(
          `Unauthorised user id ${req.session.user?.id} tried to access: ${req.path} (caseId ${req.session?.userCase?.id})`
        );
        return errorController.notFound(req, res);
      })
    );
  }
}
