import autobind from 'autobind-decorator';

import {
  APPLICANT_1_RESUBMIT,
  ApplicationType,
  CITIZEN_INVITE_APPLICANT_2,
  CITIZEN_SUBMIT,
  State,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class CheckYourAnswersPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    if (req.session.userCase.state === State.AwaitingApplicant1Response) {
      return APPLICANT_1_RESUBMIT;
    } else if (req.body.applicationType === ApplicationType.JOINT_APPLICATION) {
      return CITIZEN_INVITE_APPLICANT_2;
    } else {
      return CITIZEN_SUBMIT;
    }
  }
}
