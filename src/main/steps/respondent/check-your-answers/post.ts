import autobind from 'autobind-decorator';

import { SUBMIT_AOS } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class CheckYourAnswersPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return SUBMIT_AOS;
  }
}
