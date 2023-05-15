import autobind from 'autobind-decorator';
import { Response } from 'express';

import { State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { TASK_LIST_URL } from '../../urls';

import { generateContent } from './content';

@autobind
export default class ApplicationSubmittedGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase.canPaymentIgnored = false;
    if (req.session.userCase.state !== State.Submitted) {
      return res.redirect(TASK_LIST_URL);
    }
    await super.get(req, res);
  }
}
