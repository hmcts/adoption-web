import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { Logger } from '../../../test/unit/mocks/hmcts/nodejs-logging';
import { getEndGlobalSessionUrl, getSystemUser } from '../../app/auth/user/oidc';
import { getCaseApi } from '../../app/case/CaseApi';
import { getFormattedDateInSingleDigits } from '../../app/case/answers/formatDate';
import { AppRequest } from '../../app/controller/AppRequest';
import { getDraftCaseFromStore } from '../../modules/draft-store/draft-store-service';
import {
  LA_PORTAL,
  LA_PORTAL_KBA_CALLBACK,
  LA_PORTAL_KBA_CASE_REF,
  LA_PORTAL_NEG_SCENARIO,
  LA_PORTAL_SIGN_OUT_URL,
  LA_PORTAL_START_PAGE,
  PageLink,
} from '../../steps/urls';

/**
 * Adds the KBA middleware for knowledge based authentication
 */
export class KbaMiddleware {
  public enableFor(app: Application): void {
    const protocol = app.locals.developmentMode ? 'http://' : 'https://';
    const port = app.locals.developmentMode ? `:${config.get('port')}` : '';
    const { errorHandler } = app.locals;
    const logger = Logger.getLogger('index-kba');

    //If updating this function also consider updating in the OidcMiddleware
    const destroySessionsAndRedirect = (req, res, next: NextFunction, redirectPage: PageLink) => {
      const serviceUrl = `${protocol}${res.locals.host}${port}`;
      const endGlobalSessionUrl = getEndGlobalSessionUrl(serviceUrl, redirectPage);

      req.session.destroy(err => {
        if (err) {
          logger.error('Error destroying local LA session', err);
          return next(err);
        }

        res.clearCookie('adoption-web-session');

        return res.redirect(endGlobalSessionUrl);
      });
    };

    app.get(
      LA_PORTAL_KBA_CALLBACK,
      errorHandler(async (req: AppRequest, res) => {
        const langCode = req.query.lang !== undefined ? req.query.lang : '';
        let param = '';
        const supportedLang = ['en', 'cy'];
        if (langCode !== null && supportedLang.includes(langCode as string)) {
          param = '?lang=' + supportedLang.find(item => item === langCode);
        }
        if (req.session.laPortalKba?.kbaCaseRef) {
          req.session.user = await getSystemUser();
          req.session.user.isSystemUser = true;
          req.session.save(() => res.redirect(LA_PORTAL_START_PAGE + param));
        } else {
          res.redirect(LA_PORTAL_KBA_CASE_REF + param);
        }
      })
    );

    app.get(LA_PORTAL_SIGN_OUT_URL, (req, res, next) =>
      destroySessionsAndRedirect(req, res, next, LA_PORTAL_KBA_CASE_REF)
    );

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        const param = req.query.lang !== undefined ? '?lang=' + req.query.lang : '';
        if (!req.path.startsWith(LA_PORTAL)) {
          return next();
        }
        res.locals.laPortal = true;
        if (req.session?.user) {
          res.locals.isLoggedIn = true;
          req.locals.api = getCaseApi(req.session.user, req.locals.logger);
          if (!req.session.userCase) {
            try {
              req.session.userCase = await req.locals.api.getCaseById(req.session.laPortalKba?.kbaCaseRef ?? '');
              const draftStoreUserCaseData = await getDraftCaseFromStore(
                req,
                req.session.laPortalKba?.kbaCaseRef || ''
              );
              if (draftStoreUserCaseData) {
                req.session.userCase = { ...(req.session.userCase || {}), ...draftStoreUserCaseData };
              }

              const childDOBEnteredByLA = getFormattedDateInSingleDigits(
                req.session.laPortalKba['kbaChildrenDateOfBirth']
              );
              const childDOBEnteredByApplicant = getFormattedDateInSingleDigits(
                req.session.userCase.childrenDateOfBirth
              );
              if (
                childDOBEnteredByApplicant !== childDOBEnteredByLA ||
                req.session.laPortalKba['kbaChildName']?.trim() !==
                  req.session.userCase.childrenFirstName?.replace(/\s{2,}/g, ' ').trim() +
                    ' ' +
                    req.session.userCase.childrenLastName?.replace(/\s{2,}/g, ' ').trim()
              ) {
                return destroySessionsAndRedirect(req, res, next, `${LA_PORTAL_NEG_SCENARIO}${param}`);
              }
            } catch (err) {
              return destroySessionsAndRedirect(req, res, next, `${LA_PORTAL_NEG_SCENARIO}${param}`);
            }
          }
        }
        return next();
      })
    );
  }
}
