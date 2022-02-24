import autobind from 'autobind-decorator';
import { Response } from 'express';
import { v4 as generateUuid } from 'uuid';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { getFee } from '../../../../app/fee/fee-lookup-api';

@autobind
export default class PayYourFeeGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.userCase.applicationFeeOrderSummary?.PaymentTotal) {
      const fee = await getFee(req.locals.logger);

      if (fee) {
        const total = fee.FeeAmount;
        req.session.userCase = await this.save(
          req,
          {
            applicationFeeOrderSummary: {
              PaymentReference: '',
              Fees: [{ id: generateUuid(), value: { ...fee } }],
              PaymentTotal: `${total}`,
            },
          },
          this.getEventName(req)
        );

        req.session.save(err => {
          if (err) {
            throw err;
          }
          super.get(req, res);
        });
        return;
      } else {
        throw new Error('Unable to get fee from fee-register API');
      }
    }

    super.get(req, res);
  }
}
