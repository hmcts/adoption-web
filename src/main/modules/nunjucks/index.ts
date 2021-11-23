import * as path from 'path';
import * as express from 'express';
import * as nunjucks from 'nunjucks';
import { InitOptions } from 'i18next';
import { Paths as AppPaths } from 'paths'
import { Paths as LandingPaths } from '../../features/landing/paths';

export class Nunjucks {
  constructor(public developmentMode: boolean, public i18next) {
    this.developmentMode = developmentMode;
    this.i18next = i18next
  }

  enableFor(app: express.Express): void {
    app.set('view engine', 'njk');
    const govUkFrontendPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'node_modules',
      'govuk-frontend'
    );
    const nunjucksEnv = nunjucks.configure(
      [path.join(__dirname, '..', '..', 'views'), govUkFrontendPath],
      {
        autoescape: true,
        watch: this.developmentMode,
        express: app
      }
    );

    app.use((req, res, next) => {
      res.locals.pagePath = req.path;
      next();
    });

    nunjucksEnv.addGlobal('t', (key: string, options?: InitOptions): string => this.i18next.t(key, options))
    nunjucksEnv.addGlobal('AppPaths', AppPaths)
    nunjucksEnv.addGlobal('LandingPaths', LandingPaths)
  }
}
