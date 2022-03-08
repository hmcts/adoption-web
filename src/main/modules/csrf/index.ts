import csurf from 'csurf';
import type { Application } from 'express';
import type { LoggerInstance } from 'winston';

import { HttpStatus } from '../../app/case/definition';
import { CSRF_TOKEN_ERROR_URL } from '../../steps/urls';

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('app');

const dynatraceMonitorPaths = ['/rb_bf24054dsx', '/rb_bf00910jpo'];

export class CSRFToken {
  public enableFor(app: Application): void {
    app.use(csurf(), (req, res, next) => {
      res.locals.csrfToken = req.csrfToken();
      next();
    });

    app.use((error, req, res, next) => {
      if (dynatraceMonitorPaths.includes(req.path)) {
        return res.sendStatus(HttpStatus.OK);
      }

      if (error.code === 'EBADCSRFTOKEN') {
        logger.error(`${error.stack || error}`);
        return res.redirect(CSRF_TOKEN_ERROR_URL);
      }
      next();
    });
  }
}
