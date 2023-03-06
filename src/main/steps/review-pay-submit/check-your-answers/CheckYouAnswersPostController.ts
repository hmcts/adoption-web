import autobind from 'autobind-decorator';
import { Response } from 'express';
import moment from 'moment';

import { getCaseApi } from '../../../app/case/CaseApi';
import { State } from '../../../app/case/definition';
import { toApiDate } from '../../../app/case/to-api-format';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { STATEMENT_OF_TRUTH } from '../../urls';

@autobind
export default class CheckYouAnswersPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    req.session.errors = [];
    if (req.session.userCase.dateChildMovedIn === undefined) {
      req.session.errors.push({ errorType: 'lessThanTenWeeks', propertyName: 'dateChildMovedIn' });
      return this.redirect(req, res, req.url);
    }

    const dateChildMovedIn = new Date(toApiDate(req.session.userCase?.dateChildMovedIn));
    const currentDate = new Date();
    const days = moment(currentDate).diff(moment(dateChildMovedIn), 'days', true);

    if (days < 70) {
      req.session.errors.push({ errorType: 'lessThanTenWeeks', propertyName: 'dateChildMovedIn' });
      return this.redirect(req, res, req.url);
    }

    req.locals.api = getCaseApi(req.session.user, req.locals.logger);
    let cases = await req.locals.api.getCases();
    cases = cases.filter(
      caseElement =>
        (caseElement.state === State.Submitted || caseElement.state === State.LaSubmitted) &&
        moment(new Date(caseElement.case_data.dateSubmitted)).format('YYYY-MM-DD') ===
          moment(new Date()).format('YYYY-MM-DD')
    );
    if (cases.length > 0) {
      req.session.userCase.canPaymentIgnored = true;
      req.session.userCase.applicationFeeOrderSummary = cases[0].case_data.applicationFeeOrderSummary;
      req.session.userCase.payments = cases[0].case_data.applicationPayments;
    }
    this.redirect(req, res, STATEMENT_OF_TRUTH);
  }
}
