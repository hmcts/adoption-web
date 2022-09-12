import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { TASK_LIST_URL } from '../../urls';

import { generateContent } from './content';
const logger = Logger.getLogger('CUIGet');

@autobind
export default class ApplicationSubmittedGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const flag = config.get('services.ccddata.logging');
    logger.info(`services.ccddata.logging : ${flag}`);
    if (flag && flag === 'true') {
      logger.inof('CUI confirm page: ' + (await req.locals.api.getCaseById(req.session.userCase.id)));
    }

    if (req.session.userCase.state !== State.Submitted) {
      return res.redirect(TASK_LIST_URL);
    }

    super.get(req, res);
  }
}
