import { YesOrNo } from 'app/case/definition';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class OtherNamesGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const names = req.session.userCase.applicant1AdditionalNames;
    const remove = req.query.remove;

    let removed = false;
    if (remove && names?.length) {
      const index = names.indexOf(remove as string);

      if (index !== -1) {
        names.splice(index, 1);
      }
      console.log(' po get 21a : ' + JSON.stringify(names));

      req.session.userCase.applicant1AdditionalNames = names;
      try {
        req.session.userCase = await this.save(
          req,
          { applicant1AdditionalNames: names, applicant1HasOtherNames: YesOrNo.YES },
          this.getEventName(req)
        );
      } catch (err) {
        req.locals.logger.error('Error saving', err);
        // req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
      delete req.query.remove;
      req.url = req.url.substring(0, req.url.indexOf('?'));
      removed = true;
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      if (removed) {
        res.redirect(req.url);
      } else {
        super.get(req, res);
      }
    });
  }
}
