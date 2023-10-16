import { Logger } from '@hmcts/nodejs-logging';
import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { getCaseApi } from '../../app/case/CaseApi';
import { AppRequest } from '../../app/controller/AppRequest';
import {
  ACCESSIBILITY_STATEMENT,
  CALLBACK_URL,
  CONTACT_US,
  COOKIES_PAGE,
  CSRF_TOKEN_ERROR_URL,
  ELIGIBILITY_URL,
  HOME_URL,
  LA_PORTAL,
  LA_PORTAL_KBA_CASE_REF,
  PRIVACY_POLICY,
  PageLink,
  SIGN_IN_URL,
  SIGN_OUT_URL,
  TERMS_AND_CONDITIONS,
  TIMED_OUT_REDIRECT,
} from '../../steps/urls';

/**
 * Adds the oidc middleware to add oauth authentication
 */
export class OidcMiddleware {
  public enableFor(app: Application): void {
    const protocol = app.locals.developmentMode ? 'http://' : 'https://';
    const port = app.locals.developmentMode ? `:${config.get('port')}` : '';
    const { errorHandler } = app.locals;
    const logger = Logger.getLogger('index-oidc');
    app.get(SIGN_IN_URL, (req, res) => {
      res.redirect(getRedirectUrl(`${protocol}${res.locals.host}${port}`, CALLBACK_URL));
    });

    app.get(SIGN_OUT_URL, (req, res) => req.session.destroy(() => res.redirect(HOME_URL)));

    app.get(
      CALLBACK_URL,
      errorHandler(async (req, res) => {
        if (typeof req.query.code === 'string') {
          req.session.user = await getUserDetails(`${protocol}${res.locals.host}${port}`, req.query.code, CALLBACK_URL);
          const role: string = config.get('services.idam.userRole');
          logger.info('Roles are ---', req.session.user.roles);
          logger.info('Demo User Roles are ---', role);
          if (req.session.user.roles.includes(role)) {
            return req.session.save(() => res.redirect('/'));
          } else {
            req.session.user = undefined;
            throw new Error('Unauthorized role of the user');
          }
        }
        res.redirect(SIGN_IN_URL);
      })
    );

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if (req.session?.user) {
          // a nunjucks global variable 'isLoggedIn' has been created for the views
          // it is assigned the value of res.locals.isLoggedIn
          res.locals.isLoggedIn = true;
        }

        if (req.path.startsWith(ELIGIBILITY_URL)) {
          return next();
        }

        if (req.path.startsWith(CSRF_TOKEN_ERROR_URL)) {
          if (!req.query.isLaPortal) {
            return res.redirect(SIGN_IN_URL);
          } else {
            return res.redirect(LA_PORTAL_KBA_CASE_REF);
          }
        }

        if (req.path.startsWith(TIMED_OUT_REDIRECT)) {
          if (!req.session.laPortalKba) {
            return req.session.destroy(() => res.redirect(SIGN_IN_URL));
          } else {
            return req.session.destroy(() => res.redirect(LA_PORTAL_KBA_CASE_REF));
          }
        }

        if (
          [ACCESSIBILITY_STATEMENT, PRIVACY_POLICY, TERMS_AND_CONDITIONS, COOKIES_PAGE, CONTACT_US].includes(
            req.path as PageLink
          )
        ) {
          return next();
        }

        if (req.path.startsWith(LA_PORTAL)) {
          req.session.isEligibility = false;
          return next();
        }

        if (req.session?.user) {
          req.locals.api = getCaseApi(req.session.user, req.locals.logger);
          if (!req.session.userCase) {
            const userCase = await req.locals.api.getCase();
            if (userCase) {
              req.session.userCase = userCase;
            }
          }
          // Commented out restricting case creation to happen only from Applying-With page submission
          /* if (!req.session.userCase) {
            req.session.userCase = await req.locals.api.createCase(res.locals.serviceType, req.session.user);
          } */
          return next();
        }
        res.redirect(SIGN_IN_URL);
      })
    );
  }
}
