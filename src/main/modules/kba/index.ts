import { Application, NextFunction, Response } from 'express';

import { getSystemUser } from '../../app/auth/user/oidc';
import { getCaseApi } from '../../app/case/CaseApi';
import { getFormattedDateInSingleDigits } from '../../app/case/answers/formatDate';
import { CaseDate, CaseWithId } from '../../app/case/case';
import { AppRequest } from '../../app/controller/AppRequest';
import { getDraftCaseFromStore } from '../../modules/draft-store/draft-store-service';
import {
  LA_DOCUMENT_MANAGER,
  LA_PORTAL,
  LA_PORTAL_KBA_CALLBACK,
  LA_PORTAL_KBA_CASE_REF,
  LA_PORTAL_NEG_SCENARIO,
  LA_PORTAL_SIGN_OUT_URL,
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
        const langCode = req.query.lang !== undefined ? req.query.lang : '';
        let param = '';
        const supportedLang = ['en', 'cy'];
        if (langCode !== null && supportedLang.includes(langCode as string)) {
          param = '?lang=' + supportedLang.find(item => item === langCode);
        }
        const kba = req.session.laPortalKba;
        if (!kba?.kbaCaseRef || !kba.kbaChildName || !kba.kbaChildrenDateOfBirth) {
          return res.redirect(LA_PORTAL_KBA_CASE_REF + param);
        }

        try {
          const systemUser = await getSystemUser();
          const api = getCaseApi(systemUser, req.locals.logger);
          const userCase = await api.getCaseById(kba.kbaCaseRef);

          if (!this.isKbaValid(kba.kbaCaseRef, kba.kbaChildName, kba.kbaChildrenDateOfBirth, userCase)) {
            return req.session.destroy(() => res.redirect(LA_PORTAL_NEG_SCENARIO + param));
          }

          const draftStoreUserCaseData = await getDraftCaseFromStore(req, kba.kbaCaseRef);
          await this.regenerateSession(req);

          req.session.user = { ...systemUser, isSystemUser: true };
          req.session.userCase = {
            ...userCase,
            ...(draftStoreUserCaseData || {}),
            id: userCase.id,
            state: userCase.state,
          };
          req.session.laPortalKba = {
            authenticated: true,
            kbaCaseRef: kba.kbaCaseRef,
          };

          await this.saveSession(req);
          return res.redirect(LA_PORTAL_START_PAGE + param);
        } catch (err) {
          return req.session.destroy(() => res.redirect(LA_PORTAL_NEG_SCENARIO + param));
        }
      })
    );

    app.get(LA_PORTAL_SIGN_OUT_URL, (req, res) => req.session.destroy(() => res.redirect(LA_PORTAL_KBA_CASE_REF)));

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        const param = req.query.lang !== undefined ? '?lang=' + req.query.lang : '';
        if (!req.path.startsWith(LA_PORTAL) && !req.path.startsWith(LA_DOCUMENT_MANAGER)) {
          return next();
        }
        res.locals.laPortal = true;
        if (req.session?.user) {
          if (
            !req.session.user.isSystemUser ||
            !req.session.laPortalKba?.authenticated ||
            req.session.laPortalKba.kbaCaseRef !== req.session.userCase?.id
          ) {
            return req.session.destroy(() => res.redirect(LA_PORTAL_KBA_CASE_REF + param));
          }

          res.locals.isLoggedIn = true;
          req.locals.api = getCaseApi(req.session.user, req.locals.logger);
        }
        return next();
      })
    );
  }

  private isKbaValid(caseRef: string, childName: string, childDateOfBirth: CaseDate, userCase: CaseWithId): boolean {
    const enteredDateOfBirth = getFormattedDateInSingleDigits(childDateOfBirth);
    const caseDateOfBirth = getFormattedDateInSingleDigits(userCase.childrenDateOfBirth);
    const caseChildName = `${userCase.childrenFirstName || ''} ${userCase.childrenLastName || ''}`
      .replace(/\s{2,}/g, ' ')
      .trim();

    return userCase.id === caseRef && enteredDateOfBirth === caseDateOfBirth && childName.trim() === caseChildName;
  }

  private regenerateSession(req: AppRequest): Promise<void> {
    return new Promise((resolve, reject) => req.session.regenerate(err => (err ? reject(err) : resolve())));
  }

  private saveSession(req: AppRequest): Promise<void> {
    return new Promise((resolve, reject) => req.session.save(err => (err ? reject(err) : resolve())));
  }
}
