import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';

@autobind
export default class SaveAsDraftGetController extends GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    req.session.destroy(async () => {
      res.locals.isLoggedIn = false;
      await super.get(req, res);
    });
  }
}
