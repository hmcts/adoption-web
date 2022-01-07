import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';

@autobind
export default class CheckboxesGetController extends GetController {
  flow: string;
  dataTypeSingular: string;
  dataTypePlural: string;

  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    flow: string,
    dataTypeSingular: string,
    dataTypePlural: string
  ) {
    super(view, content);
    this.flow = flow;
    this.dataTypeSingular = dataTypeSingular;
    this.dataTypePlural = dataTypePlural;
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const data = req.session.userCase[`${this.flow}Additional${this.dataTypePlural}`];
    const remove = req.query.remove;

    let removed = false;
    if (remove && data?.length) {
      const index = data.indexOf(remove as string);

      if (index !== -1) {
        data.splice(index, 1);
      }

      req.session.userCase[`${this.flow}Additional${this.dataTypePlural}`] = data;
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
