import { AuthorizationMiddleware } from 'app/idam/authorizationMiddleware';
import { OAuthHelper } from 'app/idam/oAuthHelper';
import * as express from 'express';

import { Paths as AppPaths } from '../paths';

function accessDeniedCallback(req: express.Request, res: express.Response): void {
  res.redirect(OAuthHelper.forLogin(req, res));
}

export default express.Router()
  .get(AppPaths.makeNewApplication.uri, AuthorizationMiddleware.requestHandler(['citizen'], accessDeniedCallback), (req, res) => {
    res.render('make-new-applcation');
  });
