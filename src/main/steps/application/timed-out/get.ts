import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { LA_PORTAL_KBA_CASE_REF, SIGN_IN_URL } from '../../urls';

import { generateContent } from './content';

@autobind
export default class TimedOutGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.query.pageFrom) {
      if (!req.session.laPortalKba) {
        req.session.destroy(err => {
          if (err) {
            throw err;
          }
          res.redirect(SIGN_IN_URL);
        });
      } else {
        req.session.destroy(err => {
          if (err) {
            throw err;
          }
          res.redirect(LA_PORTAL_KBA_CASE_REF);
        });
      }
    } else {
      super.get(req, res);
    }
  }
}
