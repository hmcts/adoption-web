import autobind from 'autobind-decorator';

import { APPLICANT_2_CONFIRM_RECEIPT } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class HubPagePostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return APPLICANT_2_CONFIRM_RECEIPT;
  }
}
