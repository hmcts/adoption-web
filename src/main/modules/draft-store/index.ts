import config from 'config';
import { Application } from 'express';
import Logger from 'winston';

const Redis = require('ioredis');

export class DraftStoreClient {
  public static REDIS_CONNECTION_SUCCESS = 'Connected to Redis instance successfully';

  public enableFor(app: Application): void {
    // const protocol = config.get('services.draftStore.redis.tls') ? 'rediss://' : 'redis://';
    // const connectionString = `${protocol}${config.get('session.redis.key')}@${config.get(
    //   'services.draftStore.redis.host'
    // )}:${config.get('services.draftStore.redis.port')}`;
    Logger.error(
      'h: ' + config.get('services.draftStore.redis.host') + ' p: ' + config.get('services.draftStore.redis.port')
    );

    const client = new Redis({
      host: config.get('services.draftStore.redis.host'),
      port: config.get('services.draftStore.redis.port'),
    });
    Logger.error('connection string');

    app.locals.draftStoreClient = client;
  }
}
