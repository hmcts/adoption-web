import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getSystemUser } from '../../../app/auth/user/oidc';
import { getCaseApi } from '../../../app/case/CaseApi';
import { ApplicationType, SWITCH_TO_SOLE } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

import { generateContent } from './content';

@autobind
export default class ApplicationEndedGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const caseworkerUser = await getSystemUser();
    req.locals.api = getCaseApi(caseworkerUser, req.locals.logger);

    try {
      req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;

      req.session.userCase = await req.locals.api.triggerEvent(
        req.session.userCase.id,
        req.session.userCase,
        SWITCH_TO_SOLE
      );
    } catch (err) {
      req.locals.logger.error('Error encountered whilst switching application type to sole ', err);
      throw new Error('Error encountered whilst switching application type to sole.');
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      super.get(req, res);
    });
  }
}
