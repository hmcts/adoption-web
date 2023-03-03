import autobind from 'autobind-decorator';
import { Response } from 'express';
import Negotiator from 'negotiator';

import { saveDraftCase } from '../../modules/draft-store/draft-store-service';
import { LanguageToggle } from '../../modules/i18n';
import { CommonContent, Language, generatePageContent } from '../../steps/common/common.content';
import * as Urls from '../../steps/urls';
import { Case, CaseWithId } from '../case/case';
import { CITIZEN_UPDATE, SYSTEM_USER_UPDATE, State } from '../case/definition';

import { AppRequest } from './AppRequest';

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: CommonContent) => PageContent;

@autobind
export class GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {}

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      // If there's an async error, it will have already rendered an error page upstream,
      // so we don't want to call render again
      return;
    }

    if (req.query.returnUrl) {
      this.parseAndSetReturnUrl(req);
      delete req.query.returnUrl;
      req.url = req.url.substring(0, req.url.indexOf('?'));
      this.saveSessionAndRedirect(req, res);
      return;
    }

    const language = this.getPreferredLanguage(req) as Language;
    const userCase = req.session?.userCase;
    const addresses = req.session?.addresses;
    const courtList = req.session?.courtList;
    const eligibility = req.session?.eligibility;
    const eligibilityPage = !!req.session?.isEligibility;
    const content = generatePageContent({
      language,
      pageContent: this.content,
      userCase,
      userEmail: req.session?.user?.email,
      addresses,
      eligibility,
      eligibilityPage,
      fee: req.session?.fee,
      courtList,
    });

    const sessionErrors = req.session?.errors || [];

    if (req.session?.errors) {
      req.session.errors = undefined;
    }

    res.render(this.view, {
      ...content,
      sessionErrors,
      htmlLang: language,
      isDraft: req.session?.userCase?.state ? req.session.userCase.state === State.Draft : true,
    });
  }

  protected getPreferredLanguage(req: AppRequest): string {
    // User selected language
    const requestedLanguage = req.query['lang'] as string;
    if (LanguageToggle.supportedLanguages.includes(requestedLanguage)) {
      return requestedLanguage;
    }

    // Saved session language
    if (req.session?.lang) {
      return req.session.lang;
    }

    // Browsers default language
    const negotiator = new Negotiator(req);
    return negotiator.language(LanguageToggle.supportedLanguages) || 'en';
  }

  public parseAndSetReturnUrl(req: AppRequest): void {
    if (req.query.returnUrl) {
      if (Object.values(Urls).find(item => item === `${req.query.returnUrl}`)) {
        req.session.returnUrl = `${req.query.returnUrl}`;
      }
    }
  }

  public async save(req: AppRequest, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    try {
      if (req.url.includes('la-portal') && ![Urls.LA_PORTAL_CHECK_YOUR_ANSWERS?.toString()].includes(req.url)) {
        return await saveDraftCase(req, req.session.userCase.id || '', formData);
      } else {
        return await req.locals.api.triggerEvent(req.session.userCase.id, formData, eventName);
      }
    } catch (err) {
      req.locals.logger.error('Error saving', err);
      req.session.errors = req.session.errors || [];
      req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      return req.session.userCase;
    }
  }

  //eslint-disable-next-line @typescript-eslint/ban-types
  public saveSessionAndRedirect(req: AppRequest, res: Response, callback?: Function): void {
    req.session.save(err => {
      if (err) {
        throw err;
      }
      if (callback) {
        callback();
      } else {
        res.redirect(req.url);
      }
    });
  }

  public getEventName(req: AppRequest): string {
    if (req.session.user?.isSystemUser) {
      return SYSTEM_USER_UPDATE;
    }
    return CITIZEN_UPDATE;
  }
}
