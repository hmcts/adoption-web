import autobind from 'autobind-decorator';
import { Response } from 'express';
import moment from 'moment';

import { getCaseApi } from '../../../app/case/CaseApi';
import { State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';

@autobind
export default class SaveAsDraftGetController extends GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    await this.resetFlagForNoPayments(req);

    await super.get(req, res);
  }
  private async resetFlagForNoPayments(req: AppRequest): Promise<void> {
    try {
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
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}
