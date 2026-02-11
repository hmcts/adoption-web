import { Logger } from '@hmcts/nodejs-logging';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Application, NextFunction, Response } from 'express';

import { UserRole } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { UserPathError } from '../../steps/error/error.controller';
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

const logger = Logger.getLogger('user-redirect');

/**
 * Adds the user redirect middleware to limit access to certain URLs by user type.
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
        if (req.path.startsWith(LA_PORTAL_KBA_CASE_REF) && this.isCitizenOrLAUser(req)) {
          return res.redirect(HOME_URL);
        }

        if (this.isPublicLink(req)) {
          return next();
        }

        if (this.isCitizen(req)) {
          this.throwIfInvalidUrlForCitizenUser(req, this.buildErrMsg(req, 'Citizen'));
          return next();
        }

        if (this.isLAUser(req)) {
          this.throwIfInvalidUrlForLaUser(req, this.buildErrMsg(req, 'LA'));
          return next();
        }

        const errMsg = this.buildErrMsg(req, 'Unauthorised');
        logger.error(errMsg);
        throw new UserPathError(errMsg);
      })
    );
  }

  private isCitizen(req: AppRequest): boolean {
    return Array.isArray(req.session.user?.roles) && req.session.user.roles.includes(UserRole.CITIZEN);
  }

  private isLAUser(req: AppRequest): boolean {
    return !!req.session.user?.isSystemUser;
  }

  private isCitizenOrLAUser(req: AppRequest): boolean {
    return this.isCitizen(req) || this.isLAUser(req);
  }

  private isPublicLink(req: AppRequest): boolean {
    return req.path === HOME_URL || this.PUBLIC_LINKS.some(item => req.path.startsWith(item));
  }

  private throwIfInvalidUrlForCitizenUser(req: AppRequest, errMsg: string): void {
    if (this.LA_URLS.some(item => req.path.startsWith(item))) {
      logger.error(errMsg);
      throw new UserPathError(errMsg);
    }
  }

  private throwIfInvalidUrlForLaUser(req: AppRequest, errMsg: string): void {
    if (
      false === this.LA_URLS.some(item => req.path.startsWith(item)) &&
      false === this.CITIZEN_AND_LA_URLS.some(item => req.path.startsWith(item))
    ) {
      logger.error(errMsg);
      throw new UserPathError(errMsg);
    }
  }

  private buildErrMsg(req: AppRequest, prefix: string): string {
    return `${prefix} user id ${req.session.user?.id} tried to access ${req.path} (caseId ${req.session?.userCase?.id})`;
  }
}
