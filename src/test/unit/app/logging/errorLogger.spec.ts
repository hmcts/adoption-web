import { ErrorLogger } from "logging/errorLogger";

describe('errorLogger', () => {
  let logger = { debug: jest.fn(), error: jest.fn() };
  let errorLogger = new ErrorLogger(logger);

  describe('constructor', () => {
    test('should set logger instance in constructor', () => {
      expect(errorLogger.logger).toEqual(logger);
    });

    test('should use default logger instance if not provided', () => {
      const errorLogger = new ErrorLogger();
      expect(errorLogger.logger).toBeDefined();
    });
  });

  describe('log', () => {
    describe('when error object is present', () => {
      describe('when error.stack is present', () => {
        test('should log error', () => {
          errorLogger.log({ stack: 'MOCK_ERROR_STACK' });
          expect(logger.error).toHaveBeenCalledWith('MOCK_ERROR_STACK');
        });

        describe('when error.statusCode is HttpStatus.NOT_FOUND', () => {
          test('should log debug message', () => {
            errorLogger.log({ stack: 'MOCK_ERROR_STACK', statusCode: 404 });
            expect(logger.debug).toHaveBeenCalledWith('MOCK_ERROR_STACK');
          });
        });
      });

      describe('when error.stack is missing', () => {
        test('should log error', () => {
          errorLogger.log('MOCK_ERROR_MESSAGE');
          expect(logger.error).toHaveBeenCalledWith('MOCK_ERROR_STACK');
        });
      });
    });

    describe('when error object is missing', () => {
      test('should log error', () => {
        errorLogger.log(null);
        expect(logger.debug).toHaveBeenCalledWith("Received error was blank");
      });
    });
  });
});