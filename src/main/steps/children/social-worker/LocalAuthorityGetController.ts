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
    //    Any new addition to the Local Authority / CFT Reference Data needs to be configured in 2 places
    //    1. @default.yaml config - For new inclusion to test on lower environments
    //    2. @values.yaml config - For new inclusion to test on other environments
    //    3. The mapping to be updated @custom-environment-variables.yaml config
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
