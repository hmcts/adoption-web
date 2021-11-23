import * as express from 'express';
import * as path from 'path';

import { Paths } from './paths';

// import { AuthorizationMiddleware } from 'app/idam/authorizationMiddleware'
// import { OAuthHelper } from 'app/idam/oAuthHelper'

import { RouterFinder } from 'common/router/routerFinder';

// function requestHandler(): express.RequestHandler {
//   function accessDeniedCallback(req: express.Request, res: express.Response): void {
//     res.redirect(OAuthHelper.forLogin(req, res))
//   }

//   const requiredRoles = ['citizen']
//   const unprotectedPaths: string[] = []
//   return AuthorizationMiddleware.requestHandler(requiredRoles, accessDeniedCallback, unprotectedPaths)
// }

export class Feature {
  enableFor(app: express.Express): void {
    if (app.settings.nunjucksEnv && app.settings.nunjucksEnv.globals) {
      app.settings.nunjucksEnv.globals.AppPaths = Paths;
    }

    // app.use(/^\/landing.*$/, requestHandler())
    app.all(/^\/landing.*$/, RouterFinder.findAll(path.join(__dirname, 'routes')));
  }
}
