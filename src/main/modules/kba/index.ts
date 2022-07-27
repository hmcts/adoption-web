import { Application, NextFunction, Response } from 'express';

import { getSystemUser } from '../../app/auth/user/oidc';
import { getCaseApi } from '../../app/case/CaseApi';
import { AppRequest } from '../../app/controller/AppRequest';
import { getDraftCaseFromStore } from '../../modules/draft-store/draft-store-service';
import { LA_PORTAL, LA_PORTAL_KBA_CALLBACK, LA_PORTAL_KBA_CASE_REF, LA_PORTAL_TASK_LIST } from '../../steps/urls';

/**
 * Adds the KBA middleware for knowledge based authentication
 */
export class KbaMiddleware {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    app.get(
      LA_PORTAL_KBA_CALLBACK,
      errorHandler(async (req: AppRequest, res) => {
        if (req.session.laPortalKba?.caseRef) {
          req.session.user = await getSystemUser();
          req.session.user.isSystemUser = true;
          req.session.save(() => res.redirect(LA_PORTAL_TASK_LIST));
        } else {
          res.redirect(LA_PORTAL_KBA_CASE_REF);
        }
      })
    );

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if (!req.path.startsWith(LA_PORTAL)) {
          return next();
        }
        res.locals.laPortal = true;
        if (req.session?.user) {
          res.locals.isLoggedIn = true;
          req.locals.api = getCaseApi(req.session.user, req.locals.logger);
          req.session.userCase = await getDraftCaseFromStore(req, req.session.laPortalKba.caseRef || '');
          if (!req.session.userCase) {
            req.session.userCase = await req.locals.api.getCaseById(req.session.laPortalKba.caseRef!);
          }
        }

        return next();
      })
    );
  }
}
