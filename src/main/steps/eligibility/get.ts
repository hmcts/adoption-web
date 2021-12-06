import { GetController } from '../../app/controller/GetController';

import { generateContent } from './start-eligibility/content';

export class StartEligibilityGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }
}
