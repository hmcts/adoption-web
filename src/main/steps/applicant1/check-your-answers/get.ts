import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Checkbox } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class CheckYourAnswersGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase.applicant1IBelieveApplicationIsTrue = Checkbox.Unchecked;
    req.session.userCase.applicant1IConfirmPrayer = Checkbox.Unchecked;

    return super.get(req, res);
  }
}
