const { Logger } = require('@hmcts/nodejs-logging');
import * as bodyParser from 'body-parser';
import config from 'config';
import cookieParser from 'cookie-parser';
import express from 'express';
import { Helmet } from './modules/helmet';
import * as path from 'path';
import favicon from 'serve-favicon';
import { HTTPError } from './HttpError';
import { Nunjucks } from './modules/nunjucks';
import { PropertiesVolume } from './modules/properties-volume';
import { AppInsights } from './modules/appinsights';

import { Feature as LandingFeature } from 'features/landing/index';

import { RouterFinder } from 'common/router/routerFinder';
// import setLocale from 'modules/i18n/setLocale';

const { setupDev } = require('./development');
const content = require('./locale/content');
const i18next = require('i18next');

const env = process.env.NODE_ENV || 'development';
const developmentMode = env === 'development';

export const app = express();
app.locals.ENV = env;

const logger = Logger.getLogger('app');

new PropertiesVolume().enableFor(app);
new AppInsights().enable();
new Nunjucks(developmentMode).enableFor(app);
new Helmet(config.get('security')).enableFor(app);

app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader(
    'Cache-Control',
    'no-cache, max-age=0, must-revalidate, no-store'
  );
  next();
});

i18next.init({
  resources: content,
  supportedLngs: config.get('languages'),
  lng: 'en'
});

app.locals.i18n = i18next;
app.locals.content = content;

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.query?.locale && config.get<string []>('languages').includes(`${req.query.locale}`)) {
    res.cookie('locale', req.query.locale);
    i18next.changeLanguage(req.query.locale);
  } else {
    const locale = req.cookies.locale || 'en';
    res.cookie('locale', locale);
    i18next.changeLanguage(req.cookies.language);
  }
  next();
});

logger.info('Configuring landing routes');
new LandingFeature().enableFor(app);

logger.info('Configuring base routes');
app.use('/', RouterFinder.findAll(path.join(__dirname, 'routes')));

setupDev(app, developmentMode);
// returning "not found" page for requests with paths not resolved by the router
app.use((req, res) => {
  res.status(404);
  res.render('not-found');
});

// error handler
app.use((err: HTTPError, req: express.Request, res: express.Response) => {
  logger.error(`${err.stack || err}`);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = env === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
