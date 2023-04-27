/* eslint-disable @typescript-eslint/no-non-null-assertion */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCaseApi } from '../../app/case/CaseApi';
import {
  getDraftCaseFromStore,
  removeCaseFromRedis,
  saveDraftCase,
} from '../../modules/draft-store/draft-store-service';
import { getNextStepUrl } from '../../steps';
import {
  APPLYING_WITH_URL,
  CHECK_ANSWERS_URL,
  LA_PORTAL,
  LA_PORTAL_CHECK_YOUR_ANSWERS,
  LA_PORTAL_STATEMENT_OF_TRUTH,
  LA_PORTAL_TASK_LIST,
  SAVE_AND_RELOGIN,
  SAVE_AND_SIGN_OUT,
  SAVE_AS_DRAFT,
} from '../../steps/urls';
import { Case, CaseWithId } from '../case/case';
import {
  CITIZEN_SAVE_AND_CLOSE,
  CITIZEN_SUBMIT,
  CITIZEN_UPDATE,
  LA_SUBMIT,
  SYSTEM_USER_UPDATE,
  State,
} from '../case/definition';
import { Form, FormFields, FormFieldsFn } from '../form/Form';
import { ValidationError } from '../form/validation';

import { AppRequest } from './AppRequest';

@autobind
export class PostController<T extends AnyObject> {
  protected ALLOWED_RETURN_URLS: string[] = [CHECK_ANSWERS_URL, LA_PORTAL_CHECK_YOUR_ANSWERS];

  constructor(protected readonly fields: FormFields | FormFieldsFn) {}

