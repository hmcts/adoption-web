import autobind from 'autobind-decorator';
import { Response } from 'express';

import { APPLICANT_2, HUB_PAGE, RESPONDENT, SIGN_OUT_URL, YOU_NEED_TO_REVIEW_YOUR_APPLICATION } from '../../steps/urls';
import { getSystemUser } from '../auth/user/oidc';
import { getCaseApi } from '../case/CaseApi';
import { ApplicationType, SYSTEM_LINK_APPLICANT_2 } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';

@autobind
export class AccessCodePostController {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {}

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);

    if (req.body.saveAndSignOut) {
      return res.redirect(SIGN_OUT_URL);
    }

    const caseworkerUser = await getSystemUser();
    req.locals.api = getCaseApi(caseworkerUser, req.locals.logger);

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    formData.respondentUserId = req.session.user.id;
    formData.applicant2FirstNames = req.session.user.givenName;
    formData.applicant2LastNames = req.session.user.familyName;
    req.session.errors = form.getErrors(formData);
    const caseReference = formData.caseReference?.replace(/-/g, '');

    try {
      const caseData = await req.locals.api.getCaseById(caseReference as string);

      if (caseData.accessCode !== formData.accessCode) {
        req.session.errors.push({ errorType: 'invalidAccessCode', propertyName: 'accessCode' });
      }
    } catch (err) {
      req.session.errors.push({ errorType: 'invalidReference', propertyName: 'caseReference' });
    }

    if (req.session.errors.length === 0) {
      try {
        req.session.userCase = await req.locals.api.triggerEvent(
          caseReference as string,
          formData,
          SYSTEM_LINK_APPLICANT_2
        );
      } catch (err) {
        req.locals.logger.error('Error linking applicant 2/respondent to joint application', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }

    const nextUrl =
      req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION
        ? `${RESPONDENT}${HUB_PAGE}`
        : `${APPLICANT_2}${YOU_NEED_TO_REVIEW_YOUR_APPLICATION}`;

    const nextStep = req.session.errors.length > 0 ? req.url : nextUrl;

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextStep);
    });
  }
}
