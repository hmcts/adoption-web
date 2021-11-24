import { GetController } from '../../../app/controller/GetController';

import { generateContent } from './content';

export class StartPlacementGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }
}
