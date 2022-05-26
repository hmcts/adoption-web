import fs from 'fs';
//import { extname } from 'path';

import { Application, RequestHandler } from 'express';
import multer from 'multer';

import { GetController } from './app/controller/GetController';
import { PostController } from './app/controller/PostController';
import { DocumentManagerController } from './app/document/DocumentManagementController';
import { KeepAliveController } from './app/keepalive/KeepAliveController';
import { stepsWithContent } from './steps';
import { AccessibilityStatementGetController } from './steps/accessibility-statement/get';
import { ApplicationSubmittedGetController } from './steps/application-submitted/get';
import { ContactUsGetController } from './steps/contact-us/get';
import { CookiesGetController } from './steps/cookies/get';
import { ErrorController } from './steps/error/error.controller';
import { HomeGetController } from './steps/home/get';
import { PrivacyPolicyGetController } from './steps/privacy-policy/get';
import * as saveAsDraft from './steps/save-as-draft/content';
import { SaveAsDraftGetController } from './steps/save-as-draft/get';
import { SaveAsDraftPostController } from './steps/save-as-draft/post';
import { SaveSignOutGetController } from './steps/save-sign-out/get';
import { TaskListGetController } from './steps/task-list/get';
import { TermsAndConditionsGetController } from './steps/terms-and-conditions/get';
import { TimedOutGetController } from './steps/timed-out/get';
import {
  ACCESSIBILITY_STATEMENT,
  APPLICATION_SUBMITTED,
  CONTACT_US,
  COOKIES_PAGE,
  CSRF_TOKEN_ERROR_URL,
  DOCUMENT_MANAGER,
  DOWNLOAD_APPLICATION_SUMMARY,
  HOME_URL,
  KEEP_ALIVE_URL,
  PRIVACY_POLICY,
  SAVE_AND_SIGN_OUT,
  SAVE_AS_DRAFT,
  TASK_LIST_URL,
  TERMS_AND_CONDITIONS,
  TIMED_OUT_URL,
} from './steps/urls';

const handleUploads = multer();
//const ext = extname(__filename);

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    const errorController = new ErrorController();

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(errorController.CSRFTokenError));
    app.get(HOME_URL, errorHandler(new HomeGetController().get));
    app.get(SAVE_AND_SIGN_OUT, errorHandler(new SaveSignOutGetController().get));
    app.get(TIMED_OUT_URL, errorHandler(new TimedOutGetController().get));
    app.get(TASK_LIST_URL, errorHandler(new TaskListGetController().get));
    app.get(APPLICATION_SUBMITTED, errorHandler(new ApplicationSubmittedGetController().get));
    app.get(COOKIES_PAGE, errorHandler(new CookiesGetController().get));
    app.get(PRIVACY_POLICY, errorHandler(new PrivacyPolicyGetController().get));
    app.get(TERMS_AND_CONDITIONS, errorHandler(new TermsAndConditionsGetController().get));
    app.get(ACCESSIBILITY_STATEMENT, errorHandler(new AccessibilityStatementGetController().get));
    app.get(CONTACT_US, errorHandler(new ContactUsGetController().get));
    app.get(SAVE_AS_DRAFT, errorHandler(new SaveAsDraftGetController().get));
    app.post(SAVE_AS_DRAFT, errorHandler(new SaveAsDraftPostController(saveAsDraft.form.fields).post));

    const documentManagerController = new DocumentManagerController();
    app.get(DOWNLOAD_APPLICATION_SUMMARY, errorHandler(documentManagerController.get));
    app.post(DOCUMENT_MANAGER, handleUploads.array('files[]', 5), errorHandler(documentManagerController.post));
    app.get(`${DOCUMENT_MANAGER}/delete/:index`, errorHandler(documentManagerController.delete));

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
