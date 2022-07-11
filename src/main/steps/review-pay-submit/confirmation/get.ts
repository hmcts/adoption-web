import autobind from 'autobind-decorator';
import { Response } from 'express';

import { State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { LA_PORTAL_TASK_LIST } from '../../urls';

import { generateContent } from './content';

@autobind
export default class ApplicationSubmittedGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.Submitted) {
      return res.redirect(LA_PORTAL_TASK_LIST);
    }

    super.get(req, res);
  }
}
