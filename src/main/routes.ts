import fs from 'fs';

import { Application, RequestHandler } from 'express';
import rateLimit, { Options } from 'express-rate-limit';
import multer from 'multer';
import { type RedisReply, RedisStore } from 'rate-limit-redis';
import type { LoggerInstance } from 'winston';

import { NewCaseRedirectController } from './app/case/NewCaseRedirectController';
import { GetController } from './app/controller/GetController';
import { PostController } from './app/controller/PostController';
import { DocumentManagerController } from './app/document/DocumentManagementController';
import { KeepAliveController } from './app/keepalive/KeepAliveController';
import { stepsWithContent } from './steps';
import { ErrorController, TooManyRequestsError } from './steps/error/error.controller';
import {
  CSRF_TOKEN_ERROR_URL,
  DOCUMENT_MANAGER,
  DOWNLOAD_APPLICATION_SUMMARY,
  KEEP_ALIVE_URL,
  LA_DOCUMENT_MANAGER,
  LA_PORTAL_KBA_CASE_REF,
  NEW_APPLICATION_REDIRECT,
} from './steps/urls';

const handleUploads = multer();

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('server');

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    const errorController = new ErrorController();

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(errorController.CSRFTokenError));

    const documentManagerController = new DocumentManagerController();
    app.get(DOWNLOAD_APPLICATION_SUMMARY, errorHandler(documentManagerController.get));
    app.post(DOCUMENT_MANAGER, handleUploads.array('files[]', 5), errorHandler(documentManagerController.post));
    app.post(LA_DOCUMENT_MANAGER, handleUploads.array('files[]', 5), errorHandler(documentManagerController.postLa));
    app.get(`${DOCUMENT_MANAGER}/delete/:index`, errorHandler(documentManagerController.delete));
    app.get(`${LA_DOCUMENT_MANAGER}/delete/:index`, errorHandler(documentManagerController.deleteLa));

    const newCaseRedirectController = new NewCaseRedirectController();
    app.get(NEW_APPLICATION_REDIRECT, errorHandler(newCaseRedirectController.get));

    let rateLimiterConfig: Partial<Options> = {
      windowMs: 60 * 1000,
      max: 1,
      skipSuccessfulRequests: true,
      handler: (req, _res, next) => {
        const xForwardedFor = req.headers['x-forwarded-for'];
        const commaCount = typeof xForwardedFor === 'string' ? (xForwardedFor.match(/,/g) || []).length : 999;

        logger.info(`x-forwarded-for Header: ${xForwardedFor}, ${commaCount}`);
        next(new TooManyRequestsError(`${req.path}: Too many unsuccessful requests from ${req.ip}`));
      },
    };
    if (app.locals.redisClient) {
      rateLimiterConfig = {
        ...rateLimiterConfig,
        store: new RedisStore({
          sendCommand: (command: string, ...args: string[]) =>
            app.locals.draftStoreClient.call(command, ...args) as Promise<RedisReply>,
        }),
      };
    }
    const rateLimiter = rateLimit(rateLimiterConfig);
    app.post(LA_PORTAL_KBA_CASE_REF, rateLimiter);

    for (const step of stepsWithContent) {
      const files = fs.readdirSync(`${step.stepDir}`);

      const getControllerFileName = files.find(item => /get/i.test(item) && !/test/i.test(item));
      const getController = getControllerFileName
        ? require(`${step.stepDir}/${getControllerFileName}`).default
        : GetController;

      app.get(step.url, errorHandler(new getController(step.view, step.generateContent).get));

      if (step.form) {
        const postControllerFileName = files.find(item => /post/i.test(item) && !/test/i.test(item));
        const postController = postControllerFileName
          ? require(`${step.stepDir}/${postControllerFileName}`).default
          : PostController;
        app.post(step.url, errorHandler(new postController(step.form.fields).post));
      }
    }

    app.get(KEEP_ALIVE_URL, errorHandler(new KeepAliveController().get));

    app.use(errorController.notFound as unknown as RequestHandler);
  }
}
