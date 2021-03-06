import { Logger } from '@hmcts/nodejs-logging';
import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { getCaseApi } from '../../app/case/CaseApi';
import { LanguagePreference } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { CALLBACK_URL, ELIGIBILITY_URL, SIGN_IN_URL, SIGN_OUT_URL } from '../../steps/urls';

//TODO remove applicant2 related stuff
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

    app.get(SIGN_OUT_URL, (req, res) => req.session.destroy(() => res.redirect('/')));

    app.get(
      CALLBACK_URL,
      errorHandler(async (req, res) => {
        if (typeof req.query.code === 'string') {
          req.session.user = await getUserDetails(`${protocol}${res.locals.host}${port}`, req.query.code, CALLBACK_URL);
          const role: string = config.get('services.idam.userRole');
          logger.info('Roles are ---', req.session.user.roles);
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
        if (req.path.startsWith(ELIGIBILITY_URL)) {
          return next();
        }
        if (req.session?.user) {
          res.locals.isLoggedIn = true;
          req.locals.api = getCaseApi(req.session.user, req.locals.logger);
          if (!req.session.userCase) {
            //This language preference will be used while creating a case
            const languagePreference =
              req.session['lang'] === 'cy' ? LanguagePreference.WELSH : LanguagePreference.ENGLISH;
            req.session.userCase = await req.locals.api.getOrCreateCase(
              res.locals.serviceType,
              req.session.user,
              languagePreference
            );

            //setting the applicant's preferred language in session
            req.session['lang'] =
              req.session.userCase.applicant1LanguagePreference === LanguagePreference.WELSH ? 'cy' : 'en';
          }
          return next();
        }
        res.redirect(SIGN_IN_URL);
      })
    );
  }
}
