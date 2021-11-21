import autobind from 'autobind-decorator';

import { CITIZEN_APPLICANT2_UPDATE, CITIZEN_APPLICANT_2_REQUEST_CHANGES, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class CheckYourJointApplicationPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    return req.body.applicant2Confirmation === YesOrNo.NO
      ? CITIZEN_APPLICANT_2_REQUEST_CHANGES
      : CITIZEN_APPLICANT2_UPDATE;
  }
}
