import { Application } from 'express';

import { START_ELIGIBILITY_URL } from '../../steps/urls';

import { StartEligibilityGetController } from './get';

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    app.get(START_ELIGIBILITY_URL, errorHandler(new StartEligibilityGetController().get));
  }
}
