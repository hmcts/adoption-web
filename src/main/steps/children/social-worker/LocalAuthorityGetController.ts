import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';
import { LocalAuthorityList } from '../../../app/court/location';

@autobind
export default class LocalAuthorityGetController extends GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const localAuthorityList: LocalAuthorityList[] = [];
    for (const [key, value] of Object.entries(config.get('fpl.localAuthority'))) {
      const localAuthority: LocalAuthorityList = {
        code: key,
        name: value,
      };
      localAuthorityList.push(localAuthority);
    }
    req.session.localAuthorityList = localAuthorityList;
    super.get(req, res);
  }
}
