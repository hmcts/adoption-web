import autobind from 'autobind-decorator';

import { CITIZEN_SUBMIT } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class ConfirmYourJointApplicationPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return CITIZEN_SUBMIT;
  }
}
