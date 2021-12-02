import fs from 'fs';

import { Application, RequestHandler, Response } from 'express';

import { AppRequest } from './app/controller/AppRequest';
import { GetController } from './app/controller/GetController';
import { PostController } from './app/controller/PostController';
import { cookieMaxAge } from './modules/session';
import { stepsWithContent } from './steps';
import { ErrorController } from './steps/error/error.controller';
import { HomeGetController } from './steps/home/get';
import { SaveSignOutGetController } from './steps/save-sign-out/get';
import { TaskListGetController } from './steps/task-list/get';
import { TimedOutGetController } from './steps/timed-out/get';
import {
  CSRF_TOKEN_ERROR_URL,
  HOME_URL,
  SAVE_AND_SIGN_OUT,
  SIGN_OUT_URL,
  TASK_LIST_URL,
  TIMED_OUT_URL,
} from './steps/urls';

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    const errorController = new ErrorController();

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(errorController.CSRFTokenError));
    app.get(HOME_URL, errorHandler(new HomeGetController().get));
    app.get(SAVE_AND_SIGN_OUT, errorHandler(new SaveSignOutGetController().get));
    app.get(TIMED_OUT_URL, errorHandler(new TimedOutGetController().get));
    app.get(TASK_LIST_URL, errorHandler(new TaskListGetController().get));

    for (const step of stepsWithContent) {
      const getController = fs.existsSync(`${step.stepDir}/get.ts`)
        ? require(`${step.stepDir}/get.ts`).default
        : GetController;

      app.get(step.url, errorHandler(new getController(step.view, step.generateContent).get));

      if (step.form) {
        const postController = fs.existsSync(`${step.stepDir}/post.ts`)
          ? require(`${step.stepDir}/post.ts`).default
          : PostController;
        app.post(step.url, errorHandler(new postController(step.form.fields).post));
      }
    }

    app.get(
      '/active',
      errorHandler((req: AppRequest, res: Response) => {
        if (!req.session.user) {
          return res.redirect(SIGN_OUT_URL);
        }
        req.session.cookie.expires = new Date(Date.now() + cookieMaxAge);
        req.session.cookie.maxAge = cookieMaxAge;
        req.session.save(err => {
          if (err) {
            throw err;
          }
          res.end();
        });
      })
    );

    app.use(errorController.notFound as unknown as RequestHandler);
  }
}
