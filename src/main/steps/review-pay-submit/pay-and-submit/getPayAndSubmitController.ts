import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fee/fee-lookup-api';

const logger = Logger.getLogger('GetPayAndSubmitController');

@autobind
export default class GetPayAndSubmitController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const feeResponse = await getFee(req.locals.logger);
    if (feeResponse) {
      req.session.fee = feeResponse;

      const callback = () => super.get(req, res);
      super.saveSessionAndRedirect(req, res, callback);
    } else {
      logger.error('GetPayAndSubmitController unable to get fee from fee-register API');
      throw new Error('GetPayAndSubmitController unable to get fee from fee-register API');
    }
  }
}
