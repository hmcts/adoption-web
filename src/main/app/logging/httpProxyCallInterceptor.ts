export const HttpMethods = ['get', 'post', 'put', 'patch', 'delete', 'del', 'head'];

export type CallHandler = (target: Record<string, any>, key: string, callArgs: any[]) => void

export class HttpProxyCallInterceptor {
  static intercept (target: Record<string, any>, key: string, handler: CallHandler): any {
    if (HttpMethods.includes(key)) {
      const originalMethod = (target as any)[key];
      return (...args: any[]) => {
        handler(target, key, args);
        return originalMethod.apply(target, args);
      };
    } else {
      return (target as any)[key];
    }
  }
}
