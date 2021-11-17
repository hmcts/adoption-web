/* tslint:disable:no-unused-expression */
import { ErrorHandling } from 'common/errorHandling';
import * as express from 'express';

const mockReq = {

} as express.Request;

const mockRes = {

} as express.Response;

describe('ErrorHandling', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resolvingRequestHandler = jest.fn((req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    return undefined;
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rejectingRequestHandler = jest.fn((req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    throw new Error('An error occurred');
  });

  const nextFunction = jest.fn(() => {
    // Nothing to do, I'm a mock
  });

  it('should invoke given request handler', async () => {
    const handled = ErrorHandling.apply(resolvingRequestHandler);
    await handled(mockReq, mockRes, nextFunction);
    expect(resolvingRequestHandler).toHaveBeenCalledWith(mockReq, mockRes, nextFunction);
  });

  it('should not invoke next function when the request handler is successful', async () => {
    const handled = ErrorHandling.apply(resolvingRequestHandler);
    await handled(mockReq, mockRes, nextFunction);
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should invoke next function when the request handler has failed', async () => {
    const handled = ErrorHandling.apply(rejectingRequestHandler);
    try {
      await handled(mockReq, mockRes, nextFunction);
    } catch (err) {
      expect(nextFunction).not.toHaveBeenCalled();
    }
  });
});