  /**
   * Parse the form body and decide whether this is a save and sign out, save and continue or session time out
   */
  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);

    const { saveAndRelogin, saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(
      req.body
    );

    if (req.path.startsWith(APPLYING_WITH_URL)) {
      req.locals.api = getCaseApi(req.session.user, req.locals.logger);
      const userCase = await req.locals.api.getCase();
      if (userCase === null) {
        // Applications submitted not on login day
        const pcqId = await req.locals.api.checkOldPCQIDExists();
        req.session.userCase = await req.locals.api.createCase(res.locals.serviceType, req.session.user);
        req.session.userCase = await this.save(
          req,
          {
            pcqId,
          },
          this.getEventName(req)
        );
      } else if (userCase) {
        //this.getDraftOrSubmittedCase(req, userCase, res);
        // Returned case may be Draft OR Submitted
        const pcqId = await req.locals.api.checkOldPCQIDExists();
        await this.savePcqIDforDraftOrSubmittedCase(userCase, req, pcqId, res);
      } else {
        // No Application for the user
        req.session.userCase = await req.locals.api.createCase(res.locals.serviceType, req.session.user);
      }
      req.session.isEligibility = false;
    }

    if (req.body.saveAndRelogin) {
      req.session.destroy(err => {
        if (err) {
          throw err;
        }
      });
      await this.saveAndSignOut(req, res, formData, SAVE_AND_RELOGIN);
    }
    if (req.body.saveAndSignOut) {
      await this.saveAndSignOut(req, res, formData, SAVE_AND_SIGN_OUT);
    } else if (req.body.saveBeforeSessionTimeout) {
      await this.saveBeforeSessionTimeout(req, res, formData);
    } else {
      await this.saveAndContinue(req, res, form, formData);
    }
  }

  private async savePcqIDforDraftOrSubmittedCase(
    userCase: CaseWithId,
    req: AppRequest<T>,
    pcqId: string | undefined,
    res: Response
  ) {
    if (userCase.state !== State.Submitted && userCase.state !== State.LaSubmitted) {
      req.session.userCase = userCase;
      req.session.userCase = await this.save(
        req,
        {
          pcqId,
        },
        this.getEventName(req)
      );
    } else {
      // Applications submitted on the login day
      req.session.userCase = await req.locals.api.createCase(res.locals.serviceType, req.session.user);
      req.session.userCase = await this.save(
        req,
        {
          pcqId,
        },
        this.getEventName(req)
      );
    }
  }

  private async saveAndSignOut(
    req: AppRequest<T>,
    res: Response,
    formData: Partial<Case>,
    redirectUrl: string
  ): Promise<void> {
    try {
      await this.save(req, formData, CITIZEN_SAVE_AND_CLOSE);
    } catch {
      // ignore
    }
    res.redirect(redirectUrl);
  }

  private async saveBeforeSessionTimeout(req: AppRequest<T>, res: Response, formData: Partial<Case>): Promise<void> {
    try {
      await this.save(req, formData, this.getEventName(req));
    } catch {
      // ignore
    }
    res.end();
  }

  private async saveAndContinue(req: AppRequest<T>, res: Response, form: Form, formData: Partial<Case>): Promise<void> {
    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);
    this.filterErrorsForSaveAsDraft(req);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

    req.session.userCase = await this.save(req, formData, this.getEventName(req));

    this.checkReturnUrlAndRedirect(req, res, this.ALLOWED_RETURN_URLS);
  }

  protected filterErrorsForSaveAsDraft(req: AppRequest<T>): void {
    if (req.body.saveAsDraft) {
      // skip empty field errors in case of save as draft
      req.session.errors = req.session.errors!.filter(
        item =>
          item.errorType !== ValidationError.REQUIRED &&
          item.errorType !== ValidationError.NOT_SELECTED &&
          item.errorType !== ValidationError.NOT_UPLOADED &&
          item.errorType !== ValidationError.ADD_BUTTON_NOT_CLICKED
      );
    }
  }

  protected async save(req: AppRequest<T>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    const caseRefId = req.session.userCase.id;
    if (
      (req.url.includes('la-portal') && ![LA_PORTAL_STATEMENT_OF_TRUTH?.toString()].includes(req.url)) ||
      (req.body['saveAsDraft'] && [LA_PORTAL_STATEMENT_OF_TRUTH?.toString()].includes(req.url))
    ) {
      try {
        return await saveDraftCase(req, caseRefId || '', formData);
      } catch (err) {
        req.locals.logger.error('Cannot save to redis cache', err);
        req.session.errors = req.session.errors || [];
        req.session.errors?.push({ errorType: 'errorSaving', propertyName: '*' });
      }
      return req.session.userCase;
    } else {
      return this.laStateOfTruth(req, formData, caseRefId, eventName);
    }
  }

  protected async laStateOfTruth(
    req: AppRequest<T>,
    formData: Partial<Case>,
    caseRefId: string,
    eventName: string
  ): Promise<CaseWithId> {
    try {
      if ([LA_PORTAL_STATEMENT_OF_TRUTH?.toString()].includes(req.url)) {
        await saveDraftCase(req, caseRefId || '', formData);
        const modifiedValuesSet = await getDraftCaseFromStore(req, caseRefId || '');
        req.session.userCase = await req.locals.api.triggerEvent(caseRefId, modifiedValuesSet, eventName);
        removeCaseFromRedis(req, caseRefId);
      } else {
        const flag = req.session.userCase.canPaymentIgnored;
        const feeSummary = req.session.userCase.applicationFeeOrderSummary;
        const payments = req.session.userCase.payments;
        req.session.userCase = await req.locals.api.triggerEvent(caseRefId, formData, eventName);
        if (flag) {
          req.session.userCase = await req.locals.api.triggerEvent(
            caseRefId,
            { applicationFeeOrderSummary: feeSummary },
            CITIZEN_SUBMIT
          );
          req.session.userCase = await req.locals.api.addPayment(caseRefId, payments!);
          req.session.userCase.canPaymentIgnored = flag;
        }
      }
    } catch (err) {
      req.locals.logger.error('Error saving', err);
      req.session.errors = req.session.errors || [];
      req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
    }
    return req.session.userCase;
  }

  protected redirect(req: AppRequest<T>, res: Response, nextUrl?: string): void {
    let target;
    if (req.body['saveAsDraft']) {
      //redirects to task-list page in case of save-as-draft button click
      req.session.returnUrl = undefined;
      target = req.path.startsWith(LA_PORTAL) ? LA_PORTAL_TASK_LIST : SAVE_AS_DRAFT;
    } else if (req.session.errors?.length) {
      //redirects to same page in case of validation errors
      target = req.url;
    } else {
      //redirects to input nextUrl if present otherwise calls getNextStepUrl to get the next step url
      target = nextUrl || getNextStepUrl(req, req.session.userCase);
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(target);
    });
  }

  // method to check if there is a returnUrl in session and
  // it is one of the allowed redirects from current page
  protected checkReturnUrlAndRedirect(req: AppRequest<T>, res: Response, allowedReturnUrls: string[]): void {
    const returnUrl = req.session.returnUrl;
    if (returnUrl && allowedReturnUrls.includes(returnUrl)) {
      req.session.returnUrl = undefined;
      this.redirect(req, res, returnUrl);
    } else {
      this.redirect(req, res);
    }
  }

  protected getEventName(req: AppRequest): string {
    if (req.session.user?.isSystemUser && req.url.includes(LA_PORTAL_STATEMENT_OF_TRUTH)) {
      return LA_SUBMIT;
    } else if (req.session.user?.isSystemUser) {
      return SYSTEM_USER_UPDATE;
    }
    return CITIZEN_UPDATE;
  }
}

export type AnyObject = Record<string, unknown>;
