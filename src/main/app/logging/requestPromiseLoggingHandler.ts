import { ApiLogger } from 'logging/apiLogger';
import { HttpProxyCallInterceptor } from 'logging/httpProxyCallInterceptor';
import { RequestAPI } from 'client/request';

export class RequestLoggingHandler {
  constructor (private request: any, private apiLogger = new ApiLogger()) {
    if (!this.request) {
      throw new Error('Initialised request instance is required');
    }
  }

  static proxy<T extends RequestAPI> (request: T): T {
    return new Proxy(request, new RequestLoggingHandler(request));
  }

  get (target: any, key: any) {
    return HttpProxyCallInterceptor.intercept(target, key, (callTarget: Record<string, any>, methodName: string, methodArgs: any[]) => {
      this.handleLogging(methodName.toUpperCase(), asOptions(methodArgs[0]));
    });
  }

  handleLogging (method: any, options: any) {
    this.apiLogger.logRequest({
      method: method,
      uri: options.uri,
      requestBody: options.body,
      query: options.qs,
      headers: options.headers
    });
    const originalCallback = intercept(options.callback);
    options.callback = (err: any, response: any, body: any) => {
      originalCallback(err, response, body);
      this.apiLogger.logResponse({
        uri: options.uri,
        responseCode: ((response) ? response.statusCode : undefined),
        responseBody: body,
        error: err,
        requestHeaders: options.headers
      });
    };
  }
}

/**
 * Request provides a convenience method which accepts an URI string and builds the options
 * object behind the scenes. We need the options object upfront to set the logging callback on it.
 */
function asOptions (param: any) {
  if (typeof param === 'string' || param instanceof String) {
    return {
      uri: param
    };
  } else {
    return param;
  }
}

function intercept (callbackFunction: any) {
  return (err: any, response: any, body: any) => {
    if (callbackFunction) {
      callbackFunction(err, response, body);
    }
  };
}
