import config from 'config';
import { Application } from 'express';
import Logger from 'winston';

const Redis = require('ioredis');

export class DraftStoreClient {
  public static REDIS_CONNECTION_SUCCESS = 'Connected to Redis instance successfully';

  public enableFor(app: Application): void {
    let client;
    try {
      client = new Redis({
        host: config.get('services.draftStore.redis.host'),
        port: config.get('services.draftStore.redis.port'),
        password: config.get('session.redis.key'),
        tls: {
          servername: config.get('services.draftStore.redis.host'),
        },
      });
    } catch (err) {
      Logger.error('Failed to create Redis client', err);
      throw err;
    }

    client.on('connect', () => Logger.info(DraftStoreClient.REDIS_CONNECTION_SUCCESS));
    client.on('error', (err: Error) => Logger.error('Redis client error', err));

    app.locals.draftStoreClient = client;
  }
}
