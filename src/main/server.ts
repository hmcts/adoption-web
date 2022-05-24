import * as path from 'path';

import { Express } from '@hmcts/nodejs-logging';
import * as bodyParser from 'body-parser';
import config from 'config';
import express, { RequestHandler } from 'express';
import favicon from 'serve-favicon';
import toobusy from 'toobusy-js';
import type { LoggerInstance } from 'winston';

import { AppInsights } from './modules/appinsights';
import { AuthProvider } from './modules/auth-provider';
import { AxiosLogger } from './modules/axios-logger';
import { CSRFToken } from './modules/csrf';
import { ErrorHandler } from './modules/error-handler';
import { HealthCheck } from './modules/health';
import { Helmet } from './modules/helmet';
import { LanguageToggle } from './modules/i18n';
import { Nunjucks } from './modules/nunjucks';
import { OidcMiddleware } from './modules/oidc';
import { PropertiesVolume } from './modules/properties-volume';
import { SessionStorage } from './modules/session';
import { StateRedirectMiddleware } from './modules/state-redirect';
import { LoadTimeouts } from './modules/timeouts';
import { TooBusy } from './modules/too-busy';
import { Webpack } from './modules/webpack';
import { Routes } from './routes';

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('server');
const app = express();

app.enable('trust proxy');

app.use((req, res, next) => {
  req['startTime'] = Date.now();
  if ((req.method === 'OPTIONS' || req.method === 'TRACE') && req.headers['max-forwards']) {
    return res.sendStatus(405);
  }
  next();
});

app.locals.developmentMode = process.env.NODE_ENV !== 'production';
app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json() as RequestHandler);
app.use(bodyParser.urlencoded({ extended: false }) as RequestHandler);
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
  next();
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

app.get('/sitemap.xml', (req, res) => {
  res.type('text/xml');
  res.send('User-agent: *\nDisallow: /');
});

app.disable('x-powered-by');
app.disable('X-Powered-By');

app.use(
  Express.accessLogger({
    formatter: req => {
      const timeTaken = ((Date.now() - req['startTime']) / 1000).toFixed(2);
      const caseId = req.session?.userCase?.id ? ` caseId=${req.session?.userCase?.id}` : '';
      const errors = req.session?.errors?.length
        ? ` errors=[${req.session.errors.map(item => ` ${item.propertyName}:${item.errorType}`)} ]`
        : '';

      return `"${req.method} ${req.originalUrl || req.url}${caseId}${errors}" ${timeTaken}s`;
    },
    ignoreRequests: ['/health/readiness', '/health/liveness'],
  })
);

new AxiosLogger().enableFor(app);
new PropertiesVolume().enableFor(app);
new ErrorHandler().enableFor(app, logger);
new LoadTimeouts().enableFor(app);
new Nunjucks().enableFor(app);
new Webpack().enableFor(app);
new Helmet(config.get('security')).enableFor(app);
new AppInsights().enable();
new SessionStorage().enableFor(app);
new TooBusy().enableFor(app);
new HealthCheck().enableFor(app);
new CSRFToken().enableFor(app);
new AuthProvider().enable();
new OidcMiddleware().enableFor(app);
new LanguageToggle().enableFor(app);
new StateRedirectMiddleware().enableFor(app);
new Routes().enableFor(app);
new ErrorHandler().handleNextErrorsFor(app);

const port = config.get('port');
const server = app.listen(port, () => {
  logger.info(`Application started: http://localhost:${port}`);
});

process.on('SIGINT', function () {
  server.close();
  toobusy.shutdown();
  process.exit();
});
