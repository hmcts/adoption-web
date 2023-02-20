import config from 'config';
import { Application } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppRequest } from '../../app/controller/AppRequest';
import { ErrorController, HTTPError } from '../../steps/error/error.controller';
import { LA_DOCUMENT_MANAGER } from '../../steps/urls';

export class LoadTimeouts {
  public enableFor(app: Application): void {
    let timeoutMs = config.get<number>('timeout');

    app.use((req, res, next) => {
      const errorController = new ErrorController();

      if (req.path.startsWith(LA_DOCUMENT_MANAGER)) {
        console.log('Inside new condition------------');
        timeoutMs = config.get<number>('fileUploadTimeout');
        console.log('timeoutMs: ----------  ' + timeoutMs);
      }

      // Set the timeout for all HTTP requests
      req.setTimeout(timeoutMs, () => {
        console.log('timeoutMs inside request Timeout ----   ' + timeoutMs);

        const err = new HTTPError('Request Timeout', StatusCodes.REQUEST_TIMEOUT);
        errorController.internalServerError(err, req as AppRequest, res);
      });

      // Set the server response timeout for all HTTP requests
      res.setTimeout(timeoutMs, () => {
        console.log('timeoutMs inside response Timeout ----   ' + timeoutMs);
        const err = new HTTPError('Service Unavailable', StatusCodes.SERVICE_UNAVAILABLE);
        errorController.internalServerError(err, req as AppRequest, res);
      });

      console.log('Request Path before next:     ' + req.path);
      console.log('timeoutMs before next:     ' + timeoutMs);

      next();
    });
  }
}
