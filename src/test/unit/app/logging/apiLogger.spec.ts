import { ApiLogger } from 'logging/apiLogger';

process.env.LOG_LEVEL = 'DEBUG';

describe('ApiLogger', () => {
  let apiLogger: ApiLogger;

  beforeEach(() => {
    apiLogger = new ApiLogger({});
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
    test('should hide pdf output', () => {
      const stringifiedObject = apiLogger._stringifyObject('%PDFasdsdasdas@1312aSDAAS');
      expect(stringifiedObject).toEqual('**** PDF Content not shown****');
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
  });
});
