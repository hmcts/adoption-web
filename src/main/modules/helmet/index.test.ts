import * as path from 'path';

import * as express from 'express';
import { Request, Response, NextFunction } from 'express';

jest.mock('helmet', () => {
  const helmetMock = jest.fn(() => jest.fn());
  (helmetMock as any).contentSecurityPolicy = jest.fn(() => jest.fn());
  (helmetMock as any).referrerPolicy = jest.fn(() => jest.fn());
  (helmetMock as any).crossOriginResourcePolicy = jest.fn(() => jest.fn());
  return helmetMock;
});

import { Helmet, HelmetConfig } from '.';

const config: HelmetConfig = {
  referrerPolicy: 'origin',
  crossOriginResourcePolicy: 'same-origin',
};

function makeMockApp(): { app: express.Express; capturedMiddlewares: express.RequestHandler[] } {
  const capturedMiddlewares: express.RequestHandler[] = [];
  const app = {
    locals: { developmentMode: false },
    use: jest.fn((middleware: express.RequestHandler) => {
      capturedMiddlewares.push(middleware);
      return app;
    }),
  } as unknown as express.Express;
  return { app, capturedMiddlewares };
}

function makeMockRes(): Response & { setHeader: jest.Mock } {
  return { setHeader: jest.fn() } as unknown as Response & { setHeader: jest.Mock };
}

describe('Helmet module', () => {
  describe('enableFor', () => {
    it('registers middleware on the app', () => {
      const { app } = makeMockApp();
      new Helmet(config).enableFor(app);
      expect(app.use).toHaveBeenCalled();
    });

    it('registers at least the base helmet, CSP, Referrer-Policy, and CORP middlewares', () => {
      const { app, capturedMiddlewares } = makeMockApp();
      new Helmet(config).enableFor(app);
      // base + CSP + referrer + CORP + permissions-policy = 5 minimum
      expect(capturedMiddlewares.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Permissions-Policy header', () => {
    const EXPECTED_HEADER_NAME = 'Permissions-Policy';
    const EXPECTED_HEADER_VALUE =
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(self)';

    function applyAllMiddlewares(
      middlewares: express.RequestHandler[],
      req: Request,
      res: Response,
      next: NextFunction
    ): void {
      middlewares.forEach(mw => {
        try {
          mw(req, res, next);
        } catch {
          // ignore errors from other mocked middlewares
        }
      });
    }

    it('sets the Permissions-Policy header on responses', () => {
      const { app, capturedMiddlewares } = makeMockApp();
      new Helmet(config).enableFor(app);

      const mockReq = {} as Request;
      const mockRes = makeMockRes();
      const mockNext = jest.fn();

      applyAllMiddlewares(capturedMiddlewares, mockReq, mockRes, mockNext);

      expect(mockRes.setHeader).toHaveBeenCalledWith(EXPECTED_HEADER_NAME, EXPECTED_HEADER_VALUE);
    });

    it('sets camera=() to deny camera access', () => {
      const { app, capturedMiddlewares } = makeMockApp();
      new Helmet(config).enableFor(app);

      const mockRes = makeMockRes();
      applyAllMiddlewares(capturedMiddlewares, {} as Request, mockRes, jest.fn());

      const call = mockRes.setHeader.mock.calls.find(
        ([name]) => name === EXPECTED_HEADER_NAME
      );
      expect(call).toBeDefined();
      expect(call![1]).toContain('camera=()');
    });

    it('sets microphone=() to deny microphone access', () => {
      const { app, capturedMiddlewares } = makeMockApp();
      new Helmet(config).enableFor(app);

      const mockRes = makeMockRes();
      applyAllMiddlewares(capturedMiddlewares, {} as Request, mockRes, jest.fn());

      const call = mockRes.setHeader.mock.calls.find(([name]) => name === EXPECTED_HEADER_NAME);
      expect(call![1]).toContain('microphone=()');
    });

    it('sets geolocation=() to deny geolocation access', () => {
      const { app, capturedMiddlewares } = makeMockApp();
      new Helmet(config).enableFor(app);

      const mockRes = makeMockRes();
      applyAllMiddlewares(capturedMiddlewares, {} as Request, mockRes, jest.fn());

      const call = mockRes.setHeader.mock.calls.find(([name]) => name === EXPECTED_HEADER_NAME);
      expect(call![1]).toContain('geolocation=()');
    });

    it('sets payment=() to deny Payment Request API', () => {
      const { app, capturedMiddlewares } = makeMockApp();
      new Helmet(config).enableFor(app);

      const mockRes = makeMockRes();
      applyAllMiddlewares(capturedMiddlewares, {} as Request, mockRes, jest.fn());

      const call = mockRes.setHeader.mock.calls.find(([name]) => name === EXPECTED_HEADER_NAME);
      expect(call![1]).toContain('payment=()');
    });

    it('sets usb=() to deny USB device access', () => {
      const { app, capturedMiddlewares } = makeMockApp();
      new Helmet(config).enableFor(app);

      const mockRes = makeMockRes();
      applyAllMiddlewares(capturedMiddlewares, {} as Request, mockRes, jest.fn());

      const call = mockRes.setHeader.mock.calls.find(([name]) => name === EXPECTED_HEADER_NAME);
      expect(call![1]).toContain('usb=()');
    });

    it('sets fullscreen=(self) to allow same-origin fullscreen', () => {
      const { app, capturedMiddlewares } = makeMockApp();
      new Helmet(config).enableFor(app);

      const mockRes = makeMockRes();
      applyAllMiddlewares(capturedMiddlewares, {} as Request, mockRes, jest.fn());

      const call = mockRes.setHeader.mock.calls.find(([name]) => name === EXPECTED_HEADER_NAME);
      expect(call![1]).toContain('fullscreen=(self)');
    });

    it('calls next() so subsequent middleware continues to execute', () => {
      const { app, capturedMiddlewares } = makeMockApp();
      new Helmet(config).enableFor(app);

      // Isolate the Permissions-Policy middleware: it's the last registered one
      const lastMiddleware = capturedMiddlewares[capturedMiddlewares.length - 1];
      const mockNext = jest.fn();

      lastMiddleware({} as Request, makeMockRes(), mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });

  describe('audit.json — ZAP suppression removal (SC-4)', () => {
    it('does not contain a 10063_Permissions Policy Header Not Set suppression entry', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const audit = require(path.resolve(__dirname, '../../../../audit.json'));
      const keys = Object.keys(audit as Record<string, string>);
      const hasPermissionsPolicySuppression = keys.some(k =>
        k.includes('10063_Permissions Policy Header Not Set')
      );
      expect(hasPermissionsPolicySuppression).toBe(false);
    });
  });
});
