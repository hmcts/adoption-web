import { Application } from 'express';

import { START_PLACEMENT } from '../../steps/urls';

import { StartPlacementGetController } from './start-placement/get';

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    app.get(START_PLACEMENT, errorHandler(new StartPlacementGetController().get));
  }
}
