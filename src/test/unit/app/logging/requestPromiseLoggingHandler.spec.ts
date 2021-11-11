import { RequestLoggingHandler } from 'logging/requestPromiseLoggingHandler';
import { ApiLogger } from 'logging/apiLogger';

describe('RequestLoggingHandler', () => {
  let handler: RequestLoggingHandler;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let proxy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let options: any;


  const requestPromise = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    del: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
    head: jest.fn(),
    another: jest.fn()
  };

  const apiLogger = {
    // eslint-disable-next-line
    logRequest: (requestData: any) => { },
    // eslint-disable-next-line
    logResponse: (responseData: any) => { }
  };
  
  beforeEach(() => {
    options = {};
    handler = new RequestLoggingHandler(requestPromise, apiLogger as ApiLogger);
    proxy = new Proxy(requestPromise, handler);
  });

  test('should throw an error when initialised without request', () => {
    expect(() => new RequestLoggingHandler(undefined)).toThrow(Error);
  });

  describe('request-promise http calls proxy', () => {
    // eslint-disable-next-line
    let logRequestCall: any;

    beforeEach(() => {
      logRequestCall = jest.spyOn(apiLogger, 'logRequest');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    const suiteParameters = [
      { paramName: 'options object', param: {} },
      { paramName: 'uri string', param: 'http://local.instance/some/path' }
    ];

    suiteParameters.forEach((suite) => {
      describe(`when passed an ${suite.paramName}`, () => {
        test('should handle logging on a get call', () => {
          proxy.get(suite.param);
          expect(logRequestCall).toHaveBeenCalled();
        });

        test('should handle logging on a put call', () => {
          proxy.put(suite.param);
          expect(logRequestCall).toHaveBeenCalled();
        });

        test('should handle logging on a post call', () => {
          proxy.post(suite.param);
          expect(logRequestCall).toHaveBeenCalled();
        });

        test('should handle logging on a del call', () => {
          proxy.del(suite.param);
          expect(logRequestCall).toHaveBeenCalled();
        });

        test('should handle logging on a delete call', () => {
          proxy.delete(suite.param);
          expect(logRequestCall).toHaveBeenCalled();
        });

        test('should handle logging on a patch call', () => {
          proxy.patch(suite.param);
          expect(logRequestCall).toHaveBeenCalled();
        });

        test('should handle logging on a head call', () => {
          proxy.head(suite.param);
          expect(logRequestCall).toHaveBeenCalled();
        });

        test('should not handle logging on other calls', () => {
          proxy.another(suite.param);
          expect(logRequestCall).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('handleLogging', () => {

    let originalCallback: Function;

    beforeEach(() => {
      originalCallback = jest.fn();
    });

    test('should assign a callback to the options object', () => {
      handler.handleLogging('any', options);
      expect(options.callback).toBeDefined();
    });

    test('should override the originally assigned callback', () => {
      options.callback = originalCallback;
      handler.handleLogging('any', options);

      expect(options.callback).not.toEqual(originalCallback);
    });

    test('should call the original callback defined in options object', () => {
      options.callback = originalCallback;
      handler.handleLogging('any', options);
      options.callback();

      expect(originalCallback).toHaveBeenCalled();
    });
  });
});
