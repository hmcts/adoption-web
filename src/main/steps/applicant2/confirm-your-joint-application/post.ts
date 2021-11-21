import autobind from 'autobind-decorator';

import { APPLICANT_2_APPROVE } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class ConfirmYourJointApplicationPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return APPLICANT_2_APPROVE;
  }
}
