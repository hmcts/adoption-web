import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

export class ApplicationSubmittedGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }
}
