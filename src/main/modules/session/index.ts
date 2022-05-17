import config from 'config';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import session from 'express-session';
import * as redis from 'redis';
import FileStoreFactory from 'session-file-store';

const RedisStore = require('connect-redis')(session);
const FileStore = FileStoreFactory(session);

export const cookieMaxAge = 21 * (60 * 1000); // 21 minutes

export class SessionStorage {
  public enableFor(app: Application): void {
    app.use(cookieParser());

    const store = this.getStore(app);

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
        },
        rolling: true, // Renew the cookie for another 20 minutes on each request
        store,
      })
    );
  }

  private getStore(app: Application) {
    const redisHost = config.get('session.redis.host');
    if (redisHost) {
      const client = redis.createClient({
        socket: {
          host: redisHost as string,
          port: 6380,
          tls: true,
          connectTimeout: 15000,
        },
        password: config.get('session.redis.key') as string,
        legacyMode: true,
      });

      client.connect().catch(console.error);

      app.locals.redisClient = client;
      return new RedisStore({ client });
    }

    return new FileStore({ path: '/tmp' });
  }
}
