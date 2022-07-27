import config from 'config';
import { Application } from 'express';
import Logger from 'winston';

const Redis = require('ioredis');

export class DraftStoreClient {
  public static REDIS_CONNECTION_SUCCESS = 'Connected to Redis instance successfully';

  public enableFor(app: Application): void {
    const protocol = config.get('services.draftStore.redis.tls') ? 'rediss://' : 'redis://';
    const connectionString = `${protocol}${config.get('session.redis.key')}@${config.get(
      'services.draftStore.redis.host'
    )}:${config.get('services.draftStore.redis.port')}`;

    Logger.error('connection string', connectionString);

    const client = new Redis(connectionString);

    app.locals.draftStoreClient = client;
  }
}
