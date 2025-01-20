import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fee/fee-lookup-api';
import { TASK_LIST_URL } from '../../urls';

import { generateContent } from './content';

const logger = Logger.getLogger('GetSubmittedController');

@autobind
export default class GetSubmittedController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase.canPaymentIgnored = false;
    if (req.session.userCase.state !== State.Submitted && req.session.userCase.state !== State.LaSubmitted) {
      return res.redirect(TASK_LIST_URL);
    }
    const feeResponse = await getFee(req.locals.logger);
    if (feeResponse) {
      req.session.fee = feeResponse;

      const callback = () => super.get(req, res);
      super.saveSessionAndRedirect(req, res, callback);
    } else {
      logger.error('GetSubmittedController unable to get fee from fee-register API');
      throw new Error('GetSubmittedController unable to get fee from fee-register API');
    }
  }
}
