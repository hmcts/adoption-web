import { Application, NextFunction, Response } from 'express';

import { getSystemUser } from '../../app/auth/user/oidc';
import { getCaseApi } from '../../app/case/CaseApi';
import { AppRequest } from '../../app/controller/AppRequest';
import {
  LA_PORTAL,
  LA_PORTAL_KBA_CALLBACK,
  LA_PORTAL_KBA_CASE_REF,
  LA_PORTAL_NEG_SCENARIO,
  LA_PORTAL_TASK_LIST,
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
        if (req.session.laPortalKba?.kbaCaseRef) {
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
          req.session.userCase = await getDraftCaseFromStore(req, req.session.laPortalKba.kbaCaseRef || '');
          if (!req.session.userCase) {
            try {
              req.session.userCase = await req.locals.api.getCaseById(req.session.laPortalKba.kbaCaseRef!);
            } catch (err) {
              req.session.destroy(() => res.redirect(LA_PORTAL_NEG_SCENARIO));
              return;
            }
          }

          if (
            JSON.stringify(req.session.userCase.childrenDateOfBirth) !==
              JSON.stringify(req.session.laPortalKba['kbaChildrenDateOfBirth']) ||
            req.session.laPortalKba['kbaChildName']?.trim() !==
              req.session.userCase.childrenFirstName + ' ' + req.session.userCase.childrenLastName
          ) {
            req.session.destroy(() => res.redirect(LA_PORTAL_NEG_SCENARIO));
            return;
          }
        }

        return next();
      })
    );
  }
}
