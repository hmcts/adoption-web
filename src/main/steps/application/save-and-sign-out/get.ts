import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

import { generateContent } from './content';

@autobind
export default class SaveSignOutGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    res.locals['email'] = req.session.user?.email;

    req.session.destroy(err => {
      if (err) {
        throw err;
      }

      super.get(req, res).catch(error => {
        throw error;
      });
    });
  }
}
