import autobind from 'autobind-decorator';
import { Response } from 'express';

import { State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';

import { TASK_LIST_URL } from './../../steps/urls';
import { generateContent } from './content';

@autobind
export class ApplicationSubmittedGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.Submitted) {
      return res.redirect(TASK_LIST_URL);
    }

    super.get(req, res);
  }
}
