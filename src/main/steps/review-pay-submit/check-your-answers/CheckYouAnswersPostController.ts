import autobind from 'autobind-decorator';
import { Response } from 'express';
import moment from 'moment';

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

    this.redirect(req, res, STATEMENT_OF_TRUTH);
  }
}
