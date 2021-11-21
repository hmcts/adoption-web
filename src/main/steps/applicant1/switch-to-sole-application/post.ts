import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getSystemUser } from '../../../app/auth/user/oidc';
import { getCaseApi } from '../../../app/case/CaseApi';
import { ApplicationType, SWITCH_TO_SOLE, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getNextStepUrl } from '../../index';
import { HOME_URL, PAY_AND_SUBMIT } from '../../urls';

@autobind
export default class SwitchToSoleApplicationPostController {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {}

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (req.body.cancel) {
      return res.redirect(req.session.userCase.state === State.Applicant2Approved ? PAY_AND_SUBMIT : HOME_URL);
    }

    const caseworkerUser = await getSystemUser();
    req.locals.api = getCaseApi(caseworkerUser, req.locals.logger);
    req.session.errors = [];

    try {
      req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;

      req.session.userCase = await req.locals.api.triggerEvent(
        req.session.userCase.id,
        req.session.userCase,
        SWITCH_TO_SOLE
      );
    } catch (err) {
      req.locals.logger.error('Error encountered whilst switching to sole application ', err);
      req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
    }

    const nextUrl = req.session.errors.length > 0 ? req.url : getNextStepUrl(req, req.session.userCase);

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
