import { Logger } from '@hmcts/nodejs-logging';
import config from 'config';
import ConnectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import session from 'express-session';
import * as redis from 'redis';
import FileStoreFactory from 'session-file-store';

const RedisStore = ConnectRedis(session);
const FileStore = FileStoreFactory(session);

export const cookieMaxAge = 21 * (60 * 1000); // 21 minutes

export class SessionStorage {
  public enableFor(app: Application): void {
    app.use(cookieParser());

    app.use(
      session({
        name: 'adoption-web-session',
        resave: false,
        saveUninitialized: false,
        secret: config.get('session.secret'),
        cookie: {
          httpOnly: true,
          ...(config.get('session.secureCookie') === 'true' ? { secure: true } : {}),
          maxAge: cookieMaxAge,
          sameSite: 'lax', // required for the oauth2 redirect
        },
        rolling: true, // Renew the cookie for another 20 minutes on each request
        store: this.getStore(app, Logger.getLogger('session-storage')),
      })
    );
  }

  private getStore(app: Application, logger: Logger) {
    const redisHost = config.get('session.redis.host');
    if (redisHost) {
      const client = redis.createClient({
        host: redisHost as string,
        password: config.get('session.redis.key') as string,
        port: 6380,
        tls: true,
        connect_timeout: 15000,
      });

      client.on('error', err => logger.error('Redis Client Error', err));

      app.locals.redisClient = client;
      return new RedisStore({ client });
    }

    return new FileStore({ 
      path: '/tmp',
      retries: 1, // Number of times to retry on failure
      logFn: (...args: unknown[]) => {
        logger.warn('[session-file-store]', ...args);
      },
      fallbackSessionFn: () => {
        logger.warn('Session file read failed; using empty fallback session object');
        return {};
      },
    });
  }
}
