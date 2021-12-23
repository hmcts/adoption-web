import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class OtherNamesGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const names = req.session.userCase.applicant2AdditionalNames;
    const remove = req.query.remove;

    let removed = false;
    if (remove && names?.length) {
      const index = names.indexOf(remove as string);

      if (index !== -1) {
        names.splice(index, 1);
      }

      req.session.userCase.applicant2AdditionalNames = names;
      delete req.query.remove;
      req.url = req.url.substring(0, req.url.indexOf('?'));
      removed = true;
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      if (removed) {
        res.redirect(req.url);
      } else {
        super.get(req, res);
      }
    });
  }
}
