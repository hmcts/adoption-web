import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCaseApi } from '../../../app/case/CaseApi';
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
    req.locals.api = getCaseApi(req.session.user, req.locals.logger);
    const cases = await req.locals.api.getCases();

    cases.forEach(element => {
      console.log('CASE ID: ', element.id);
      console.log('CASE Date: ', element.case_data.dateSubmitted);
      console.log('CASE State: ', element.state);
    });

    if (req.session.userCase.state !== State.Submitted) {
      return res.redirect(TASK_LIST_URL);
    }
    super.get(req, res);
  }
}
