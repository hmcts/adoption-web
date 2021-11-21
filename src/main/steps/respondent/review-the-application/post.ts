import autobind from 'autobind-decorator';

import { DRAFT_AOS } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class ReviewTheApplicationPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return DRAFT_AOS;
  }
}
