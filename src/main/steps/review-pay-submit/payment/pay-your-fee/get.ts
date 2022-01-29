import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { getFee } from '../../../../app/fee/fee-lookup-api';

@autobind
export default class PayYourFeeGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.fee) {
      const fee = await getFee(req.locals.logger);
      req.session.fee = fee;
    }

    this.saveSessionAndRedirect(req, res, false);
  }
}
