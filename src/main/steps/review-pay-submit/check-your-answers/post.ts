import autobind from 'autobind-decorator';
import { Response } from 'express';
import moment from 'moment';

import { toApiDate } from '../../../app/case/to-api-format';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class DateChildMovedInController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const dateChildMovedIn = new Date(toApiDate(req.session.userCase?.dateChildMovedIn));
    const currentDate = new Date();
    const days = moment(currentDate).diff(moment(dateChildMovedIn), 'days', true);
    if (days < 70) {
      req.session.errors = [];
      req.session.errors.push({ errorType: 'dateChildMovedIn', propertyName: 'dateError' });
      this.redirect(req, res, req.url);
      return;
    }
  }
}
