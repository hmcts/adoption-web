/* tslint:disable:no-unused-expression */
import { CallHandler, HttpProxyCallInterceptor, HttpMethods } from 'logging/httpProxyCallInterceptor';

describe('HttpProxyCallInterceptor', () => {
  describe('intercept', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callHandler: CallHandler = (target: Record<string, any>, key: string, callArgs: any[]): void => {
      callArgs[0] = 123;
      callArgs[1] = '456';
      callArgs[2] = [789];
    };

    describe('when calling HTTP methods', () => {
      
      HttpMethods.forEach((httpMethod) => {
        const service = { [httpMethod]: jest.fn() };
        test(`should apply provided call handler when calling ${httpMethod} HTTP method`, () => {
          const interceptedFunction = HttpProxyCallInterceptor.intercept(service, httpMethod, callHandler);
          interceptedFunction();
          expect(service[httpMethod]).toHaveBeenCalledWith(123, '456', [789]);
        });
      });
    });

    describe('when calling non-HTTP methods', () => {
      const service = {
        someMethod: jest.fn()
      };

      test('should not apply the call handler when not calling a HTTP method', () => {
        const interceptedFunction = HttpProxyCallInterceptor.intercept(service, 'someMethod', callHandler);
        interceptedFunction('this should not be modified');
        expect(service.someMethod).toHaveBeenCalledWith('this should not be modified');
      });
    });
  });
});
