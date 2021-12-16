import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class NationalityGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const countries = req.session.userCase.applicant1Nationalities;
    const remove = req.query.remove;

    if (remove && countries?.length) {
      const index = countries.indexOf(remove as string);

      if (index !== -1) {
        countries.splice(index, 1);
      }

      req.session.userCase.applicant1Nationalities = countries;
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
