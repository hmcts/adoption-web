import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from './AppRequest';

@autobind
export class TestingSupportController<T extends AnyObject> {
  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    req.session.userCase = await req.locals.api.createCase(res.locals.serviceType, req.session.user);
  }
}

export type AnyObject = Record<string, unknown>;
