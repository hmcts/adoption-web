import { Application } from 'express';

import { CITIZEN_UPDATE, LanguagePreference } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';

/**
 * Module that enables toggling between languages
 */
export class LanguageToggle {
  static supportedLanguages = ['en', 'cy'];

  public enableFor(app: Application): void {
    app.use(async (req, res, next) => {
      if (req.method === 'GET' && req.query['lng']) {
        const requestedLanguage = req.query['lng'] as string;

        if (LanguageToggle.supportedLanguages.includes(requestedLanguage)) {
          const appRequest = req as AppRequest;
          req.session['lang'] = requestedLanguage;

          if (appRequest.session.userCase?.id) {
            const languagePreference =
              requestedLanguage === 'cy' ? LanguagePreference.WELSH : LanguagePreference.ENGLISH;
            try {
              appRequest.session.userCase = await appRequest.locals.api.triggerEvent(
                appRequest.session.userCase.id,
                { applicant1LanguagePreference: languagePreference },
                CITIZEN_UPDATE
              );
            } catch (err) {
              appRequest.locals.logger.error('Error saving', err);
              appRequest.session.errors = (req as AppRequest).session.errors || [];
              appRequest.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
            }
          }
        }
      }
      next();
    });
  }
}
