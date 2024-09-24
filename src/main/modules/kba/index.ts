import { Application, NextFunction, Response } from 'express';

import { getSystemUser } from '../../app/auth/user/oidc';
import { getCaseApi } from '../../app/case/CaseApi';
import { getFormattedDateInSingleDigits } from '../../app/case/answers/formatDate';
import { AppRequest } from '../../app/controller/AppRequest';
import { getDraftCaseFromStore } from '../../modules/draft-store/draft-store-service';
import {
  LA_PORTAL,
  LA_PORTAL_KBA_CALLBACK,
  LA_PORTAL_KBA_CASE_REF,
  LA_PORTAL_NEG_SCENARIO,
  LA_PORTAL_START_PAGE,
} from '../../steps/urls';

/**
 * Adds the KBA middleware for knowledge based authentication
 */
export class KbaMiddleware {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    app.get(
      LA_PORTAL_KBA_CALLBACK,
      errorHandler(async (req: AppRequest, res) => {
        let param = '';
        const supportedLang = ['en', 'cy'];
        if (req.query.lang !== null &&
          req.query.lang !== undefined &&
          supportedLang.includes(req.query.lang as string)) {
          param = '?lang=' + req.query.lang;
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
              req.session.userCase = await req.locals.api.getCaseById(req.session.laPortalKba.kbaCaseRef!);
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
                return req.session.destroy(() => res.redirect(LA_PORTAL_NEG_SCENARIO + param));
              }
            } catch (err) {
              return req.session.destroy(() => res.redirect(LA_PORTAL_NEG_SCENARIO + param));
            }
          }
        }
        return next();
      })
    );
  }
}
