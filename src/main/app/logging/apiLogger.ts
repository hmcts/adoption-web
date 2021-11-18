const { Logger } = require('@hmcts/nodejs-logging');

export class ApiLogger {
  constructor (public logger = Logger.getLogger('apiLogger.js')) {
    this.logger = logger;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logRequest (requestData: any): void {
    if (requestData.requestBody) {
      // eslint-disable-next-line no-prototype-builtins
      if (!requestData.requestBody.hasOwnProperty('oneTimePassword')) {
        this.logger.info(this._buildRequestEntry(requestData));
      }
    } else {
      this.logger.info(this._buildRequestEntry(requestData));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _buildRequestEntry (requestData: any): string {
    return `API: ${requestData.method} ${requestData.uri} ` +
      ((requestData.query) ? `| Query: ${this._stringifyObject(requestData.query)} ` : '') +
      ((requestData.requestBody) ? `| Body: ${this._stringifyObject(requestData.requestBody)} ` : '');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logResponse (responseData: any): void {
    this._logLevelFor(responseData.responseCode).call(this.logger, this._buildResponseEntry(responseData));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _buildResponseEntry (responseData: any): string {
    return `API: Response ${responseData.responseCode} from ${responseData.uri} ` +
      ((responseData.responseBody && this.isDebugLevel()) ? `| Body: ${this._stringifyObject(responseData.responseBody)} ` : '') +
      ((responseData.error) ? `| Error: ${this._stringifyObject(responseData.error)} ` : '');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _stringifyObject (object: any): string {
    if (object !== null && typeof object === 'object') {
      return JSON.stringify(object);
    }

    if (typeof object === 'string' && object.startsWith('%PDF')) {
      return '**** PDF Content not shown****';
    }

    return object;
  }

  _logLevelFor (statusCode: number): Function {
    if (statusCode < 400 || statusCode === 404) {
      return this.logger.info;
    } else if (statusCode >= 400 && statusCode < 500) {
      return this.logger.warn;
    } else {
      return this.logger.error;
    }
  }

  private isDebugLevel (): boolean {
    return this.resolveLoggingLevel() === 'DEBUG' || this.resolveLoggingLevel() === 'SILLY';
  }

  private resolveLoggingLevel (): string {
    const currentLevel = process.env.LOG_LEVEL || 'INFO';
    return currentLevel.toUpperCase();
  }
}
