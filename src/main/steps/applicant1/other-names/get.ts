import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class OtherNamesGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const names = req.session.userCase.applicant1AdditionalNames;
    const remove = req.query.remove;

    if (remove && names?.length) {
      const index = names.indexOf(remove as string);

      if (index !== -1) {
        names.splice(index, 1);
      }

      req.session.userCase.applicant1AdditionalNames = names;
      delete req.query.remove;
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }

      super.get(req, res);
    });
  }
}
