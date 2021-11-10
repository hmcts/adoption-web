import * as express from 'express';

import { Paths as AppPaths } from 'paths';

/* tslint:disable:no-default-export */
export default express.Router()
  .get(AppPaths.landingPage.uri, function (req, res) {
    res.render('home');
  });
