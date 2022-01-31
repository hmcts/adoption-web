import autobind from 'autobind-decorator';

import { CITIZEN_SUBMIT } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class PlacementOrderPostController extends PostController<AnyObject> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getEventName(req: AppRequest): string {
    return CITIZEN_SUBMIT;
  }
}
