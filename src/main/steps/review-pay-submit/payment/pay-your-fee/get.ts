import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { getFee } from '../../../../app/fee/fee-lookup-api';

@autobind
export default class FeeGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    let fee;

    if (!req.session.fee) {
      fee = await getFee(req.locals.logger);
      req.session.fee = fee;
    }

    console.log('req.session.fee', req.session.fee);

    req.session.save(err => {
      if (err) {
        throw err;
      }
      super.get(req, res);
    });
  }
}
