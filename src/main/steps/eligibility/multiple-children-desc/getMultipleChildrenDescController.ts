import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fee/fee-lookup-api';

const logger = Logger.getLogger('GetMultipleChildrenDescController');

@autobind
export default class GetMultipleChildrenDescController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const feeResponse = await getFee(req.locals.logger);
    if (feeResponse) {
      req.session.fee = feeResponse;

      const callback = () => super.get(req, res);
      super.saveSessionAndRedirect(req, res, callback);
    } else {
      logger.error('GetMultipleChildrenDescController unable to get fee from fee-register API');
      throw new Error('GetMultipleChildrenDescController unable to get fee from fee-register API');
    }
  }
}
