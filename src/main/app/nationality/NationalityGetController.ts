import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../app/case/case';
import { AppRequest } from '../controller/AppRequest';
import { GetController, TranslationFn } from '../controller/GetController';

@autobind
export default class NationalityGetController extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const countries = req.session.userCase[`${this.fieldPrefix}AdditionalNationalities`];
    const remove = req.query.remove;

    if (remove && countries?.length) {
      const index = countries.indexOf(remove as string);

      if (index !== -1) {
        countries.splice(index, 1);
      }

      req.session.userCase[`${this.fieldPrefix}AdditionalNationalities`] = countries;

      req.session.userCase = await this.save(
        req,
        { [`${this.fieldPrefix}AdditionalNationalities`]: countries },
        this.getEventName(req)
      );

      delete req.query.remove;
      req.url = req.url.substring(0, req.url.indexOf('?'));

      super.saveSessionAndRedirect(req, res);
    } else {
      super.get(req, res);
    }
  }
}
