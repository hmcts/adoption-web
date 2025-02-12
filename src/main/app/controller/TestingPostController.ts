import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { getSystemUser } from '../auth/user/oidc';
import { getCaseApi } from '../case/CaseApi';

import { AppRequest } from './AppRequest';
import { AnyObject } from './PostController';

const logger = Logger.getLogger('testing-support');
@autobind
export class TestingPostController {
  public async populate(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const systemUser = await getSystemUser();
    const caseId = req.params.caseId;
    const caseApi = getCaseApi(systemUser, logger);
    const updateEvent = 'system-user-update-application';
    caseApi.triggerEvent(caseId, req.body, updateEvent);
    res.json({ message: 'Hello, World', systemUser, caseApi });
  }
}
