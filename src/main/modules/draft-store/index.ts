import config from 'config';
import { Application } from 'express';

const Redis = require('ioredis');

export class DraftStoreClient {
  public static REDIS_CONNECTION_SUCCESS = 'Connected to Redis instance successfully';

  public enableFor(app: Application): void {
    const protocol = config.get('services.draftStore.redis.tls') ? 'rediss://' : 'redis://';
    const connectionString = `${protocol}${config.get('services.draftStore.redis.key')}@${config.get(
      'services.draftStore.redis.host'
    )}:${config.get('services.draftStore.redis.port')}`;
    console.log(connectionString);

    const client = new Redis(connectionString);

    app.locals.draftStoreClient = client;
  }
}
