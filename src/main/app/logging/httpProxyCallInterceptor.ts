export const HttpMethods = ['get', 'post', 'put', 'patch', 'delete', 'del', 'head'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CallHandler = (target: Record<string, any>, key: string, callArgs: any[]) => void

export class HttpProxyCallInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static intercept (target: Record<string, any>, key: string, handler: CallHandler): any {
    if (HttpMethods.includes(key)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const originalMethod = (target as any)[key];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
      return (...args: any[]) => {
        handler(target, key, args);
        return originalMethod.apply(target, args);
      };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (target as any)[key];
    }
  }
}
