import { ApiLogger } from 'logging/apiLogger';

process.env.LOG_LEVEL = 'DEBUG';

describe('ApiLogger', () => {
  let apiLogger: ApiLogger;

  beforeEach(() => {
    apiLogger = new ApiLogger({});
  });

  describe('logRequest', () => {
    beforeEach(() => {
      apiLogger.logger.info = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('when request has requestBody', () => {
      describe('and when request requestBody does not contain oneTimePassword', () => {
        test('should log request', () => {
          const requestData = {
            method: 'GET',
            uri: 'http://localhost/resource',
            requestBody: {
              'MOCK_KEY': 'MOCK_VALUE'
            }
          };
          apiLogger.logRequest(requestData);
          expect(apiLogger.logger.info).toHaveBeenCalledTimes(1);
        });
      });
      describe('and when request requestBody contains oneTimePassword', () => {
        test('should log request', () => {
          const requestData = {
            method: 'GET',
            uri: 'http://localhost/resource',
            requestBody: {
              'oneTimePassword': 'MOCK_PASSWORD'
            }
          };
          apiLogger.logRequest(requestData);
          expect(apiLogger.logger.info).not.toHaveBeenCalled();
        });
      });
    });

    describe('when request does not have requestBody', () => {
      test('should log request', () => {
        const requestData = {
          method: 'GET',
          uri: 'http://localhost/resource'
        };
        apiLogger.logRequest(requestData);
        expect(apiLogger.logger.info).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('logResponse', () => {
    beforeEach(() => {
      apiLogger._logLevelFor = jest.fn().mockReturnValue(() => console.log('empty'));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should call _logLevelFor', () => {
      const responseData = {
        uri: 'http://localhost/resource',
        responseCode: 200
      };
      apiLogger.logResponse(responseData);
      expect(apiLogger._logLevelFor).toHaveBeenCalledTimes(1);
    });
  });

  describe('_buildRequestEntry', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let requestData: any;

    beforeEach(() => {
      requestData = {
        method: 'GET',
        uri: 'http://localhost/resource'
      };
    });

    test('should format the message of method and uri', () => {
      const logEntry = apiLogger._buildRequestEntry(requestData);
      expect(logEntry).toContain('GET');
      expect(logEntry).toContain('http://localhost/resource');
    });

    test('should include request body if provided', () => {
      requestData.requestBody = { formField: 'formValue' };
      const logEntry = apiLogger._buildRequestEntry(requestData);
      expect(logEntry).toContain('{"formField":"formValue"}');
    });

    test('should not include request body if not provided', () => {
      const logEntry = apiLogger._buildRequestEntry(requestData);
      expect(logEntry).not.toContain('Body');
    });

    test('should include query string if provided', () => {
      requestData.query = { key: 'value' };
      const logEntry = apiLogger._buildRequestEntry(requestData);
      expect(logEntry).toContain('{"key":"value"}');
    });

    test('should not include query string if not provided', () => {
      const logEntry = apiLogger._buildRequestEntry(requestData);
      expect(logEntry).not.toContain('Query');
    });

    test('should include both request body and query string if provided', () => {
      requestData.requestBody = { formField: 'formValue' };
      requestData.query = { key: 'value' };
      const logEntry = apiLogger._buildRequestEntry(requestData);
      expect(logEntry).toContain('{"formField":"formValue"}');
      expect(logEntry).toContain('{"key":"value"}');
    });
  });

  describe('_stringifyObject', () => {
    test('should stringify object', () => {
      const stringifiedObject = apiLogger._stringifyObject({ 'MOCK_KEY': 'MOCK_VALUE' });
      expect(stringifiedObject).toEqual('{"MOCK_KEY":"MOCK_VALUE"}');
    });

    test('should hide pdf output', () => {
      const stringifiedObject = apiLogger._stringifyObject('%PDFasdsdasdas@1312aSDAAS');
      expect(stringifiedObject).toEqual('**** PDF Content not shown****');
    });

    test('should return string', () => {
      const stringifiedObject = apiLogger._stringifyObject('asdsdasdas@1312aSDAAS');
      expect(stringifiedObject).toEqual('asdsdasdas@1312aSDAAS');
    });
  });

  describe('_logLevelFor', () => {
    describe('when statusCode < 400', () => {
      test('should call looger.info', () => {
        const func = apiLogger._logLevelFor(302);
        expect(func).toBe(apiLogger.logger.info);
      });
    });

    describe('when statusCode = 404', () => {
      test('should call looger.info', () => {
        const func = apiLogger._logLevelFor(404);
        expect(func).toBe(apiLogger.logger.info);
      });
    });

    describe('when statusCode >= 400 && statusCode < 500', () => {
      test('should call looger.info', () => {
        const func = apiLogger._logLevelFor(401);
        expect(func).toBe(apiLogger.logger.warn);
      });
    });

    describe('when statusCode >= 500', () => {
      test('should call looger.info', () => {
        const func = apiLogger._logLevelFor(503);
        expect(func).toBe(apiLogger.logger.error);
      });
    });
  });

  describe('_buildResponseEntry', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let responseData: any;

    beforeEach(() => {
      responseData = {
        uri: 'http://localhost/resource',
        responseCode: 200
      };
    });

    test('should format the message of uri', () => {
      const logEntry = apiLogger._buildResponseEntry(responseData);
      expect(logEntry).toContain('http://localhost/resource');
    });

    test('should include response body if provided', () => {
      responseData.responseBody = { field: 'value' };
      const logEntry = apiLogger._buildResponseEntry(responseData);
      expect(logEntry).toContain('{"field":"value"}');
    });

    test('should not include response body if not provided', () => {
      const logEntry = apiLogger._buildResponseEntry(responseData);
      expect(logEntry).not.toContain('Body');
    });

    test('should include error if provided', () => {
      responseData.error = { message: 'Something bad happened' };
      const logEntry = apiLogger._buildResponseEntry(responseData);
      expect(logEntry).toContain('{"message":"Something bad happened"}');
    });

    test('should not include error if not provided', () => {
      const logEntry = apiLogger._buildResponseEntry(responseData);
      expect(logEntry).not.toContain('Error');
    });

    test('should include both response body and error if provided', () => {
      responseData.responseBody = { field: 'value' };
      responseData.error = { message: 'Something bad happened' };
      const logEntry = apiLogger._buildResponseEntry(responseData);
      expect(logEntry).toContain('{"field":"value"}');
      expect(logEntry).toContain('{"message":"Something bad happened"}');
    });

    test('should not include responseBody if LOG_LEVEL is WARN', () => {
      process.env.LOG_LEVEL = 'WARN';
      responseData.responseBody = { field: 'value' };
      const logEntry = apiLogger._buildResponseEntry(responseData);
      // Reset LOG_LEVEL
      process.env.LOG_LEVEL = 'DEBUG';
      expect(logEntry).not.toContain('Body');
    });

    test('should not include responseBody if LOG_LEVEL is missing', () => {
      process.env.LOG_LEVEL = '';
      responseData.responseBody = { field: 'value' };
      const logEntry = apiLogger._buildResponseEntry(responseData);
      // Reset LOG_LEVEL
      process.env.LOG_LEVEL = 'DEBUG';
      expect(logEntry).not.toContain('Body');
    });
  });
});
