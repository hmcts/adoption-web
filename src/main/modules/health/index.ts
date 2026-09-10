import os from 'os';

import healthcheck from '@hmcts/nodejs-healthcheck';
import config from 'config';
import { Application } from 'express';

/**
 * Sets up the HMCTS info and health endpoints
 */
export class HealthCheck {
  public enableFor(app: Application): void {
    const redis = app.locals.redisClient
      ? healthcheck.raw(() => (app.locals.redisClient.ping() ? healthcheck.up() : healthcheck.down()))
      : null;

    const idamUrl = config.get('services.idam.tokenURL') as string;
    const hmctsAccessUrl = config.get('services.idam.hmctsAccess.url') as string;

    healthcheck.addTo(app, {
      checks: {
        ...(redis ? { redis } : {}),
        'authProvider-api': healthcheck.web(new URL('/health', config.get('services.authProvider.url'))),
        'idam-api': healthcheck.web(new URL('/health', idamUrl.replace('/o/token', ''))),
        'hmcts-access': healthcheck.web(new URL('/health', hmctsAccessUrl.replace('/o/authorize', ''))),
        'case-api': healthcheck.web(new URL('/health', config.get('services.case.url'))),
      },
      ...(redis
        ? {
            readinessChecks: {
              redis,
            },
          }
        : {}),
      buildInfo: {
        name: 'adoption-web',
        host: os.hostname(),
        uptime: process.uptime(),
      },
    });
  }
}
