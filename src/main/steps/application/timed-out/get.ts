import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

import { generateContent } from './content';

@autobind
export default class TimedOutGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.query?.eligibility) {
      req.session.isEligibility = true;
    }
    super.get(req, res);
  }
}
