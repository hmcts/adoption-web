import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../case/case';
import { YesOrNo } from '../../case/definition';
import { AppRequest } from '../AppRequest';
import { GetController, TranslationFn } from '../GetController';

@autobind
export default class OtherNamesGetController extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const names = req.session.userCase[`${this.fieldPrefix}AdditionalNames`];

    const remove = req.query.remove;

    let removed = false;

    if (remove && names?.length) {
      const index = names.findIndex(item => item.id === remove);

      if (index !== -1) {
        names.splice(index, 1);
      }

      req.session.userCase[`${this.fieldPrefix}AdditionalNames`] = names;

      req.session.userCase = await this.save(
        req,
        { [`${this.fieldPrefix}AdditionalNames`]: names, [`${this.fieldPrefix}HasOtherNames`]: YesOrNo.YES },
        this.getEventName(req)
      );

      delete req.query.remove;
      req.url = req.url.substring(0, req.url.indexOf('?'));
      removed = true;
    }

    this.saveSessionAndRedirect(req, res, removed);
  }
}
