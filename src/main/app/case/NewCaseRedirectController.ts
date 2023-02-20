import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CHECK_ELIGIBILITY_URL_MULTIPLE_CHILDREN_DESC, HOME_URL, START_ELIGIBILITY_URL } from '../../steps/urls';
import { AppRequest } from '../controller/AppRequest';

import { getCaseApi } from './CaseApi';
import { State } from './definition';

@autobind
export class NewCaseRedirectController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    req.locals.api = getCaseApi(req.session.user, req.locals.logger);
    const userCase = await req.locals.api.getCase();
    if (userCase === null) {
      // Applications submitted not on login day
      res.redirect(START_ELIGIBILITY_URL);
    } else if (userCase) {
      // Returned case may be Draft OR Submitted
      if (userCase.state !== State.Submitted && userCase.state !== State.LaSubmitted) {
        res.redirect(HOME_URL);
      } else {
        // Applications submitted on the login day
        res.redirect(CHECK_ELIGIBILITY_URL_MULTIPLE_CHILDREN_DESC);
      }
    } else {
      // No Application for the user
      res.redirect(HOME_URL);
    }
  }
}
