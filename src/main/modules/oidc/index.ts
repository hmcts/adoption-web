import { Logger } from '@hmcts/nodejs-logging';
import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { getEndGlobalSessionUrl, getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { getCaseApi } from '../../app/case/CaseApi';
import { AppRequest } from '../../app/controller/AppRequest';
import {
  ACCESSIBILITY_STATEMENT,
  CALLBACK_URL,
  CONTACT_US,
  COOKIES_PAGE,
  CSRF_TOKEN_ERROR_URL,
  ELIGIBILITY_URL,
  LA_PORTAL,
  LA_PORTAL_KBA_CASE_REF,
  PRIVACY_POLICY,
  PageLink,
  SIGN_IN_URL,
  SIGN_OUT_URL,
  START_ELIGIBILITY_URL,
  TERMS_AND_CONDITIONS,
  TIMED_OUT_REDIRECT,
  TIMED_OUT_URL,
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

    //If updating this function also consider updating in the KbaMiddleware
    const destroySessionsAndRedirect = (req, res, next: NextFunction, redirectPage: PageLink) => {
      const serviceUrl = `${protocol}${res.locals.host}${port}`;
      const endGlobalSessionUrl = getEndGlobalSessionUrl(serviceUrl, redirectPage);

      req.session.destroy(err => {
        if (err) {
          logger.error('Error destroying local session', err);
          return next(err);
        }

        res.clearCookie('adoption-web-session');

        return res.redirect(endGlobalSessionUrl);
      });
    };

    app.get(SIGN_IN_URL, (req, res) => {
      res.redirect(getRedirectUrl(`${protocol}${res.locals.host}${port}`, CALLBACK_URL));
    });

    app.get(SIGN_OUT_URL, (req, res, next) => {
      destroySessionsAndRedirect(req, res, next, START_ELIGIBILITY_URL);
    });

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
            const lang = req.query.lang as string | undefined;
            logger.info('Citizen session has timed out. Lang = ', lang); // TODO remove
            return destroySessionsAndRedirect(req, res, next, `${TIMED_OUT_URL}?lang=${lang}`);
          } else {
            logger.info('LA session has timed out'); //TODO remove
            return destroySessionsAndRedirect(req, res, next, LA_PORTAL_KBA_CASE_REF);
          }
        }
        if (req.path.startsWith(TIMED_OUT_URL)) {
          return next();
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
            const userCaseDetails = await req.locals.api.getCaseDetails();
            if (userCaseDetails.userCase) {
              req.session.userCase = userCaseDetails.userCase;
              req.session.userCaseList = userCaseDetails.cases;
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
