import fs from 'fs';

import { Application, RequestHandler, Response } from 'express';
import multer from 'multer';

import { AccessCodePostController } from './app/access-code/AccessCodePostController';
import { AppRequest } from './app/controller/AppRequest';
import { GetController } from './app/controller/GetController';
import { PostController } from './app/controller/PostController';
import { DocumentManagerController } from './app/document/DocumentManagementController';
import { cookieMaxAge } from './modules/session';
import { stepsWithContent } from './steps';
import { PostcodeLookupPostController } from './steps/applicant1/postcode-lookup/post';
import * as applicant2AccessCodeContent from './steps/applicant2/enter-your-access-code/content';
import { Applicant2AccessCodeGetController } from './steps/applicant2/enter-your-access-code/get';
import { CookiesGetController } from './steps/cookies/get';
import { ErrorController } from './steps/error/error.controller';
import { HomeGetController } from './steps/home/get';
import { SaveSignOutGetController } from './steps/save-sign-out/get';
import { TimedOutGetController } from './steps/timed-out/get';
import {
  APPLICANT_2,
  COOKIES_URL,
  CSRF_TOKEN_ERROR_URL,
  DOCUMENT_MANAGER,
  ENTER_YOUR_ACCESS_CODE,
  HOME_URL,
  POSTCODE_LOOKUP,
  SAVE_AND_SIGN_OUT,
  SIGN_OUT_URL,
  TIMED_OUT_URL,
} from './steps/urls';

const handleUploads = multer();

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    const errorController = new ErrorController();

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(errorController.CSRFTokenError));
    app.get([HOME_URL, APPLICANT_2], errorHandler(new HomeGetController().get));
    app.get(SAVE_AND_SIGN_OUT, errorHandler(new SaveSignOutGetController().get));
    app.get(TIMED_OUT_URL, errorHandler(new TimedOutGetController().get));
    app.get(COOKIES_URL, errorHandler(new CookiesGetController().get));
    app.post(POSTCODE_LOOKUP, errorHandler(new PostcodeLookupPostController().post));

    const documentManagerController = new DocumentManagerController();
    app.post(DOCUMENT_MANAGER, handleUploads.array('files[]', 5), errorHandler(documentManagerController.post));
    app.get(`${DOCUMENT_MANAGER}/delete/:id`, errorHandler(documentManagerController.delete));

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

    app.get(`${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`, errorHandler(new Applicant2AccessCodeGetController().get));
    app.post(
      `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`,
      errorHandler(new AccessCodePostController(applicant2AccessCodeContent.form.fields).post)
    );

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
