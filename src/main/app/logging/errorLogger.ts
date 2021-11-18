import * as HttpStatus from 'http-status-codes';
const { Logger } = require('@hmcts/nodejs-logging');

export class ErrorLogger {
  constructor (public logger = Logger.getLogger('errorLogger.js')) {
    this.logger = logger;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
  log (err: any) {
    if (err) {
      const logMessage = `${err.stack || err}`;
      if (err.statusCode && err.statusCode === HttpStatus.NOT_FOUND) {
        this.logger.debug(logMessage);
      } else {
        this.logger.error(logMessage);
      }
    } else {
      this.logger.debug('Received error was blank');
    }
  }
}
