import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';
import { getCourtList } from '../../../app/court/court-venues-api';

@autobind
export default class FindPlacementOrderCourtGetController extends GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const courtList = await getCourtList(req);
    req.session.courtList = courtList;

    super.get(req, res);
  }
}
